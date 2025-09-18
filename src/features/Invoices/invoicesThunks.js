import { createAsyncThunk } from "@reduxjs/toolkit";
import InvoicesService from "../../API/invoices/invoicesService.js";

// Invoicelarni olish
export const getInvoices = createAsyncThunk(
    "invoices/getInvoices",
    async (data,{ rejectWithValue }) => {
        try {
            return await InvoicesService.getAll(data);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch invoices");
        }
    }
);

export const getInvoicesStatus = createAsyncThunk(
    "invoices/getInvoicesStatus",
    async (  index,{ rejectWithValue }) => {
        try {
            return await InvoicesService.getStatus(index);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch invoices");
        }
    }
);
export const EimzoConnection = createAsyncThunk(
    "invoices/EimzoConnection",
    async (senData,{ rejectWithValue }) => {
        try {
            return await InvoicesService.eimzoConnections(senData);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch invoices");
        }
    }
);

// // Yangi invoice qo‘shish
// export const addInvoice = createAsyncThunk(
//     "invoices/addInvoice",
//     async (data, { rejectWithValue }) => {
//         try {
//             return await InvoicesService.create(data);
//         } catch (err) {
//             return rejectWithValue(err.response?.data || "Failed to add invoice");
//         }
//     }
// );
//
// // Invoice yangilash
// export const updateInvoice = createAsyncThunk(
//     "invoices/updateInvoice",
//     async ({ id, data }, { rejectWithValue }) => {
//         try {
//             return await InvoicesService.update(id, data);
//         } catch (err) {
//             return rejectWithValue(err.response?.data || "Failed to update invoice");
//         }
//     }
// );
//

export const LogoutInvoice = createAsyncThunk(
    "invoices/LogoutInvoice",
    async (_, { rejectWithValue }) => {
        try {
            return await InvoicesService.logout();
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to delete invoice");
        }
    }
);