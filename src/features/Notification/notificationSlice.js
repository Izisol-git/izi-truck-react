import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notifications",
    initialState: [],
    reducers: {
        addNotification: (state, action) => {
            state.unshift(action.payload); // eng yangisini oldiga qo‘shamiz
        },
        // clearNotifications: () => []
    }
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
