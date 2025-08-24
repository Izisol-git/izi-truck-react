import {createSlice} from "@reduxjs/toolkit";
import {addSuggestions} from "./suggestionsThunks.js";

const suggestionsSlice = createSlice({
    name: "suggestions",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(addSuggestions.pending, (state) => {
                state.loading = true;
            })
    }
})

export default suggestionsSlice.reducer;