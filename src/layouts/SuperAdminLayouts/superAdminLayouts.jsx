import React from 'react';
import {Navbar} from "../../Components/index.js";
import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from "react-redux";

function SuperAdminLayouts( ) {
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    return token ? <div >
        <Navbar   />
        <main >
            <Outlet/>
        </main>

    </div> : <Navigate to="/login"/>;

}

export default SuperAdminLayouts;