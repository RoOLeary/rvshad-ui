/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck abcdefh
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, AuthState } from '../types/types';

const initialState: AuthState = {
    user: 'Ro',
    token: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthResponse>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export const currentUser = (state: {
    auth: string; user: string | null; 
}) => state?.auth?.user; 
export default authSlice.reducer;