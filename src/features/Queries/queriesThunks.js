
import {createAsyncThunk} from "@reduxjs/toolkit";
import QueriesService from "../../API/Queries/queriesService.js";



// GET – barcha orderslarni olish
export const getQueriesAll = createAsyncThunk(
    "orders/getQueries",
    async (page, { rejectWithValue }) => {
        try {
            return await QueriesService.getAll(page);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch queries");
        }
    }
);