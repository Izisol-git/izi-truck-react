import {createSlice} from "@reduxjs/toolkit";
import {  getInvoices} from "./invoicesThunks.js";

const invoiceSlice = createSlice({
    name: "invoices",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get
            .addCase(getInvoices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getInvoices.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getInvoices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log(action.payload);
            })

            // // Add
            // .addCase(addInvoice.fulfilled, (state, action) => {
            //     state.items.push(action.payload);
            // })
            //
            // // Update
            // .addCase(updateInvoice.fulfilled, (state, action) => {
            //     const index = state.items.findIndex(
            //         (invoice) => invoice.id === action.payload.id
            //     );
            //     if (index !== -1) {
            //         state.items[index] = action.payload;
            //     }
            // })

            // // Delete
            // .addCase(deleteInvoice.fulfilled, (state, action) => {
            //     state.items = state.items.filter(
            //         (invoice) => invoice.id !== action.payload
            //     );
            // });
    },
});

export default invoiceSlice.reducer;