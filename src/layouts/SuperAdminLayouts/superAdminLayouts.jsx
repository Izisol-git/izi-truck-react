import React from 'react';
import {Navbar} from "../../Components/index.js";
import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from "react-redux";

function SuperAdminLayouts() {
    const token = useSelector(state => state.auth.token);
    return token ? <div>
        <Navbar/>
        <main>
            <Outlet/>
        </main>
    </div> : <Navigate to="/login"/>;

}

export default SuperAdminLayouts;