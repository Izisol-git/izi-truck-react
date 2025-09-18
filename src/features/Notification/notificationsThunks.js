import {createAsyncThunk} from "@reduxjs/toolkit";
import NotificationsService from "../../API/Notifications/notificationsService.js";

export const getNotifications = createAsyncThunk(
    "employees/getNotifications",
    async (page, { rejectWithValue }) => {
        try {
            return await NotificationsService.getAll(page);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch notifications");
        }
    }
);
export const getCahts = createAsyncThunk(
    "employees/getCahts",
    async (page, { rejectWithValue }) => {
        try {
            return await NotificationsService.getAllChats(page);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch notifications");
        }
    }
);
export const getAllChatsID = createAsyncThunk(
    "employees/getAllChatsID",
    async (id, { rejectWithValue }) => {
        try {
            return await NotificationsService.getAllChatsId(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch notifications");
        }
    }
);
export const sendMessages = createAsyncThunk(
    "employees/sendMessages",
    async ({id, data}, { rejectWithValue }) => {
        try {
            return await NotificationsService.sendMessage(id , data);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch notifications");
        }
    }
);
export const readNotifications = createAsyncThunk(
    "employees/readNotifications",
    async (id, { rejectWithValue }) => {
        try {
            return await NotificationsService.addRead(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch notifications");
        }
    }
);