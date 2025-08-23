import {createSlice} from "@reduxjs/toolkit";
import {addDriver, driversGetId, editDriver, getDrivers} from "./driversThunks.js";

const driversSlice = createSlice({
    name: "drivers",
    initialState: {
        items: [],
        loading: false,
        loadingAddDrivers: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(getDrivers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDrivers.fulfilled, (state, action) => {
                state.loading = false;
                // state.items = action.payload;
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
        //
        // .addCase(updateEmployee.pending, (state) => {
        //     state.loadingAddEmployee = true;
        //
        // })
        //
        // .addCase(updateEmployee.fulfilled, (state, action) => {
        //     // state.items.push(action.payload);
        //     state.loadingAddEmployee = false;
        // })
        // .addCase(updateEmployee.rejected, (state, action) => {
        //     state.loadingAddEmployee = false;
        // })
        //
        //
        // // Delete
        // .addCase(deleteEmployee.fulfilled, (state, action) => {
        //     state.items = state.items.filter((emp) => emp.id !== action.payload);
        // });
    },
});

export default driversSlice.reducer;
