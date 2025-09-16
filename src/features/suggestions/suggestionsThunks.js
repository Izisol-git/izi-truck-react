import {createAsyncThunk} from "@reduxjs/toolkit";
import suggestionsService from "../../API/suggestions/suggestionsService.js";


export const addSuggestions = createAsyncThunk(
    'suggestions/addSuggestions',
    async (data, { rejectWithValue }) => {
        try {
            return await suggestionsService.addsuggestions(data);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch suggestions");
        }
    }
)
export const addSuggestionsReply = createAsyncThunk(
    'suggestions/addSuggestionsReply',
    async ({id , data}, { rejectWithValue }) => {
        try {
            return await suggestionsService.addSuggestionsReply(id , data);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch suggestions");
        }
    }
)

export const editSuggestions = createAsyncThunk(
    'suggestions/editSuggestions',
    async (id , { rejectWithValue }) => {
        try {
            return await suggestionsService.editSuggestions(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch suggestions");
        }
    }
)



export const getSuggestionsId = createAsyncThunk(
    'suggestions/getSuggestionsId',
    async (id , { rejectWithValue }) => {
        try {
            return await suggestionsService.getSuggestionsId(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch suggestions");
        }
    }
)
export const getSuggestionsUser = createAsyncThunk(
    'suggestions/getSuggestionsUser',
    async (_, { rejectWithValue }) => {
        try {
            return await suggestionsService.getSuggestionsUser();
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch suggestions");
        }
    }
)
export const getSuggestionsAdmin = createAsyncThunk(
    'suggestions/getSuggestionsAdmin',
    async (pageqq, { rejectWithValue }) => {
        try {
            return await suggestionsService.getSuggestionsAdmin(pageqq);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch suggestions");
        }
    }
)