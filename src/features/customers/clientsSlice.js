import {createSlice} from "@reduxjs/toolkit";
import {getClients, addClient, editClient, ClientId} from "./clientsThunks";

const clientsSlice = createSlice({
    name: "clients",
    initialState: {
        clients: [],
        clientsId: [],
        loading: false,
        loadingClient : false,
        error: null,
    },
    reducers: {
        AddClientId (state, action) {
            state.clientsId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(getClients.pending, (state) => {
                state.loading = true;
            })
            .addCase(getClients.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload.clients;
            })
            .addCase(getClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ClientId
            .addCase(ClientId.pending, (state) => {
                state.loading = true;
            })
            .addCase(ClientId.fulfilled, (state, action) => {
                state.loading = false;
                state.clientsId = action.payload.data;
            })
            .addCase(ClientId.rejected, (state, action) => {
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

export const { AddClientId } = clientsSlice.actions;

export default clientsSlice.reducer;
