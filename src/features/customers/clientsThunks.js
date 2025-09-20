import { createAsyncThunk } from "@reduxjs/toolkit";
import ClientsService from "../../API/customers/ClientsService.js";

// GET – barcha clientlarni olish
export const getClients = createAsyncThunk(
    "clients/getClients",
    async ({page , search}, { rejectWithValue }) => {
        try {
            return await ClientsService.getAll(page , search);
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
    "clients/getClientsSelect",
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
    "clients/ClientId",
    async (id, { rejectWithValue }) => {
        try {
            return await ClientsService.clientsId(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to delete client");
        }
    }
);



// Excel export thunk
export const exportClientsExcel = createAsyncThunk(
    "orders/exportClientsExcel",
    async ({ search ,selectedKeys}, { rejectWithValue }) => {
        try {
            const blob = await ClientsService.exportClientExcel( search ,selectedKeys);
            // Faylni yuklab olish
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "clients.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
            return true;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const deleteClients = createAsyncThunk(
    "clients/ClientId",
    async (id, { rejectWithValue }) => {
        try {
            return await ClientsService.deleteClients(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to delete client");
        }
    }
);
