
import {createAsyncThunk} from "@reduxjs/toolkit";
import QueriesService from "../../API/Queries/queriesService.js";



// GET – barcha Querieslarni olish
export const getQueriesAll = createAsyncThunk(
    "orders/getQueriesAll",
    async ({pageqq , search}, { rejectWithValue }) => {
        try {
            return await QueriesService.getAll(pageqq , search);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch queries");
        }
    }
);

// GET – barcha Selectlarni olish
export const getAllSelect = createAsyncThunk(
    "orders/getAllSelect",
    async ({params}, { rejectWithValue }) => {
        try {
            return await QueriesService.getAllSelect(params);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch queries");
        }
    }
);

//   queries create
export const CreateQueries = createAsyncThunk(
    "orders/CreateQueries",
    async ({data}, { rejectWithValue }) => {
        try {
            return await QueriesService.create(data);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch queries");
        }
    }
);
// queriesId
export const GetQueriesId = createAsyncThunk(
    "orders/GetQueriesId",
    async (id, { rejectWithValue }) => {
        try {
            return await QueriesService.queriesId(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch queries");
        }
    }
);
// createOrder
export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (id, { rejectWithValue }) => {
        try {
            return await QueriesService.createOrder(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch queries");
        }
    }
);

// update queries
export const updateQueries = createAsyncThunk(
    "orders/updateQueries",
    async ({id , formData}, { rejectWithValue }) => {
        try {
            return await QueriesService.update(id , formData);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch queries");
        }
    }
);



// Excel export thunk
export const exportQueriesExcel = createAsyncThunk(
    "orders/exportQueriesExcel",
    async ({ search ,selectedKeys}, { rejectWithValue }) => {
        try {
            const blob = await QueriesService.exportQuerieExcel( search ,selectedKeys);
            // Faylni yuklab olish
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "queries.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
            return true;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// createOrder
export const deleteQueries = createAsyncThunk(
    "orders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            return await QueriesService.deleteQueries(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch queries");
        }
    }
);


