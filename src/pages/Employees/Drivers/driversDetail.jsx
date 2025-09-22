import React, {useEffect, useState} from 'react';
import {Details} from "../../../Components/index.js";
import {inputModalArray} from "../../../Data/driversData.js";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {driversGetId} from "../../../features/Drivers/driversThunks.js";

function DriversDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [data ,setData ] = useState();
    const {driversId} = useSelector((state) => state.drivers);

    const DriversId = async (id)=> {
        try {
            const res = await dispatch(driversGetId(id)).unwrap()
            setData(res.driver)
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        if(driversId.length === 0){
            DriversId(id)
        }
    } , [])
    return (
        <Details data={data} id={id}   inputModalArray={inputModalArray} btnValue={'Drivers'} />
    );
}
export default DriversDetail;