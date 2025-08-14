import React from 'react';
import OrdersFrom from "../../Components/OrdersForm/ordersFrom.jsx";

function EditOrders(props) {
    return (
        <div>
            <OrdersFrom mode={'edit'}  />
        </div>
    );
}

export default EditOrders;