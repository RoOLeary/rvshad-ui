import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, LoginRequest, AuthResponse } from "../../types/types";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://api.findest.com/api/v2/',
        // prepareHeaders: (headers) => {
        //   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL3VuaXZlcnNlLmZpbmRlc3QuY29tIiwiaXNzIjoidW5pdmVyc2UuZmluZGVzdC5jb20iLCJleHAiOjE3NjI5NjEwODgsIm5iZiI6MTczMTQyNTA4OCwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InJvbmFuLm9sZWFyeUBmaW5kZXN0LmV1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJjNTVmODFiNS1mNTViLTQ3Y2UtYjkxZi0zNTE0YjhlY2EwZWEiLCJqdGkiOiJkMmQwMjIzMS04ODQ0LTQ0NjItYjAxOC0yNDY4NTRjOWM1N2MiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiRmluZGVzdEFkbWluaXN0cmF0b3IiLCJPd25lciJdLCJ0ZW5hbnRJZCI6IjA4ZGFlMjkzLWM1YjYtNGIxNC04MmNjLTNkNTIxYjdjN2UwOSIsInRlbmFudE5hbWUiOiJVbml2ZXJzZSBEZW1vIiwiaXNGaW5kZXN0VGVuYW50IjpmYWxzZSwicGVybWlzc2lvbnMiOlsiMDhkYWUyOTMtYzViNi00YjE0LTgyY2MtM2Q1MjFiN2M3ZTA5IiwiUmF0aW5nLlJlYWQiLCJSYXRpbmcuV3JpdGUiLCJSYXRpbmcuRGVsZXRlIiwiQ29tbWVudC5SZWFkIiwiQ29tbWVudC5Xcml0ZSIsIkNvbW1lbnQuRGVsZXRlIiwiTWF0dXJpdHlSYWRhci5SZWFkIiwiTWF0dXJpdHlSYWRhci5Xcml0ZSIsIk1hdHVyaXR5UmFkYXIuRGVsZXRlIiwiQWR2YW5jZWQiXSwiaWF0IjoxNzMxNDI1MDg4fQ.4vnV9YaO8nW_4JfHPGXBaO6M2jo_q8JlgPZ4qXBjUvQ";
        //   headers.set('authorization', `Bearer ${token}`);
        //   return headers;
        // },
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
