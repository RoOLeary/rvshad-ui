import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthResponse, AuthState, LoginRequest, User } from '../../types/types';

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

// Define the API
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
    verifyAuth: builder.mutation<AuthResponse, { sharedToSettings: any }>({
      query: (body) => ({
        url: 'authentication/verify',
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Define the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user; // Ensure `user` matches the `User` type
      state.token = action.payload.token;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions from the slice
export const { setCredentials, clearAuth } = authSlice.actions;

// Selector to get the current user from the state
export const currentUser = (state: { auth: AuthState }) => state.auth.user;


// Combine the reducers for store configuration
export const authReducer = {
  api: authApi.reducer,
  slice: authSlice.reducer,
};

// Export RTK Query hooks
export const {
  useLoginMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useCheckIsObjectSharedToUserQuery,
  useVerifyAuthMutation,
} = authApi;
