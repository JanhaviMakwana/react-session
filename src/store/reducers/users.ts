import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserItem{
    id: string;
    name: string;
}

export const addUser = createAsyncThunk("/user/addUser", async (user: UserItem) => {
    const response = await axios.post<UserItem>('http://localhost:3001/users', user);
    return response.data;
})

export const deleteUser = createAsyncThunk("/user/delete", async (id: string) => {
    const response = await axios.delete<UserItem>(`http://localhost:3001/users/${id}`);
    return response.data;
})

export const editUser = createAsyncThunk("/user/editUser", async (user: UserItem) => {
  const response = await axios.put<UserItem>(`http://localhost:3001/users/${user.id}`, user);
  return response.data;
})

interface UserState {
    users: UserItem[];
    loading: boolean;
    error: string | null;
  }

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(addUser.fulfilled, (state, action: PayloadAction<UserItem>) => {
          state.loading = false;
          state.users.push(action.payload);
        })
        .addCase(addUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to add user';
        })
        .addCase(deleteUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteUser.fulfilled, (state, action: PayloadAction<UserItem>) => {
            state.loading = false;
            state.users = state.users.filter((user: UserItem) => user.id !== action.payload.id)
        })
        .addCase(editUser.fulfilled, (state, action: PayloadAction<UserItem>) => {
          state.loading = false;
          let updatedUsers = state.users.map((user: UserItem) => {
            if(user.id === action.payload.id){
              return ({
                ...user,
                name: action.payload.name
              })
            }
          });
          state.users = updatedUsers as UserItem[];
      })
    },
  });

  export default userSlice.reducer;