export interface AuthResponse {
    user: {
        id: string;
        email: string;
        name: string;
    };
    token: string;
}

export interface AuthState {
    user: AuthResponse['user'] | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

// export const initialState: AuthState = {
//     user: null,
//     token: null,
//     isLoading: false,
//     error: null,
// };