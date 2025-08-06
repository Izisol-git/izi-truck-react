import React from 'react';
import {Navbar} from "../../Components/index.js";
import { Outlet } from 'react-router-dom';

function SuperAdminLayouts() {
    return (
        <div>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default SuperAdminLayouts;