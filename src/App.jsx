import React, {useEffect ,lazy, Suspense} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {ContractLayouts, SuperAdminLayouts, UserLayouts} from "./layouts/index.js"
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser} from "./features/Auth/authThunks.js";
import AddClientContracts from "./pages/Contracts/ClientContracts/addClientContracts.jsx";
import {Loading} from "./Components/index.js";


// Auth
const Dashboard  = lazy(()=> import('./pages/Dashboard/superAdminDashboard.jsx'))
const Login  = lazy(()=> import('./pages/Login/Login.jsx'))
const ForgotLogin  = lazy(()=> import('./pages/Forgot Login/forgotLogin.jsx'))


// Pages
const Queries = lazy(() => import("./pages/Queries/queries.jsx"));
const Orders = lazy(() => import("./pages/Orders/orders.jsx"));
const Trucks = lazy(() => import("./pages/Trucks/trucks.jsx"));
const Settings = lazy(() => import("./pages/Settings/settings.jsx"));
const Customers = lazy(() => import("./pages/Employees/Customers/customers.jsx"));
const Invoices = lazy(() => import("./pages/Employees/Invoices/invoices.jsx"));
const Employees = lazy(() => import("./pages/Employees/Employees/employees.jsx"));
const Drivers = lazy(() => import("./pages/Employees/Drivers/drivers.jsx"));

// Details
const EmployeesDetail = lazy(() => import("./pages/Employees/Employees/employesDetail.jsx"));
const DriversDetail = lazy(() => import("./pages/Employees/Drivers/driversDetail.jsx"));
const CustomersDetail = lazy(() => import("./pages/Employees/Customers/customersDetail.jsx"));

// Orders
const AddOrders = lazy(() => import("./pages/Orders/addOrders.jsx"));
const EditOrders = lazy(() => import("./pages/Orders/editOrders.jsx"));
const ShowOffers = lazy(() => import("./pages/Orders/showOffers.jsx"));
const ShowOffersId = lazy(() => import("./pages/Orders/showOffersId.jsx"));
const ShowOrdersId = lazy(() => import("./pages/Orders/showOrdersID.jsx"));
const Didox = lazy(() => import("./pages/Didox/didox.jsx"));

// Drivers
const AddDrivers = lazy(() => import("./pages/Employees/Drivers/addDrivers.jsx"));
const EditDrivers = lazy(() => import("./pages/Employees/Drivers/editDrivers.jsx"));

// Contracts
const ClientContracts = lazy(() => import("./pages/Contracts/ClientContracts/clientContracts.jsx"));
const EmployeesContracts = lazy(() => import("./pages/Contracts/EmployeesContracts/employeesContracts.jsx"));
const EditClientContracts = lazy(() => import("./pages/Contracts/ClientContracts/editClientContracts.jsx"));

// Notifications
const Notifications = lazy(() => import("./pages/Notificaions/Notifications.jsx"));
const NotificationsDetails = lazy(() => import("./pages/Notificaions/notificationsDetails.jsx"));

// Queries
const AddQueries = lazy(() => import("./pages/Queries/addQueries.jsx"));
const EditQueries = lazy(() => import("./pages/Queries/editQueries.jsx"));
function App() {


    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && user === null) {
            dispatch(getCurrentUser());
        }
    }, [dispatch]);



    return (
        <BrowserRouter>
            <Suspense fallback={<div className={'h-screen w-full center'}><Loading /></div>}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotLogin />} />

                    <Route element={<SuperAdminLayouts   />}>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="queries" element={<Queries  />} />
                        <Route path="queries/create" element={<AddQueries />} />
                        <Route path="queries/edit/:id" element={<EditQueries />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="orders/create" element={<AddOrders />} />
                        <Route path="orders/replies" element={<ShowOffers />} />
                        <Route path="orders/replies/:id" element={<ShowOffersId />} />
                        <Route path="orders/edit/:id" element={<EditOrders />} />
                        <Route path="orders/:id" element={<ShowOrdersId />} />
                        <Route path="trucks" element={<Trucks />} />
                        <Route path="orders/:id/didox" element={<Didox />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="contracts" element={<ContractLayouts />} >
                            <Route path="clients" element={<ClientContracts />} />
                            <Route path="clients/create" element={<AddClientContracts />} />
                            <Route path="clients/edit/:id" element={<EditClientContracts />} />
                            <Route path="employees" element={<EmployeesContracts />} />
                        </Route>
                        <Route path={'notifications'} element={<Notifications />} />
                        <Route path={'notifications/view/:id'} element={<NotificationsDetails />} />


                        <Route path="users" element={<UserLayouts />}>
                            <Route path="employees" element={<Employees />} />
                            <Route path="employees/detail/:id" element={<EmployeesDetail />} />
                            <Route path="customers/detail/:id" element={<CustomersDetail />} />
                            <Route path="drivers/detail/:id" element={<DriversDetail />} />
                            <Route path="drivers/create" element={<AddDrivers />} />
                            <Route path="drivers/edit/:id" element={<EditDrivers />} />
                            <Route path="customers" element={<Customers />} />
                            <Route path="drivers" element={<Drivers />} />
                            <Route path="invoices" element={<Invoices />} />

                        </Route>
                    </Route>
                </Routes>
            </Suspense>

        </BrowserRouter>

    );
}

export default App;