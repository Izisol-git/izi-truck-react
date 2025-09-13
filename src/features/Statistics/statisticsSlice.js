import {createSlice} from "@reduxjs/toolkit";
import {getStatistics} from "./statisticsThunks.js";

const initialState = {
    statistics: [],
    loading: false,
    error: null,
};

const statisticsSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatistics.pending, (state ) => {
            state.loading = true;
        })
        builder.addCase(getStatistics.fulfilled, (state,action) => {
            state.loading = false;
            state.statistics = action.payload;
        })
        builder.addCase(getStatistics.rejected, (state) => {
            state.loading = false;
        })
    }
});

export default statisticsSlice.reducer;
