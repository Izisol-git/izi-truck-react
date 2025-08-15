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
    Invoices,
    Employees,
    Drivers,
    EmployeesDetail,
    DriversDetail,
    CustomersDetail,
    AddOrders,
    EditOrders,
    ShowOffers,
    AddDrivers
} from './pages/index.js'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {SuperAdminLayouts, UserLayouts} from "./layouts/index.js"
import {OffersOrders} from "./Components/index.js";


function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotLogin />} />

                <Route element={<SuperAdminLayouts />}>
                    <Route path="home" element={<Home />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="queries" element={<Queries />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="orders/create" element={<AddOrders />} />
                    <Route path="orders/replies" element={<ShowOffers />} />
                    <Route path="orders/edit" element={<EditOrders />} />
                    <Route path="trucks" element={<Trucks />} />
                    <Route path="settings" element={<Settings />} />

                    <Route path="users" element={<UserLayouts />}>
                        <Route path="employees" element={<Employees />} />
                        <Route path="employees/detail/:id" element={<EmployeesDetail />} />
                        <Route path="customers/detail/:id" element={<CustomersDetail />} />
                        <Route path="drivers/detail/:id" element={<DriversDetail />} />
                        <Route path="drivers/create" element={<AddDrivers />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="drivers" element={<Drivers />} />
                    </Route>
                    <Route path="invoices" element={<Invoices />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
}

export default App;