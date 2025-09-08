import {createAsyncThunk} from "@reduxjs/toolkit";
import StatisticsService from "../../API/Statistics/statisticsService.js";

export const getStatistics = createAsyncThunk(
    "Statistics/getStatistics",
    async (_, { rejectWithValue }) => {
        try {
            return await StatisticsService.getAll();
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch Statistics");
        }
    }
);