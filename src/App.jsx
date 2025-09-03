import React, {useEffect} from 'react';
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
    AddDrivers,
    EditDrivers,
    ShowOrdersId, Didox, ClientContracts, EmployeesContracts, EditClientContracts, Notifications, NotificationsDetails
}
    from './pages/index.js'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {ContractLayouts, SuperAdminLayouts, UserLayouts} from "./layouts/index.js"
import {OffersOrders} from "./Components/index.js";
import {useDispatch} from "react-redux";
import {getCurrentUser} from "./features/Auth/authThunks.js";
import AddClientContracts from "./pages/Contracts/ClientContracts/addClientContracts.jsx";
// import io from "socket.io-client";
// import {addNotification} from "./features/Notification/notificationSlice.js";



// const socket = io("http://localhost:4000");
//
// function safeSetTag(obj, sym, value) {
//     try {
//         var desc = Object.getOwnPropertyDescriptor(obj, sym);
//         if (!desc || desc.writable) {
//             obj[sym] = value;
//         }
//     } catch (e) {
//         // ignore errors on readonly symbols
//     }
// }
//
// // 2️⃣ Patched _getRawTag funksiyasi
// function patchedGetRawTag(value) {
//     var symToStringTag = Symbol.toStringTag;
//     var isOwn = Object.prototype.hasOwnProperty.call(value, symToStringTag);
//     var tag = value[symToStringTag];
//     var unmasked;
//
//     try {
//         safeSetTag(value, symToStringTag, undefined);
//         unmasked = Object.prototype.toString.call(value);
//     } catch (e) {
//         unmasked = Object.prototype.toString.call(value);
//     } finally {
//         if (isOwn) {
//             safeSetTag(value, symToStringTag, tag);
//         }
//     }
//
//     return unmasked;
// }
//
// // 3️⃣ Lodash _getRawTag ni override qilish (agar Lodash allaqachon import qilingan bo‘lsa)
// if (typeof _ !== 'undefined' && _.runInContext) {
//     try {
//         var lodashInternal = _.__proto__ || _;
//         if (lodashInternal._getRawTag) {
//             lodashInternal._getRawTag = patchedGetRawTag;
//             console.info('✅ Lodash _getRawTag patched successfully.');
//         }
//     } catch (e) {
//         console.warn('⚠️ Lodash patch failed:', e);
//     }
// }

function App() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);



    //
    // useEffect(() => {
    //     socket.on("notification", (msg) => {
    //         dispatch(addNotification(msg));
    //     });
    //
    //     return () => {
    //         socket.off("notification");
    //     };
    // }, [dispatch]);
    //
    //


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotLogin />} />

                <Route element={<SuperAdminLayouts />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="queries" element={<Queries />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="orders/create" element={<AddOrders />} />
                    <Route path="orders/replies" element={<ShowOffers />} />
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
                        <Route path="drivers/edit" element={<EditDrivers />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="drivers" element={<Drivers />} />
                        <Route path="invoices" element={<Invoices />} />

                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>

    );
}

export default App;