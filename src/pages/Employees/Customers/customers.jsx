import React, {useEffect, useState} from 'react';
import {
    AddEmployesModal,
    CommentModal,
    Timeline, UserPagination
} from '../../../Components/index.js'
import { openModal} from "../../../features/EmployeSModalToggle/employesModalToggle.js";
import {useDispatch, useSelector} from "react-redux";
import {UserNavbar} from "../../index.js";
import {inputModalArray} from '../../../Data/customersData.js'
import {useSearchParams} from "react-router-dom";
import { ClientId, getClients} from "../../../features/customers/clientsThunks.js";
import ExcelModal from "../../../Components/Modal/excelModal.jsx";
import {useTranslation} from "react-i18next";

function Customers() {
    const dispatch = useDispatch();
    const [data, setData] = useState();
    const id = useSelector((state) => state.employesModal.customersId);
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;
    // const [total, setTotal] = useState();
    const [searchCustomers, setSearchCustomers] = useState('');
    const [customersId, setCustomersId] = useState();
    // const [customersData, setCustomersData] = useState();
    const {clients} = useSelector((state) => state.customers);
    const {clientsId} = useSelector((state) => state.customers);
    // const [dataIndex, setDataIndex] = useState(0);
    const {t} = useTranslation();
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [columnsArry, setColumnsArry] = useState([
        {title: "Название компании", key: 'clients.columnsArry.title', active: true},
        {title: "Телефон",key: 'clients.columnsArry.phone', active: true},
        {title: "Action" , active: true},

    ])

    const ClientSId = async () => {
        try {
            const res = await dispatch(ClientId(id)).unwrap()
            setData(res.data)
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (id !== null) {
            ClientSId(id)
        }
    }, [id])


    const customerData = async () => {
        try {
            const result = await dispatch(getClients({page: pageqq, search: searchCustomers})).unwrap()
            // setDataIndex({
            //     current_page: result.clients.current_page,
            //     per_page: result.clients.per_page,
            // })
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
       if(clients?.length === 0) {
           customerData();
       }
    }, [pageqq, dispatch, searchCustomers]);




    const exportValues = [
        {id: "id", value: t('clients.exportValues.id')},
        {id: "company_name", value: t('clients.exportValues.company_name')},
        {id: "fio", value: t('clients.exportValues.fio')},
        {id: "phone_number", value: t('clients.exportValues.phone_number')},
        {id: "contract_no", value: t('clients.exportValues.contract_no')},
        {id: "director_position", value: t('clients.exportValues.director_position')},
        {id: "director", value: t('clients.exportValues.director')},
        {id: "director_add", value: t('clients.exportValues.director_add')},
        {id: "customer", value: t('clients.exportValues.customer')},
        {id: "cust_bank_code", value: t('clients.exportValues.cust_bank_code')},
        {id: "customer_bank", value: t('clients.exportValues.customer_bank')},
        {id: "customer_bank_acc", value: t('clients.exportValues.customer_bank_acc')},
        {id: "customer_tin", value: t('clients.exportValues.customer_tin')},
        {id: "customer_address", value: t('clients.exportValues.customer_address')},
        {id: "customer_vat", value: t('clients.exportValues.customer_vat')},
        {id: "acc_tel", value: t('clients.exportValues.acc_tel')},
        {id: "customer_oked", value: t('clients.exportValues.customer_oked')},
        {id: "treaty_code", value: t('clients.exportValues.treaty_code')},
        {id: "created_at", value: t('clients.exportValues.created_at')},
        {id: "updated_at", value: t('clients.exportValues.updated_at')}
    ];


    return (
        <div className={''}>
            <div className={'bg-bacWhite flex dark:bg-darkBg min-h-[calc(100dvh-70px)]'}>
                <div className="w-[90%] mx-auto">
                    <UserNavbar openModal={() => dispatch(openModal())} value={'Customers'} columnsArry={columnsArry}
                                setColumnsArry={setColumnsArry}/>
                    <UserPagination  setSearch={setSearchCustomers} employeesId={customersId}
                                    setEmployeesId={setCustomersId}  data={clients}
                                    arry={columnsArry} setColumnsArry={setColumnsArry}
                                    navigateURL={'customers'}/>
                </div>
                <AddEmployesModal setEmployeesId={setCustomersId} employeesId={customersId} h1={"Customers"}
                                  inputModalArray={inputModalArray}/>
                <Timeline data={clientsId} mode={'Customers'}/>
                <CommentModal/>
                <ExcelModal page={pageqq} search={searchCustomers} setSelectedKeys={setSelectedKeys}
                            selectedKeys={selectedKeys} data={exportValues} mode={'client'}/>
            </div>
        </div>
    );
}

export default Customers;