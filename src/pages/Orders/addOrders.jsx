import React, {useState} from 'react';
import {  CurrencyInput, InputMUI, LocationInput, MyCalendar, SelectMUI, SwitchMUI} from "../../Components/index.js";
import OrdersFrom from "../../Components/OrdersForm/ordersFrom.jsx";



function AddOrders() {



    return (
         <>
            <OrdersFrom mode={'add'}  />
         </>
    );
}

export default AddOrders;