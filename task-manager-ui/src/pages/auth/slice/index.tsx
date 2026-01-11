import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Read token from localStorage on app load
const initialState: AuthState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: !!localStorage.getItem("token"),
};

// Slice for handling authentication state
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;

            // persist token
            localStorage.setItem("token", action.payload);
        },

        setUser: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
        },
    },
});

// Exported actions
export const { setAuthToken, setUser, logout } = authSlice.actions;

// Export the reducer to combine with the store
export default authSlice.reducer;