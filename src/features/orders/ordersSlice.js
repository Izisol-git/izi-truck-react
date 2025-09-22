import {createSlice} from "@reduxjs/toolkit";
import {
    addOrder,
    editOrder,
    appointDriver,
    getFilteredOrders,
    exportOrdersExcel,
    actDataAdd,
    addDidoxId, getOrdersId, ordersSelect, getShowOrders
} from "./ordersThunks.js";

const initialState = {
    orders: [],
    addOrdersDate: [],
    ordersId: [],
    ordersSelect: [],
    loading: false,
    exporting: false,
    actLoading: false,
    addDidox: false,
    error: null,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        AddOrderId(state, action)  {
            state.ordersId = action.payload
        }
    },
    extraReducers: (builder) => {
        // GET orders
        builder.addCase(getFilteredOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getFilteredOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            state.addOrdersDate = new Date();
        });
        builder.addCase(getFilteredOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // GET orders
        builder.addCase(getOrdersId.pending, (state) => {
            // state.loading = true;
            state.error = null;
        });
        builder.addCase(getOrdersId.fulfilled, (state, action) => {
            // state.loading = false;
            state.ordersId = action.payload.order;
        });
        builder.addCase(getOrdersId.rejected, (state, action) => {
            // state.loading = false;
            state.error = action.payload;
        });
        // GET orders
        builder.addCase(getShowOrders.pending, (state) => {
            // state.loading = true;
            state.error = null;
        });
        builder.addCase(getShowOrders.fulfilled, (state, action) => {
            // state.loading = false;
            state.ordersId = action.payload.order;
        });
        builder.addCase(getShowOrders.rejected, (state, action) => {
            // state.loading = false;
            state.error = action.payload;
        });
        // GET ordersSelect
        builder.addCase(ordersSelect.pending, (state) => {
            // state.loading = true;
            state.error = null;
        });
        builder.addCase(ordersSelect.fulfilled, (state, action) => {
            // state.loading = false;
            state.ordersSelect = action.payload;
        });
        builder.addCase(ordersSelect.rejected, (state, action) => {
            // state.loading = false;
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
        });
        builder.addCase(editOrder.rejected, (state, action) => {
            state.loading = false;
        });

        //  appointDriver
        builder.addCase(appointDriver.pending, (state) => {
            state.loading = true;
            // state.error = null;
        });
        builder.addCase(appointDriver.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(appointDriver.rejected, (state, action) => {
            state.loading = false;
        });



        // DELETE order
        // builder.addCase(deleteOrder.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // });
        // builder.addCase(deleteOrder.fulfilled, (state, action) => {
        //     state.loading = false;
        // });
        // builder.addCase(deleteOrder.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // });
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


export const {AddOrderId} = ordersSlice.actions;

export default ordersSlice.reducer;
