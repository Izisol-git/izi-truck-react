import {createSlice} from "@reduxjs/toolkit";
import {addSuggestions, addSuggestionsReply, getSuggestionsUser , getSuggestionsAdmin} from "./suggestionsThunks.js";

const suggestionsSlice = createSlice({
    name: "suggestions",
    initialState: {
        suggestions: [],
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
            .addCase(addSuggestions.fulfilled, (state, action) => {
                state.addLoadingSuggestions = false;
            })
            .addCase(addSuggestions.rejected, (state) => {
                state.addLoadingSuggestions = false;
            })


        // getSuggestionsAdmin
            .addCase(getSuggestionsAdmin.pending, (state) => {
                state.addLoadingSuggestions = true;
            })
            .addCase(getSuggestionsAdmin.fulfilled, (state, action) => {
                state.suggestions = action.payload;
                state.addLoadingSuggestions = false;
            })
            .addCase(getSuggestionsAdmin.rejected, (state) => {
                state.addLoadingSuggestions = false;
            })


        // getSuggestionsUser
            .addCase(getSuggestionsUser.pending, (state) => {
                state.addLoadingSuggestions = true;
            })
            .addCase(getSuggestionsUser.fulfilled, (state, action) => {
                state.suggestions = action.payload;
                state.addLoadingSuggestions = false;
            })
            .addCase(getSuggestionsUser.rejected, (state) => {
                state.addLoadingSuggestions = false;
            })

        // addSuggestionsReply
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