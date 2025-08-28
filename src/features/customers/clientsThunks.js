import { createAsyncThunk } from "@reduxjs/toolkit";
import ClientsService from "../../Api/customers/ClientsService.js";

// GET – barcha clientlarni olish
export const getClients = createAsyncThunk(
    "clients/getClients",
    async (page, { rejectWithValue }) => {
        try {
            return await ClientsService.getAll(page);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch clients");
        }
    }
);

// POST – yangi client qo‘shish
export const addClient = createAsyncThunk(
    "clients/addClient",
    async (clientData, { rejectWithValue }) => {
        try {
            return await ClientsService.add(clientData);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to add client");
        }
    }
);

export const getClientsSelect = createAsyncThunk(
    "clients/addClient",
    async (_, { rejectWithValue }) => {
        try {
            return await ClientsService.getClientsSelect();
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to add client");
        }
    }
);

// PUT/PATCH – clientni tahrirlash
export const editClient = createAsyncThunk(
    "clients/editClient",
    async ({ id, clientData }, { rejectWithValue }) => {
        try {
            return await ClientsService.update(id, clientData);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to edit client");
        }
    }
);





export const ClientId = createAsyncThunk(
    "clients/deleteClient",
    async (id, { rejectWithValue }) => {
        try {
            return await ClientsService.clientsId(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to delete client");
        }
    }
);
