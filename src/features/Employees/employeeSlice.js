import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getEmployees, addEmployee,  updateEmployee, EmployeesId, getContractId} from "./employeeThunks";

const employeeSlice = createSlice({
    name: "employees",
    initialState: {
        employees: [],
        addEmployeesDate: [],
        employeesId: [],
        contractID : [],
        loading: false,
        loadingAddEmployee: false,
        error: null,
    },
    reducers: {
        AddEmployeeId(state, action){
            state.employeesId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(getEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload.data;
                state.addEmployeesDate = new Date()
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch
            .addCase(EmployeesId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(EmployeesId.fulfilled, (state, action) => {
                state.loading = false;
                state.employeesId = action.payload.data;
            })
            .addCase(EmployeesId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch
            .addCase(getContractId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getContractId.fulfilled, (state, action) => {
                state.loading = false;
                state.contractID = action.payload.data;
            })
            .addCase(getContractId.rejected, (state, action) => {
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

    },
});

export const {AddEmployeeId} = employeeSlice.actions;

export default employeeSlice.reducer;
