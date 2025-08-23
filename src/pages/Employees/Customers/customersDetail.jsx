import React, {useEffect, useState} from 'react';
import {Details } from "../../../Components/index.js";

import {inputModalArray} from "../../../Data/customersData.js";
import {useParams} from "react-router-dom";
import {ClientId} from "../../../features/customers/clientsThunks.js";
import {useDispatch} from "react-redux";

function CustomersDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [data ,setData ] = useState();

    const ClientSId = async (id)=> {
        const res = await dispatch(ClientId(id))
        setData(res.payload.data)
        console.log(res.payload.data)
    }
    useEffect(()=>{
        ClientSId(id)
    } , [])


    const Contracts = [
        {contractNumber: '7/1' , contractDate : '2022-01-07' , company:'EGS' , status: false}
    ]

    return (
         <Details data={data}  Contracts={Contracts} inputModalArray={inputModalArray} btnValue={'Customers'}  />
    );
}

export default CustomersDetail;