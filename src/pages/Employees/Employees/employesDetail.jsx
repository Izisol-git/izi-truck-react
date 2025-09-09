import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { Details } from "../../../Components/index.js";
import {useDispatch} from "react-redux";
import {inputModalArray} from "../../../Data/employeesData.js";
import {EmployeesId} from "../../../features/Employees/employeeThunks.js";

function EmployesDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [data ,setData ] = useState();

    const EmployeesGetId = async (id)=> {
        const res = await dispatch(EmployeesId(id))
        setData(res.payload.data)
        console.log(res)
    }
    useEffect(()=>{
        EmployeesGetId(id)
    } , [])


    const Contracts = [
        {contractNumber: '7/1' , contractDate : '2022-01-07' , company:'EGS' , status: false}
    ]



    return (
        <Details id={id} data={data} Contracts={Contracts} inputModalArray={inputModalArray} btnValue={'Employees'} />
    );
}

export default EmployesDetail;