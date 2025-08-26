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
export const addSuggestionsReply = createAsyncThunk(
    'suggestions/addSuggestionsReply',
    async ({id , data}, { rejectWithValue }) => {
        try {
            return await suggestionsService.addSuggestionsReply(id , data);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch clients");
        }
    }
)
export const getSuggestions = createAsyncThunk(
    'suggestions/getSuggestions',
    async (_, { rejectWithValue }) => {
        try {
            return await suggestionsService.getSuggestions();
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch clients");
        }
    }
)