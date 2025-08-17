import { createSlice } from "@reduxjs/toolkit";
import { getEmployees, addEmployee, deleteEmployee } from "./employeeThunks";

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
            // Add
            .addCase(addEmployee.fulfilled, (state, action) => {
                // state.items.push(action.payload);
                state.loadingAddEmployee = false;
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.loadingAddEmployee = false;
            })

            // Delete
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.items = state.items.filter((emp) => emp.id !== action.payload);
            });
    },
});

export default employeeSlice.reducer;
