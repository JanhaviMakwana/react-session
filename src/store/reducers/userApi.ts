// features/userApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserItem } from './users';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserItem[], void>({
      query: () => 'users',
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
