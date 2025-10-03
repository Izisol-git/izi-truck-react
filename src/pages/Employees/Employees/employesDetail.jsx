import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { Details } from "../../../Components/index.js";
import {useDispatch, useSelector} from "react-redux";
import {inputModalArray} from "../../../Data/employeesData.js";
import {EmployeesId, getContractId} from "../../../features/Employees/employeeThunks.js";

function EmployesDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [data ,setData ] = useState();
    const {employeesId} = useSelector((state) => state.employees);

    const EmployeesGetId = async (id)=> {
        try {
            const res = await dispatch(EmployeesId(id)).unwrap()
            setData(res.data)

        }catch(err){
            console.log(err)
        }
    }
    const GetContractId = async (id)=> {
        try {
            const resCont = await dispatch(getContractId(id)).unwrap()

        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        if(employeesId?.length === 0){
            EmployeesGetId(id)
        }
        GetContractId(id)
    } , [])


    return (
        <Details id={id} data={data}    inputModalArray={inputModalArray} btnValue={'Employees'} />
    );
}

export default EmployesDetail;