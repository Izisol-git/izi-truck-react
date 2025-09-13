import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { Details } from "../../../Components/index.js";
import {useDispatch} from "react-redux";
import {inputModalArray} from "../../../Data/employeesData.js";
import {EmployeesId, getContractId} from "../../../features/Employees/employeeThunks.js";

function EmployesDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [data ,setData ] = useState();
    const [contract ,setContract ] = useState();
    const [dataIndex , setDataIndex] = useState(0);


    const EmployeesGetId = async (id)=> {
        try {
            const res = await dispatch(EmployeesId(id)).unwrap()
            const resCont = await dispatch(getContractId(id)).unwrap()
            setData(res.data)
            setContract(resCont.data)
            console.log(res)
            console.log(resCont)
            setDataIndex(resCont)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        EmployeesGetId(id)
    } , [])


    return (
        <Details id={id} data={data} contract={contract}  inputModalArray={inputModalArray} btnValue={'Employees'} />
    );
}

export default EmployesDetail;