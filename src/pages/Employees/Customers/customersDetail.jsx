import React, {useEffect, useState} from 'react';
import {Details } from "../../../Components/index.js";

import {inputModalArray} from "../../../Data/customersData.js";
import {useParams} from "react-router-dom";
import {ClientId} from "../../../features/customers/clientsThunks.js";
import {useDispatch, useSelector} from "react-redux";

function CustomersDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [data ,setData ] = useState();
    const {clientsId} = useSelector((state) => state.customers);

    const ClientSId = async ()=> {
       try {
           const res = await dispatch(ClientId(id)).unwrap()
           setData(res.data)
           console.log(res)
       }
       catch(e) {
           console.log(e)
       }
    }
    useEffect(()=>{
        if(clientsId?.length === 0){
            ClientSId()
        }
    } , [])

    return (
         <Details id={id} data={data}   inputModalArray={inputModalArray} btnValue={'Customers'}  />
    );
}

export default CustomersDetail;