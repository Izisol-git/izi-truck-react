import { createSlice } from "@reduxjs/toolkit";
import {getEmployees, addEmployee, deleteEmployee, updateEmployee} from "./employeeThunks";

const employeeSlice = createSlice({
    name: "employees",
    initialState: {
        items: [],
        loading: false,
        loadingAddEmployee: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(getEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.loading = false;
                // state.items = action.payload;
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addEmployee.pending, (state) => {
                state.loadingAddEmployee = true;

            })

            .addCase(addEmployee.fulfilled, (state, action) => {
                // state.items.push(action.payload);
                state.loadingAddEmployee = false;
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.loadingAddEmployee = false;
            })

            .addCase(updateEmployee.pending, (state) => {
                state.loadingAddEmployee = true;

            })

            .addCase(updateEmployee.fulfilled, (state, action) => {
                // state.items.push(action.payload);
                state.loadingAddEmployee = false;
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loadingAddEmployee = false;
            })


            // Delete
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.items = state.items.filter((emp) => emp.id !== action.payload);
            });
    },
});

export default employeeSlice.reducer;
