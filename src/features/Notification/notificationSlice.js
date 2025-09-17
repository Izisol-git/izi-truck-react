import { createSlice } from "@reduxjs/toolkit";
import {getNotifications} from "./notificationsThunks.js";

const notificationSlice = createSlice({
    name: "notifications",
    initialState: {
        notifications: [],
        loading: false,
        error: null,
    },
    reducers: {
        addNotification: (state, action) => {
            state.notifications.messages.push(action.payload);
            state.notifications.count += 1
            console.log(state);
        },
        // clearNotifications: () => []
    },
    extraReducers(builder) {
        // GET queries
        builder.addCase(getNotifications.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getNotifications.fulfilled, (state, action) => {
            state.loading = false;
            state.notifications = action.payload;
        });
        builder.addCase(getNotifications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
