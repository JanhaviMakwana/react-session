import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoItem {
  id: number;
  name: string;
  completed: boolean;
}

const initialState : TodoItem[] = [];

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.push({ id: Date.now(), name: action.payload, completed: false });
          },
          deleteTodo: (state, action: PayloadAction<number>) => {
            return state.filter((todo) => todo.id !== action.payload);
          },
          toggleComplete: (state, action: PayloadAction<number>) => {
            const todo = state.find((todo) => todo.id === action.payload);
            if (todo) {
              todo.completed = !todo.completed;
            }
          },
    }
})

export const { addTodo, deleteTodo, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;