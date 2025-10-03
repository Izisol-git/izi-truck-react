import React from 'react';
import {Navbar, NavbarY} from "../../Components/index.js";
import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from "react-redux";

function SuperAdminLayouts( ) {
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    return token ? <div className={'h-screen overflow-hidden'}>
        <Navbar   />
        <main className={'flex '}>
            <NavbarY/>
            <div className={'flex-1 h-[calc(100vh-70px)] overflow-y-scroll '}>
                <Outlet/>
            </div>
        </main>

    </div> : <Navigate to="/login"/>;

}

export default SuperAdminLayouts;