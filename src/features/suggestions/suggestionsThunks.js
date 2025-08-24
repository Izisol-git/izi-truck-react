import {createAsyncThunk} from "@reduxjs/toolkit";
import suggestionsService from "../../API/suggestions/suggestionsService.js";


export const addSuggestions = createAsyncThunk(
    'suggestions/addSuggestions',
    async (data, { rejectWithValue }) => {
        try {
            return await suggestionsService.addsuggestions(data);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch clients");
        }
    }
)