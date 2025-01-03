import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from "./reducers/userApi";
import userReducer from "./reducers/users";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    users: userReducer,
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
  });

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
