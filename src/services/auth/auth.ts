import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, LoginRequest, AuthResponse } from "../../types/types";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://api.findest.com/api/v2/',
        prepareHeaders: (headers) => {
          const token = import.meta.env.VITE_ACCESS_TOKEN;
          headers.set('authorization', `Bearer ${token}`);
          return headers;
        },
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        // Login mutation
        login: builder.mutation<AuthResponse, LoginRequest>({
          query: (body) => ({
              url: 'authentication/verify',
              method: 'POST',
              body,
          }),
          invalidatesTags: ['Auth'],
      }),
      getProfile: builder.query<User, void>({
          query: () => 'authentication/profile',
          providesTags: ['Auth'],
      }),
      logout: builder.mutation<void, void>({
          query: () => ({
              url: 'authentication/logout',
              method: 'GET',
          }),
          invalidatesTags: ['Auth'],
      }),
      checkIsObjectSharedToUser: builder.query<void, { email: string; objectId: string }>({
          query: ({ email, objectId }) => ({
              url: `object/shared/${objectId}`,
              method: 'POST',
              body: { email },
          }),
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      verifyAuth: builder.mutation<AuthResponse, { sharedToSettings:any }>({
          query: (body) => ({
              url: 'authentication/verify',
              method: 'POST',
              body,
          }),
      }),
    }),
});

// Export the hooks for all API queries and mutations
export const {
  useLoginMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useCheckIsObjectSharedToUserQuery,
  useVerifyAuthMutation,
} = authApi;
