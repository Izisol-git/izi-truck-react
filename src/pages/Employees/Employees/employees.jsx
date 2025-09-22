import React, {useEffect, useState} from 'react';
import {
    AddEmployesModal,
    Timeline,
    UserPagination
} from "../../../Components/index.js";
import {inputModalArray} from '../../../Data/employeesData.js'
import {UserNavbar} from "../../index.js";
import {openModal} from "../../../features/EmployeSModalToggle/employesModalToggle.js";
import {useDispatch, useSelector} from "react-redux";
import {EmployeesId, getEmployees} from "../../../features/Employees/employeeThunks.js";
import {useSearchParams} from "react-router-dom";
import ExcelModal from "../../../Components/Modal/excelModal.jsx";
import {useTranslation} from "react-i18next";

function Employees() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || '1';
    const [searchEmployees, setSearchEmployees] = useState('');
    const [selectedKeys, setSelectedKeys] = useState([]);
    const id = useSelector((state) => state.employesModal.employeesId);
    const {employees , addEmployeesDate} = useSelector((state) => state.employees);
    const {employeesId} = useSelector((state) => state.employees);
    const {t} = useTranslation();

    const [columnsArry, setColumnsArry] = useState([
        // { title: "Аватар", key: "employees.table.avatar", active: true },
        {title: "ФИО", key: "employees.table.full_name", active: true},
        {title: "Номер телефона", key: "employees.table.phone_number", active: true},
        {title: "Tin", key: "employees.table.tin", active: true},
        {title: "Create data", key: "employees.table.created_at", active: true},
        {title: "Статус", key: "employees.table.status", active: true},
        {title: "Action", key: "employees.table.action", active: true},
    ]);

    const EmployeesGetId = async (id) => {
        try {
            const res = await dispatch(EmployeesId(id)).unwrap()
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (id !== null) {
            EmployeesGetId(id)
        }
    }, [id])

    const employeeData = async (pageqq, searchEmployees) => {
        try {
            const result = await dispatch(getEmployees({page: pageqq, search: searchEmployees})).unwrap()
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        const now = Date.now()
        const lastFetch = addEmployeesDate ? new Date(addEmployeesDate).getTime() : Number(localStorage.getItem("refreshValue"));
        const diff = now - lastFetch;

        if (employees?.length === 0 || diff >= Number(localStorage.getItem("refreshValue"))) {
            employeeData(pageqq, searchEmployees);
        }
    }, [pageqq, dispatch, searchEmployees]);

    const exportValues = [
        {id: "id", value: t("employees.exportValues.id")},
        {id: "name", value: t("employees.exportValues.name")},
        {id: "email", value: t("employees.exportValues.email")},
        {id: "tin", value: t("employees.exportValues.tin")},
        {id: "phone_number", value: t("employees.exportValues.phone_number")},
        {id: "tg_user_id", value: t("employees.exportValues.tg_user_id")},
        {id: "tg_nick_name", value: t("employees.exportValues.tg_nick_name")},
        {id: "code", value: t("employees.exportValues.code")},
        {id: "avatar", value: t("employees.exportValues.avatar")},
        {id: "status", value: t("employees.exportValues.status")},
        {id: "created_by", value: t("employees.exportValues.created_by")},
        {id: "created_at", value: t("employees.exportValues.created_at")},
    ];

    return (
        <div>
            <div className={'bg-bacWhite flex min-h-[calc(100dvh-70px)] dark:bg-darkBg '}>
                <div className="w-[90%] mx-auto">
                    <UserNavbar openModal={() => dispatch(openModal())} value={'Employees'} columnsArry={columnsArry}
                                setColumnsArry={setColumnsArry}/>
                    <UserPagination onClick={employeeData} search={searchEmployees} setSearch={setSearchEmployees}
                                    data={employees} arry={columnsArry}
                                    setColumnsArry={setColumnsArry}
                                    navigateURL={'employees'}/>

                    <AddEmployesModal search={searchEmployees} employeesId={employeesId} data={employees}
                                      h1={"Employees"} inputModalArray={inputModalArray}/>
                    <Timeline data={employeesId}/>

                </div>
            </div>
            <ExcelModal page={pageqq} search={searchEmployees} setSelectedKeys={setSelectedKeys}
                        selectedKeys={selectedKeys} data={exportValues} mode={'employee'}/>
        </div>
    );
}

export default Employees;