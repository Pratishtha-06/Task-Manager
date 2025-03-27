import { createSlice } from "@reduxjs/toolkit";

const loadUserFromStorage = () => {
    return sessionStorage.getItem("loggedInUser") || null;
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: !!loadUserFromStorage(),
        user: loadUserFromStorage(),
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.username;
            sessionStorage.setItem("loggedInUser", action.payload.username);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            sessionStorage.removeItem("loggedInUser");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
