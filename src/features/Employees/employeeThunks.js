import { createAsyncThunk } from "@reduxjs/toolkit";
import EmployeeService from "../../Api/Employees/employeesService.js";
import ClientsService from "../../API/customers/ClientsService.js";

// Xodimlarni olish
export const getEmployees = createAsyncThunk(
    "employees/fetchEmployees",
    async (page, { rejectWithValue }) => {
        try {
            return await EmployeeService.getAll(page);
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
export const getContracts = createAsyncThunk(
    "employees/getContracts",
    async (id, { rejectWithValue }) => {
        try {
            return await EmployeeService.getContractId(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to update employee");
        }
    }
);

export const EmployeesId = createAsyncThunk(
    "clients/deleteClient",
    async (id, { rejectWithValue }) => {
        try {
            return await EmployeeService.employeesId(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to delete client");
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
