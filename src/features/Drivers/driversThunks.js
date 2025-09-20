import { createAsyncThunk } from "@reduxjs/toolkit";
import DriversService   from "../../API/Drivers/driversService.js";

// Xodimlarni olish
export const getDrivers = createAsyncThunk(
    "employees/getDrivers",
    async ({page , search }, { rejectWithValue }) => {
        try {
            return await DriversService.getAll(page , search );
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch employees");
        }
    }
);

export const driversGetId = createAsyncThunk(
    "clients/driversGetId",
    async (id, { rejectWithValue }) => {
        try {
            return await DriversService.driversId(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to delete client");
        }
    }
);


// Yangi xodim (haydovchi) qo'shish
export const addDriver = createAsyncThunk(
    "employees/addDriver",
    async (driverData, { rejectWithValue }) => {
        try {
            return await DriversService.add(driverData);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to add driver");
        }
    }
);


// Haydovchini yangilash (PUT yoki PATCH)
export const editDriver = createAsyncThunk(
    "employees/editDriver",
    async ({ id, driverData }, { rejectWithValue }) => {
        try {
            return await DriversService.update(id, driverData);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to edit driver");
        }
    }
);





// Excel export thunk
export const exportDriverExcel = createAsyncThunk(
    "orders/exportDriverExcel",
    async ({ search ,selectedKeys}, { rejectWithValue }) => {
        try {
            const blob = await DriversService.exportDriverExcel( search ,selectedKeys);

            // Faylni yuklab olish
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "drivers.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();

            return true;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


// Yangi xodim (haydovchi) qo'shish
export const deleteDrivers = createAsyncThunk(
    "employees/deleteDrivers",
    async (id, { rejectWithValue }) => {
        try {
            return await DriversService.delete(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to add driver");
        }
    }
);