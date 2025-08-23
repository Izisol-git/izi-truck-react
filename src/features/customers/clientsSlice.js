import {createSlice} from "@reduxjs/toolkit";
import {getClients, addClient, editClient} from "./clientsThunks";
import {closeModal} from "../EmployeSModalToggle/employesModalToggle.js";

const clientsSlice = createSlice({
    name: "clients",
    initialState: {
        list: [],
        loading: false,
        loadingClient : false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(getClients.pending, (state) => {
                state.loading = true;
            })
            .addCase(getClients.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(getClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ADD
            .addCase(addClient.pending, (state, action) => {
                // state.list.push(action.payload);
                state.loadingClient = true;
            })
            .addCase(addClient.fulfilled, (state, action) => {
                // state.list.push(action.payload);
                state.loadingClient = false;
            })
            .addCase(addClient.rejected, (state, action) => {
                // state.list.push(action.payload);
                state.loadingClient = false;

            })

            // EDIT
            .addCase(editClient.pending, (state, action) => {
                // const index = state.list.findIndex(c => c.id === action.payload.id);
                // if (index !== -1) state.list[index] = action.payload;
                state.loadingClient = true;
            })
            .addCase(editClient.fulfilled, (state, action) => {
                // const index = state.list.findIndex(c => c.id === action.payload.id);
                // if (index !== -1) state.list[index] = action.payload;
                state.loadingClient = false;
            })
            .addCase(editClient.rejected, (state, action) => {
                // const index = state.list.findIndex(c => c.id === action.payload.id);
                // if (index !== -1) state.list[index] = action.payload;
                state.loadingClient = false;
            })

        //
        // // DELETE
        // .addCase(deleteClient.fulfilled, (state, action) => {
        //     state.list = state.list.filter(c => c.id !== action.meta.arg);
        // });
    },
});

export default clientsSlice.reducer;
