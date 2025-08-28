import React from 'react';
import { Outlet } from 'react-router-dom';


function ContractLayouts(props) {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default ContractLayouts;