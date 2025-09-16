import { createAsyncThunk } from "@reduxjs/toolkit";
import EmployeeService from "../../API/Employees/employeesService.js";


// Xodimlarni olish
export const getEmployees = createAsyncThunk(
    "employees/fetchEmployees",
    async ({page , search}, { rejectWithValue }) => {
        try {
            return await EmployeeService.getAll(page , search);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch employees");
        }
    }
);

// Xodim qo‘shish
export const addEmployee = createAsyncThunk(
    "employees/addEmployee",
    async (employeeData, { rejectWithValue }) => {
        try {
            return await EmployeeService.create(employeeData);

        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to add employee");
        }
    }
);


// Xodimni yangilash
export const updateEmployee = createAsyncThunk(
    "employees/updateEmployee",
    async ({ id, employeeData }, { rejectWithValue }) => {
        try {
            return await EmployeeService.update(id, employeeData);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to update employee");
        }
    }
);

// export const AddContracts = createAsyncThunk(
//     "employees/updateEmployee",
//     async ({ id, employeeData }, { rejectWithValue }) => {
//         try {
//             return await EmployeeService.update(id, employeeData);
//         } catch (err) {
//             return rejectWithValue(err.response?.data || "Failed to update employee");
//         }
//     }
// );


export const EmployeesId = createAsyncThunk(
    "clients/EmployeesId",
    async (id, { rejectWithValue }) => {
        try {
            return await EmployeeService.employeesId(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to delete client");
        }
    }
);


// Xodim o‘chirish
export const getContractId = createAsyncThunk(
    "employees/getContractId",
    async (id, { rejectWithValue }) => {
        try {
           return await EmployeeService.getContractId(id);

        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to delete employee");
        }
    }
);

// Xodim o‘chirish
export const deleteEmployee = createAsyncThunk(
    "employees/deleteEmployee",
    async (id, { rejectWithValue }) => {
        try {
            await EmployeeService.remove(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to delete employee");
        }
    }
);


// Excel export thunk
export const exportEmployeeExcel = createAsyncThunk(
    "orders/exportEmployeeExcel",
    async ({ search ,selectedKeys}, { rejectWithValue }) => {
        try {
            const blob = await EmployeeService.exportEmployeeExcel( search ,selectedKeys);

            // Faylni yuklab olish
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "employee.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();

            return true;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
