import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store'; // Adjust this import path as needed
import type { User, LoginRequest, AuthResponse } from "../../types/types";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://api.findest.com/api/v2/',
        prepareHeaders: (headers, { getState }) => {
            // Get token from state and add to headers if it exists
            const state = getState() as RootState;
            const token = state.auth?.token;
            
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        // Login mutation
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'authentication/verify',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response: AuthResponse) => {
                // You can transform the response here if needed
                return response;
            },
            invalidatesTags: ['Auth'],
        }),

        // Get current user profile
        getProfile: builder.query<User, void>({
            query: () => '/auth/profile',
            providesTags: ['Auth'],
        }),

        // Logout mutation
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});

// Export the hooks for all API queries and mutations
export const {
    useLoginMutation,
    useGetProfileQuery,
    useLogoutMutation,
} = authApi;
