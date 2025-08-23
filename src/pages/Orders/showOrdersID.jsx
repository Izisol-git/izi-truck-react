import React from 'react';
import {useParams} from "react-router-dom";
import {OrdersForm} from "../../Components/index.js";

const  ShowOrdersID =()=> {
    const {id} =useParams();
    return (
        <div>
            <OrdersForm mode={'show'}/>
        </div>
    );
}

export default ShowOrdersID;