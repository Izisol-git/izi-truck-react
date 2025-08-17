// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import employesModalReducer from "../features/EmployeSModalToggle/employesModalToggle.js";
import authReducer from "../features/auth/authSlice";
import employeeReducer from "../features/Employees/employeeSlice.js";
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        employesModal: employesModalReducer,
        auth: authReducer,
        employees : employeeReducer,
    },
});