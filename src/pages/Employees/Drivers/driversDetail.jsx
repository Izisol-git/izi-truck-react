import React, {useEffect, useState} from 'react';
import {Details} from "../../../Components/index.js";
import {inputModalArray} from "../../../Data/driversData.js";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux"
import {driversGetId} from "../../../features/Drivers/driversThunks.js";

function DriversDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [data ,setData ] = useState();
    const DriversId = async (id)=> {
        const res = await dispatch(driversGetId(id))
        setData(res.payload.driver)
        console.log(res.payload.driver)
    }
    useEffect(()=>{
        DriversId(id)
    } , [])
    // const Contracts = [
    //     {contractNumber: '7/1' , contractDate : '2022-01-07' , company:'EGS' , status: false}
    // ]
    return (
        <Details data={data}   inputModalArray={inputModalArray} btnValue={'Drivers'} />
    );
}
export default DriversDetail;