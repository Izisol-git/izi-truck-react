import {createSlice} from "@reduxjs/toolkit";
import {addDriver, driversGetId, editDriver, getDrivers} from "./driversThunks.js";

const driversSlice = createSlice({
    name: "drivers",
    initialState: {
        drivers: [],
        addDriversDate: [],
        driversId: [],
        loading: false,
        loadingAddDrivers: false,
        error: null,
    },
    reducers: {
        AddDriversId(state, action){
            state.driversId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(getDrivers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDrivers.fulfilled, (state, action) => {
                state.loading = false;
                state.drivers = action.payload.data;
                state.addDriversDate = new Date()
            })
            .addCase(getDrivers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(driversGetId.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(driversGetId.fulfilled, (state, action) => {
                state.loading = false;
                state.driversId = action.payload.driver;
            })
            .addCase(driversGetId.rejected, (state, action) => {
                state.loading = false;
            })

            .addCase(addDriver.pending, (state) => {
                state.loadingAddDrivers = true;

            })

            .addCase(addDriver.fulfilled, (state, action) => {
                // state.items.push(action.payload);
                state.loadingAddDrivers = false;
            })
            .addCase(addDriver.rejected, (state, action) => {
                state.loadingAddDrivers = false;
            })

            .addCase(editDriver.pending, (state) => {
                state.loadingAddDrivers = true;

            })
            .addCase(editDriver.fulfilled, (state, action) => {
                // state.items.push(action.payload);
                state.loadingAddDrivers = false;
            })
            .addCase(editDriver.rejected, (state, action) => {
                state.loadingAddDrivers = false;
            })

    },
});

export const {AddDriversId} = driversSlice.actions;

export default driversSlice.reducer;
