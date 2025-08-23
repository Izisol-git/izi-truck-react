// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import employesModalReducer from "../features/EmployeSModalToggle/employesModalToggle.js";
import authReducer from "../features/auth/authSlice";
import employeeReducer from "../features/Employees/employeeSlice.js";
import driversReducer from "../features/Drivers/driversSlice.js";
import customersReducer from "../features/customers/clientsSlice.js";
import ordersReducer from "../features/orders/ordersSlice.js";
import invoicesReducer from "../features/Invoices/invoicesSlice.js";
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        employesModal: employesModalReducer,
        auth: authReducer,
        employees : employeeReducer,
        drivers : driversReducer,
        customers : customersReducer,
        orders : ordersReducer,
        invoices : invoicesReducer,
    },
});