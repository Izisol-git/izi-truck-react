import {createSlice} from "@reduxjs/toolkit";
import {addSuggestions, getSuggestionsId, addSuggestionsReply, getSuggestionsUser, getSuggestionsAdmin} from "./suggestionsThunks.js";

const suggestionsSlice = createSlice({
    name: "suggestions",
    initialState: {
        suggestions: [],
        addSuggestionsDate: [],
        suggestionsId: [],
        addLoadingSuggestions: false,
        addLoadingSuggestionsId: false,
        error: null,
    },
    reducers: {
        AddSuggestionsId(state, action) {
            state.suggestionsId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addSuggestions.pending, (state) => {
                state.addLoadingSuggestionsId = true;
            })
            .addCase(addSuggestions.fulfilled, (state, action) => {
                state.addLoadingSuggestionsId = false;
            })
            .addCase(addSuggestions.rejected, (state) => {
                state.addLoadingSuggestionsId = false;
            })


            // getSuggestionsAdmin
            .addCase(getSuggestionsAdmin.pending, (state) => {
                state.addLoadingSuggestions = true;
            })
            .addCase(getSuggestionsAdmin.fulfilled, (state, action) => {
                state.suggestions = action.payload;
                state.addLoadingSuggestions = false;
                state.addSuggestionsDate = new Date()
            })
            .addCase(getSuggestionsAdmin.rejected, (state) => {
                state.addLoadingSuggestions = false;
            })


            // getSuggestionsId
            .addCase(getSuggestionsId.pending, (state) => {
                state.addLoadingSuggestions = true;
            })
            .addCase(getSuggestionsId.fulfilled, (state, action) => {
                state.suggestionsId = action.payload;
                state.addLoadingSuggestions = false;
            })
            .addCase(getSuggestionsId.rejected, (state) => {
                state.addLoadingSuggestions = false;
            })


            // getSuggestionsUser
            .addCase(getSuggestionsUser.pending, (state) => {
                state.addLoadingSuggestions = true;
            })
            .addCase(getSuggestionsUser.fulfilled, (state, action) => {
                state.suggestions = action.payload;
                state.addLoadingSuggestions = false;
                state.addSuggestionsDate = new Date()
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

export const {AddSuggestionsId} = suggestionsSlice.actions;

export default suggestionsSlice.reducer;