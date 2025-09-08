import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    orders: [],
    loading: false,
    error: null,
};

const statisticsSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
});

export default statisticsSlice.reducer;
