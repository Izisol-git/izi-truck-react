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
import ExcelModal from "../../../Components/Modal/excelModal.jsx";

function Employees() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;
    const  [total, setTotal] = useState();
    const [searchEmployees, setSearchEmployees] = useState('');
    const [employeesId, setEmployeesId] = useState();
    const [employeesData, setEmployeesData] = useState();
    const addEditToggle = useSelector((state) => state.employesModal.addEditToggle);
    const [selectedKeys, setSelectedKeys] = useState([]);





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
            const result = await dispatch(getEmployees({page : pageqq , search: searchEmployees}));
            setEmployeesData(result.payload.data.data);
            setTotal(result.payload.data)
            console.log(result.payload.data)
        };
        employeesData();

        // console.log(employeesPaginationData);
    }, [pageqq, dispatch ,searchEmployees]); // ⚡ page o‘zgarsa qayta fetch bo‘ladi


    const exportValues = [
        { id: "id", value: "ID" },
        { id: "name", value: "Имя пользователя" },
        { id: "email", value: "Эл. почта" },
        { id: "tin", value: "ИНН" },
        { id: "phone_number", value: "Номер телефона" },
        { id: "tg_user_id", value: "Telegram ID" },
        { id: "tg_nick_name", value: "Telegram ник" },
        { id: "code", value: "Код сотрудника" },
        { id: "avatar", value: "Аватар" },
        { id: "status", value: "Статус (1 - Активный, -1 - Неактивный)" },
        { id: "created_by", value: "Кто добавил сотрудника" },
        { id: "created_at", value: "Дата создания" }
    ];



    return (
        <div>
            <div className={'bg-bacWhite flex min-h-[calc(100dvh-70px)] dark:bg-darkBg '}>
                <div className="w-[90%] mx-auto">
                    <UserNavbar openModal={() => dispatch(openModal())} value={'Employees'} columnsArry={columnsArry}
                                setColumnsArry={setColumnsArry}/>
                     <UserPagination  setSearch={setSearchEmployees} setEmployeesId={setEmployeesId} total={total} data={employeesData} arry={columnsArry} setColumnsArry={setColumnsArry}
                                                    navigateURL={'employees'}/>

                    <AddEmployesModal setEmployeesId={setEmployeesId}   employeesId={employeesId} data={employeesData}    h1={"Employees"} inputModalArray={inputModalArray}/>
                    <Timeline/>

                </div>
            </div>
            <ExcelModal page={pageqq} search={searchEmployees}  setSelectedKeys={setSelectedKeys} selectedKeys={selectedKeys}  data={exportValues} mode={'employee'} />
        </div>
    );
}

export default Employees;