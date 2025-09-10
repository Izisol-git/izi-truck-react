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
import {addClient, ClientId, getClients} from "../../../features/customers/clientsThunks.js";
import ExcelModal from "../../../Components/Modal/excelModal.jsx";

function Customers() {

    const dispatch = useDispatch();

    const [dropdownCustomers, setDropdownCustomers] = useState(false);
    const [data , setData] = useState();
    const id = useSelector((state) => state.employesModal.customersId);

    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;
    const  [total, setTotal] = useState();
    const [searchCustomers, setSearchCustomers] = useState('');
    const [customersId, setCustomersId] = useState();
    const [customersData, setCustomersData] = useState();

    const [selectedKeys, setSelectedKeys] = useState([]);
    const [columnsArry, setColumnsArry] = useState([
        {title: "Название компании", active: true},
        // {title: "ФИО", active: true},
        // {title: "Сотрудник", active: true},
        {title: "Телефон", active: true},
        // {title: "Email", active: true},
        // {title: "Получает уведомление через", active: true},
        {title: "Action", active: true},

    ])

    const ClientSId = async ()=> {
        try {
            const res = await dispatch(ClientId( id)).unwrap()
            setData(res.data)
            console.log(res)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(id !== null){
            ClientSId(id)
        }
    } , [id])



    const customerData = async () => {
        try {
            const result = await dispatch(getClients({page: pageqq, search: searchCustomers})).unwrap() // page yuboriladi
            setCustomersData(result.clients.data);
            setTotal(result.clients)
            console.log(result );
        }
        catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {

        customerData();
    }, [pageqq, dispatch , searchCustomers]); // ⚡ page o‘zgarsa qayta fetch bo‘ladi





    const exportValues = [
        { id: "id", value: "ID" },
        { id: "company_name", value: "Название компании" },
        { id: "fio", value: "Ф.И.О" },
        { id: "phone_number", value: "Телефон" },
        { id: "contract_no", value: "Номер контракта" },
        { id: "director_position", value: "Должность директора" },
        { id: "director", value: "Директор" },
        { id: "director_add", value: "Адрес директора" },
        { id: "customer", value: "Клиент" },
        { id: "cust_bank_code", value: "Банковский код клиента" },
        { id: "customer_bank", value: "Банк клиента" },
        { id: "customer_bank_acc", value: "Банковский счёт клиента" },
        { id: "customer_tin", value: "ИНН клиента" },
        { id: "customer_address", value: "Адрес клиента" },
        { id: "customer_vat", value: "НДС клиента" },
        { id: "acc_tel", value: "Телефон бухгалтера" },
        { id: "customer_oked", value: "ОКЭД клиента" },
        { id: "treaty_code", value: "Код договора" },
        { id: "created_at", value: "Дата создания" },
        { id: "updated_at", value: "Дата обновления" }
    ];





    return (
        <div className={''}>
            <div className={'bg-bacWhite flex dark:bg-darkBg min-h-[calc(100dvh-70px)]'}>
                <div className="w-[90%] mx-auto">
                    <UserNavbar openModal={()=> dispatch(openModal())} value={'Customers'} columnsArry={columnsArry} setColumnsArry={setColumnsArry}/>
                        <UserPagination setSearch={setSearchCustomers} employeesId={customersId}  setEmployeesId={setCustomersId} total={total} data={customersData} arry={columnsArry} setColumnsArry={setColumnsArry}
                                                             navigateURL={'customers'}/>
                </div>
                <AddEmployesModal  setEmployeesId={setCustomersId} employeesId={customersId}  h1={"Customers"}    inputModalArray={inputModalArray} />
                <Timeline  data={data} mode={'Customers'}  />
                <CommentModal   />
                <ExcelModal page={pageqq} search={searchCustomers}  setSelectedKeys={setSelectedKeys} selectedKeys={selectedKeys}  data={exportValues} mode={'client'} />
            </div>
        </div>
    );
}

export default Customers;