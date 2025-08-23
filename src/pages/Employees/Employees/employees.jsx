import React, {useEffect, useState} from 'react';
import {
    AddEmployesModal,
    Timeline,
    EmployeesPagination,
    CommentModal,
    Loading,
    UserPagination
} from "../../../Components/index.js";
import {inputModalArray} from '../../../Data/employeesData.js'
import {UserNavbar} from "../../index.js";
import {closeModal, openModal} from "../../../features/EmployeSModalToggle/employesModalToggle.js";
import {useDispatch, useSelector} from "react-redux";
import {addEmployee, getEmployees} from "../../../features/Employees/employeeThunks.js";
import { useSearchParams } from "react-router-dom";

function Employees() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;
    const  [total, setTotal] = useState();
    const [employeesId, setEmployeesId] = useState();
    const [employeesData, setEmployeesData] = useState();
    const {loading} = useSelector((state) => state.drivers)
    const addEditToggle = useSelector((state) => state.employesModal.addEditToggle);





    const [columnsArry, setColumnsArry] = useState([
        // {title: "Аватар", active: true},
        {title: "ФИО", active: true},
        {title: "Номер телефона", active: true},
        {title: "Tin", active: true},
        {title: "Create data", active: true},
        {title: "Статус", active: true},
        {title: "Action", active: true},
    ])


    useEffect(() => {
        const employeesData = async () => {
            const result = await dispatch(getEmployees(pageqq)); // page yuboriladi
            setEmployeesData(result.payload.data.data);
            setTotal(result.payload.data)
            console.log(result.payload.data)
        };
        employeesData();

        // console.log(employeesPaginationData);
    }, [pageqq, dispatch]); // ⚡ page o‘zgarsa qayta fetch bo‘ladi



    return (
        <div>
            <div className={'bg-bacWhite flex '}>
                <div className="w-[90%] mx-auto">
                    <UserNavbar openModal={() => dispatch(openModal())} value={'Employees'} columnsArry={columnsArry}
                                setColumnsArry={setColumnsArry}/>
                    {loading ?  <Loading/> : <UserPagination  setEmployeesId={setEmployeesId} total={total} data={employeesData} arry={columnsArry} setColumnsArry={setColumnsArry}
                                                    navigateURL={'employees'}/>
                        }
                    <AddEmployesModal  employeesId={employeesId} data={employeesData}    h1={"Employees"} inputModalArray={inputModalArray}/>
                    <Timeline/>
                </div>
            </div>
        </div>
    );
}

export default Employees;