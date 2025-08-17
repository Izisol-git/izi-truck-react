import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../api/Auth/authService.js";

// Login thunk
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await AuthService.userLogin(userData);
            return res.data; // serverdan kelgan data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
);

// Get current user thunk
export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await AuthService.getUser();
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch user");
        }
    }
);
