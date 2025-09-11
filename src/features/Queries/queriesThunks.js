
import {createAsyncThunk} from "@reduxjs/toolkit";
import QueriesService from "../../API/Queries/queriesService.js";



// GET – barcha Querieslarni olish
export const getQueriesAll = createAsyncThunk(
    "orders/getQueries",
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
    "orders/getQueries",
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
    "orders/AddQueries",
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
    "orders/queriesId",
    async (id, { rejectWithValue }) => {
        try {
            return await QueriesService.queriesId(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch queries");
        }
    }
);