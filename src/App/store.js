// src/app/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import employesModalReducer from "../features/EmployeSModalToggle/employesModalToggle.js";
import authReducer from "../features/Auth/authSlice.js";
import employeeReducer from "../features/Employees/employeeSlice.js";

import driversReducer from "../features/Drivers/driversSlice.js";
import customersReducer from "../features/customers/clientsSlice.js";
import ordersReducer from "../features/orders/ordersSlice.js";
import invoicesReducer from "../features/Invoices/invoicesSlice.js";
import suggestionsReducer from "../features/suggestions/suggestionsSlice.js";
import contractReducer from "../features/Contracts/contractSlice.js";
import notificationReducer from "../features/Notification/notificationSlice.js";
import statisticsReducer from "../features/Statistics/statisticsSlice.js";
import queriesReducer from "../features/Queries/queriesSlice.js";

// combineReducers orqali root reducer yaratamiz
const appReducer = combineReducers({
    counter: counterReducer,
    employesModal: employesModalReducer,
    auth: authReducer,
    employees : employeeReducer,
    drivers : driversReducer,
    customers : customersReducer,
    orders : ordersReducer,
    invoices : invoicesReducer,
    suggestions : suggestionsReducer,
    contracts : contractReducer,
    notification : notificationReducer,
    statistics : statisticsReducer,
    queries : queriesReducer,
});

// logout bo'lganda barcha state tozalansin
const rootReducer = (state, action) => {
    if (action.type === 'auth/logout') {
        state = undefined;
    }
    return appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
});
