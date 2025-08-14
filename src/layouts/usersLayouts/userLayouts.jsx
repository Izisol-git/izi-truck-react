import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';

function UserLayouts() {

    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default UserLayouts;