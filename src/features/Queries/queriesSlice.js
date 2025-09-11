import {createSlice} from "@reduxjs/toolkit";
import {CreateQueries, getQueriesAll} from "./queriesThunks.js";

const initialState = {
    queries: [],
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
            state.queries = action.payload.data;
        });
        builder.addCase(getQueriesAll.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // builder.addCase(CreateQueries.fulfilled, (state, action) => {
        //     state.queries.push(action.payload.data);
        //     console.log(action.payload.data);
        // });
        //
        // builder.addCase(editQuery.fulfilled, (state, action) => {
        //     const index = state.queries.findIndex((q) => q.id === action.payload.id);
        //     if (index !== -1) {
        //         state.queries[index] = action.payload;
        //     }
        // });
        //
        // builder.addCase(deleteQuery.fulfilled, (state, action) => {
        //     state.queries = state.queries.filter((q) => q.id !== action.payload);
        // });
    }
});

export default queriesSlice.reducer;
