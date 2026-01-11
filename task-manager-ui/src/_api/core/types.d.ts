type AuthUser = {
    id: number;
    email: string;
    username: string;
}

// Define the shape of the auth state
type AuthState = {
    token: string | null;
    user: AuthUser | null;
    isAuthenticated: boolean;
}

type SignupRequest = {
    email: string;
    username: string;
    password: string;
}

type LoginRequest = {
    identifier: string;
    password: string;
}

type LoginResponse = {
    token: string;
    user: AuthUser;
}