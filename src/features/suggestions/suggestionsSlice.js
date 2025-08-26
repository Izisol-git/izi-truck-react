import {createSlice} from "@reduxjs/toolkit";
import {addSuggestions, addSuggestionsReply} from "./suggestionsThunks.js";

const suggestionsSlice = createSlice({
    name: "suggestions",
    initialState: {
        list: [],
        addLoadingSuggestions: false,
        addLoadingSuggestionsId: false,
        error: null,
    },
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(addSuggestions.pending, (state) => {
                state.addLoadingSuggestions = true;
            })
            .addCase(addSuggestions.fulfilled, (state) => {
                state.addLoadingSuggestions = false;
            })
            .addCase(addSuggestions.rejected, (state) => {
                state.addLoadingSuggestions = false;
            })
            .addCase(addSuggestionsReply.pending, (state) => {
                state.addLoadingSuggestionsId = true;
            })
            .addCase(addSuggestionsReply.fulfilled, (state) => {
                state.addLoadingSuggestionsId = false;
            })
            .addCase(addSuggestionsReply.rejected, (state) => {
                state.addLoadingSuggestionsId = false;
            })
    }
})

export default suggestionsSlice.reducer;