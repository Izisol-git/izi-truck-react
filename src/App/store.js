// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import employesModalReducer from "../features/EmployeSModalToggle/employesModalToggle.js";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        employesModal: employesModalReducer,
    },
});