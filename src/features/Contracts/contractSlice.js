import {createSlice} from "@reduxjs/toolkit";
import {addContractsData, editContracts, getContracts} from "./contractThunks.js";

const initialState = {
    list: [],
    loading: false,
    loadingAddEdit: false,
    search: "",
    error: null,
};

const contractSlice = createSlice({
    name: "contracts",
    initialState,
    reducers: {
        changeSearch: (state, action) => {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // // Login
            .addCase(editContracts.pending, (state) => {
                state.loadingAddEdit = true;
                state.error = null;
            })
            .addCase(editContracts.fulfilled, (state, action) => {
                state.loadingAddEdit = false;
            })
            .addCase(editContracts.rejected, (state, action) => {
                state.loadingAddEdit = false;
                state.error = action.payload;
            })
            .addCase(addContractsData.pending, (state) => {
                state.loadingAddEdit = true;
                state.error = null;
            })
            .addCase(addContractsData.fulfilled, (state, action) => {
                state.loadingAddEdit = false;
            })
            .addCase(addContractsData.rejected, (state, action) => {
                state.loadingAddEdit = false;
                state.error = action.payload;
            })
            // // Login
            .addCase(getContracts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getContracts.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(getContracts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    },
});

export const {changeSearch} = contractSlice.actions;
export default contractSlice.reducer;
