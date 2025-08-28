import React, {useEffect, useState} from 'react';
import {
    AddEmployesModal,
    CommentModal,
    CustomersPagination,
    EmployeesPagination, Loading,
    Timeline, UserPagination
} from '../../../Components/index.js'
import {closeModal, openModal} from "../../../features/EmployeSModalToggle/employesModalToggle.js";
import {useDispatch, useSelector} from "react-redux";
import {UserNavbar} from "../../index.js";
import {inputModalArray} from '../../../Data/customersData.js'
import Quill from "quill";
import {useSearchParams} from "react-router-dom";
import {getDrivers} from "../../../features/Drivers/driversThunks.js";
import {addClient, getClients} from "../../../features/customers/clientsThunks.js";

function Customers() {

    const dispatch = useDispatch();

    const [dropdownCustomers, setDropdownCustomers] = useState(false);
    const {loading} = useSelector((state) => state.customers)
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;
    const  [total, setTotal] = useState();
    const [customersId, setCustomersId] = useState();
    const [customersData, setCustomersData] = useState();

    const [columnsArry, setColumnsArry] = useState([
        {title: "Название компании", active: true},
        {title: "ФИО", active: true},
        {title: "Сотрудник", active: true},
        {title: "Телефон", active: true},
        {title: "Email", active: true},
        {title: "Получает уведомление через", active: true},
        {title: "Action", active: true},

    ])


    useEffect(() => {
        const customersData = async () => {
            const result = await dispatch(getClients(pageqq)); // page yuboriladi
            setCustomersData(result.payload.clients.data);
            setTotal(result.payload.clients)
            console.log(result.payload );
        };
        customersData();
    }, [pageqq, dispatch]); // ⚡ page o‘zgarsa qayta fetch bo‘ladi






    return (
        <div className={''}>
            <div className={'bg-bacWhite flex dark:bg-darkBg min-h-[calc(100dvh-70px)]'}>
                <div className="w-[90%] mx-auto">
                    <UserNavbar openModal={()=> dispatch(openModal())} value={'Customers'} columnsArry={columnsArry} setColumnsArry={setColumnsArry}/>
                    {loading ?  <Loading/> : <UserPagination employeesId={customersId}  setEmployeesId={setCustomersId} total={total} data={customersData} arry={columnsArry} setColumnsArry={setColumnsArry}
                                                             navigateURL={'customers'}/>
                    }
                </div>
                <AddEmployesModal  setEmployeesId={setCustomersId} employeesId={customersId}  h1={"Customers"}    inputModalArray={inputModalArray} />
                <Timeline/>
                <CommentModal   />

            </div>
        </div>
    );
}

export default Customers;