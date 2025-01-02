import React, { useReducer, useMemo, useCallback } from 'react';

const initialState = {
  tasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
    default:
      return state;
  }
};

const ToDoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tasks } = state;

  const handleAddTask = useCallback((taskName) => {
    if (taskName.trim() === '') return;
    dispatch({
      type: 'ADD_TASK',
      payload: { id: Date.now(), name: taskName, completed: false },
    });
  }, []);

  const handleToggleTask = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  }, []);

  const handleDeleteTask = useCallback((id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, []);

  const pendingTasks = useMemo(
    () => tasks.filter((task) => !task.completed),
    [tasks]
  );

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed),
    [tasks]
  );

  return (
    <div style={{ margin: '20px' }}>
      <h1>To-Do List</h1>
      <TaskInput onAddTask={handleAddTask} />
      <TaskList
        title="Pending Tasks"
        tasks={pendingTasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
      <TaskList
        title="Completed Tasks"
        tasks={completedTasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

const TaskInput = ({ onAddTask }) => {
  const [taskName, setTaskName] = React.useState('');

  const handleAdd = () => {
    onAddTask(taskName);
    setTaskName('');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter a task"
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

const TaskList = ({ title, tasks, onToggleTask, onDeleteTask }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: '10px' }}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                marginRight: '10px',
              }}
            >
              {task.name}
            </span>
            <button onClick={() => onToggleTask(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoApp;
