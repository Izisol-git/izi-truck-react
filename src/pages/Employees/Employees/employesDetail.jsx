import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { Details } from "../../../Components/index.js";
import {useDispatch, useSelector} from "react-redux";
import { openModal, openModalHistory} from "../../../features/EmployeSModalToggle/employesModalToggle.js";
import {inputModalArray} from "../../../Data/employeesData.js";

function EmployesDetail() {


    const Contracts = [
        {contractNumber: '7/1' , contractDate : '2022-01-07' , company:'EGS' , status: false}
    ]



    return (
        <Details Contracts={Contracts} inputModalArray={inputModalArray} btnValue={'Employees'} />
    );
}

export default EmployesDetail;