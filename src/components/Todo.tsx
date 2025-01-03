import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "../store/index";
import {addTodo, deleteTodo, toggleComplete} from "../store/reducers/todo";

const ToDoApp = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch: AppDispatch = useDispatch();

  const handleAddTask = useCallback((text: string) => {
    dispatch(addTodo(text));
  }, []);

  const handleToggleTask = useCallback((id: number) => {
    dispatch(toggleComplete(id));
  }, []);

  const handleDeleteTask = useCallback((id: number) => {
    dispatch(deleteTodo(id));
  }, []);

  const pendingTasks = useMemo(
    () => todos.filter((task) => !task.completed),
    [todos]
  );

  const completedTasks = useMemo(
    () => todos.filter((task) => task.completed),
    [todos]
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
