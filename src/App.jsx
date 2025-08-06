import React from 'react';
import {
    Dashboard,
    Login,
    ForgotLogin,
    Home,
    Queries,
    Orders,
    Trucks,
    Settings,
    Customers,
    Invoices, Employees , Drivers
} from './pages/index.js'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {SuperAdminLayouts} from "./layouts/index.js"


function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotLogin/>}/>
                <Route element={<SuperAdminLayouts/>}>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/queries" element={<Queries/>}/>
                    <Route path="/orders" element={<Orders/>}/>
                    <Route path="/trucks" element={<Trucks/>}/>
                    <Route path="/users/customers" element={<Customers/>}/>
                    <Route path="/users/invoices" element={<Invoices/>}/>
                    <Route path="/users/employees" element={<Employees/>}/>
                    <Route path="/users/drivers" element={<Drivers/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;