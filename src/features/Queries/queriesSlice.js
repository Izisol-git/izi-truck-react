import {createSlice} from "@reduxjs/toolkit";
import {getQueriesAll} from "./queriesThunks.js";

const initialState = {
    orders: [],
    loading: false,
    error: null,
};

const queriesSlice = createSlice({
    name: "queries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // GET queries
        builder.addCase(getQueriesAll.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getQueriesAll.fulfilled, (state, action) => {
            state.loading = false;
            // state.orders = action.payload;
        });
        builder.addCase(getQueriesAll.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default queriesSlice.reducer;
