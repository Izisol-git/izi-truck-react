import {createSlice} from "@reduxjs/toolkit";
import {GetQueriesId ,  getQueriesAll, updateQueries} from "./queriesThunks.js";

const initialState = {
    queries: [],
    addQueriesDate: [],
    queriesId: [],
    loading: false,
    error: null,
};

const queriesSlice = createSlice({
    name: "queries",
    initialState,
    reducers: {
        AddQueries (state, action){
            state.queriesId = action.payload;
        }
    },
    extraReducers: (builder) => {
        // GET queries
        builder.addCase(getQueriesAll.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getQueriesAll.fulfilled, (state, action) => {
            state.loading = false;
            state.queries = action.payload.data;
            state.addQueriesDate = new Date();
        });
        builder.addCase(getQueriesAll.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // GET GetQueriesId
        builder.addCase(GetQueriesId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetQueriesId.fulfilled, (state, action) => {
            state.loading = false;
            state.queriesId = action.payload.query;
        });
        builder.addCase(GetQueriesId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // // GET selectedQueries
        // builder.addCase(getAllSelect.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // });
        // builder.addCase(getAllSelect.fulfilled, (state ,action) => {
        //     state.loading = false;
        //     state.selectedQueries = action.payload;
        // });
        // builder.addCase(getAllSelect.rejected, (state, action) => {
        //     state.loading = false;
        // });

        // update queries
        builder.addCase(updateQueries.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateQueries.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedQueries = action.payload;
        });
        builder.addCase(updateQueries.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // builder.addCase(CreateQueries.fulfilled, (state, action) => {
        //     state.queries.queries.data.unshift(action.payload.data);
        //     console.log(action);
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

export const {AddQueries} = queriesSlice.actions;

export default queriesSlice.reducer;
