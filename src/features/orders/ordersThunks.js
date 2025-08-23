import { createAsyncThunk } from "@reduxjs/toolkit";
import OrdersService from "../../Api/orders/OrdersService.js";

// GET – barcha orderslarni olish
export const getOrders = createAsyncThunk(
    "orders/getOrders",
    async (page, { rejectWithValue }) => {
        try {
            return await OrdersService.getAll(page);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch orders");
        }
    }
);
export const getShowOrders = createAsyncThunk(
    "orders/getOrders",
    async ({id , db}, { rejectWithValue }) => {
        try {
            return await OrdersService.getShowOrdersId(id , db);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch orders");
        }
    }
);

export const getOrdersId = createAsyncThunk(
    "orders/getOrders",
    async (id, { rejectWithValue }) => {
        try {
            return await OrdersService.orderId(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch orders");
        }
    }
);

export const getState = createAsyncThunk(
    "orders/getOrders",
    async (page, { rejectWithValue }) => {
        try {
            return await OrdersService.getSelectLocationState(page);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch orders");
        }
    }
);
export const getStateTwo = createAsyncThunk(
    "orders/getOrders",
    async (page, { rejectWithValue }) => {
        try {
            return await OrdersService.getSelectLocationStateTwo(page);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch orders");
        }
    }
);

export const ordersSelect = createAsyncThunk(
    "orders/getOrders",
    async (_, { rejectWithValue }) => {
        try {
            return await OrdersService.getSelect();
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch orders");
        }
    }
);

// POST – yangi order qo‘shish
export const addOrder = createAsyncThunk(
    "orders/addOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            return await OrdersService.add(orderData);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to add order");
        }
    }
);
export const actDataAdd = createAsyncThunk(
    "orders/addOrder",
    async ({id , act_date}, { rejectWithValue }) => {
        try {
            return await OrdersService.actDataAdd(id , act_date);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to add order");
        }
    }
);

// PUT/PATCH – orderni tahrirlash
export const editOrder = createAsyncThunk(
    "orders/editOrder",
    async ({ id, editData }, { rejectWithValue }) => {
        try {
            return await OrdersService.update(id, editData);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to edit order");
        }
    }
);


// 🔥 Filterlangan orders olish
export const getFilteredOrders = createAsyncThunk(
    "orders/getFilteredOrders",
    async ({filters, pageqq} , { rejectWithValue }) => {
        try {
            return await OrdersService.getFiltered(filters , pageqq);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch filtered orders");
        }
    }
);



// DELETE – orderni o‘chirish
export const deleteOrder = createAsyncThunk(
    "orders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            return await OrdersService.delete(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to delete order");
        }
    }
);
