import { createAsyncThunk } from "@reduxjs/toolkit";
import ContractService from "../../API/Contracts/contractService.js";


export const getContracts = createAsyncThunk(
    "employees/getContracts",
    async ({page , search}, { rejectWithValue }) => {
        try {
            return await ContractService.getAll(page , search);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to update employee");
        }
    }
);
export const searchContracts = createAsyncThunk(
    "employees/searchContracts",
    async (data, { rejectWithValue }) => {
        try {
            return await ContractService.search(data);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to update employee");
        }
    }
);

export const addContractsData = createAsyncThunk(
    "clients/addContractsData",
    async (  contractData  , { rejectWithValue }) => {
        try {
            return await ContractService.addContracts(  contractData);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to edit client");
        }
    }
);


export const getContractsId = createAsyncThunk(
    "employees/getContractsId",
    async (id, { rejectWithValue }) => {
        try {
            return await ContractService.getContractsId(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to update employee");
        }
    }
);

export const editContracts = createAsyncThunk(
    "employees/editContracts",
    async ({id , data}, { rejectWithValue }) => {
        try {
            return await ContractService.editContracts(id , data);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to update employee");
        }
    }
);
