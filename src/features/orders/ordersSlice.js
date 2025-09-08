import {createSlice} from "@reduxjs/toolkit";
import {
    addOrder,
    editOrder,
    deleteOrder,
    getFilteredOrders,
    exportOrdersExcel,
    actDataAdd,
    addDidoxId
} from "./ordersThunks.js";

const initialState = {
    orders: [],
    loading: false,
    exporting: false,
    actLoading: false,
    addDidox: false,
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
        // act data
        builder.addCase(actDataAdd.pending, (state) => {
            state.actLoading = true;
            state.error = null;
        });
        builder.addCase(actDataAdd.fulfilled, (state, action) => {
            state.actLoading = false;
            // state.orders = action.payload;
        });
        builder.addCase(actDataAdd.rejected, (state, action) => {
            state.actLoading = false;
            state.error = action.payload;
        });

        // didox
        builder.addCase(addDidoxId.pending, (state) => {
            state.addDidox = true;
            state.error = null;
        });
        builder.addCase(addDidoxId.fulfilled, (state, action) => {
            state.addDidox = false;
            // state.orders = action.payload;
        });
        builder.addCase(addDidoxId.rejected, (state, action) => {
            state.addDidox = false;
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
        // Excel export
        builder.addCase(exportOrdersExcel.pending, (state) => {
            state.exporting = true;
            state.error = null;
        })
        builder.addCase(exportOrdersExcel.fulfilled, (state) => {
                state.exporting = false;
            })
        builder.addCase(exportOrdersExcel.rejected, (state, action) => {
                state.exporting = false;
                state.error = action.payload;
            });
    }
});

export default ordersSlice.reducer;
