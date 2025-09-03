import React, {useEffect, useState} from 'react';
import {
    AddEmployesModal,
    Timeline,
    EmployeesPagination,
    UserPagination,
    CommentModal,
    Loading
} from "../../../Components/index.js";
import {inputModalArray} from '../../../Data/driversData.js'

import {UserNavbar} from "../../index.js";
import {openModal} from "../../../features/EmployeSModalToggle/employesModalToggle.js";
import {useDispatch, useSelector} from "react-redux";
import {getEmployees} from "../../../features/Employees/employeeThunks.js";
import {useSearchParams} from "react-router-dom";
import {getDrivers} from "../../../features/Drivers/driversThunks.js";

function Drivers() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;
    const [total, setTotal] = useState();
    const [driversId, setDrversId] = useState();
    const [searchDriver, setSearchDriver] = useState('');
    const [driversData, setDriversData] = useState();
    const [columnsArry, setColumnsArry] = useState([
        {title: "Логин", active: true},
        {title: "Имя", active: true},
        {title: "Телефон", active: true},
        {title: "Номер автомобиля", active: true},
        {title: "Номер полу прицепа", active: true},
        {title: "OPERATION", active: true},
        {title: "Action", active: true},
    ])


    useEffect(() => {
        const driversData = async () => {
            const result = await dispatch(getDrivers({page: pageqq, search: searchDriver})); // page yuboriladi
            setDriversData(result.payload.data.data);
            setTotal(result.payload.data)
            console.log(result.payload.data.data);
        };
        driversData();
    }, [pageqq, dispatch, searchDriver]);

    return (
        <div>
            <div className={'bg-bacWhite flex  dark:bg-darkBg min-h-[calc(100dvh-70px)]'}>
                <div className="w-[90%] mx-auto">
                    <UserNavbar value={'Drivers'} columnsArry={columnsArry}
                                setColumnsArry={setColumnsArry}/>
                        <UserPagination setSearch={setSearchDriver} setEmployeesId={setDrversId} total={total}
                                    data={driversData} arry={columnsArry} setColumnsArry={setColumnsArry}
                                    navigateURL={'drivers'}/>
                    <Timeline/>
                </div>
            </div>
        </div>);
}

export default Drivers;