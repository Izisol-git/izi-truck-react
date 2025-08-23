import { createSlice } from "@reduxjs/toolkit";
import {getOrders, addOrder, editOrder, deleteOrder, getFilteredOrders} from "./ordersThunks.js";

const initialState = {
    orders: [],
    loading: false,

    error: null,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // GET orders
        builder.addCase(getFilteredOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getFilteredOrders.fulfilled, (state, action) => {
            state.loading = false;
            // state.orders = action.payload;
        });
        builder.addCase(getFilteredOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // ADD order
        builder.addCase(addOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addOrder.fulfilled, (state, action) => {
            state.loading = false;
            // state.orders.push(action.payload);
        });
        builder.addCase(addOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // EDIT order
        builder.addCase(editOrder.pending, (state) => {
            state.loading = true;
            // state.error = null;
        });
        builder.addCase(editOrder.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.orders.findIndex(order => order.id === action.payload.id);
            // if (index !== -1) state.orders[index] = action.payload;
        });
        builder.addCase(editOrder.rejected, (state, action) => {
            state.loading = false;
            // state.error = action.payload;
        });

        // DELETE order
        builder.addCase(deleteOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = state.orders.filter(order => order.id !== action.payload.id);
        });
        builder.addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default ordersSlice.reducer;
