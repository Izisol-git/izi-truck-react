import React, {useEffect, useState} from 'react';
import {UserNavbar} from "../../index.js";
import {Loading, UserPagination} from "../../../Components/index.js";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getContracts} from "../../../features/Contracts/contractThunks.js";
import Paginationfooter from "../../../Components/Pagination/paginationFooter/paginationfooter.jsx";

function ClientContracts() {
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [contractsdata, setContractsdata] = useState();
    const [total, setTotal] = useState();

    const
    [columnsArry, setColumnsArry] = useState([
        // {title: "client_id", active: true},
        {title: "Номер договора", active: true},
        {title: "Клиент", active: true},
        {title: "ИНН", active: true},
        {title: "МФО", active: true},
        {title: "Расчетный счет", active: true},
        {title: "Сумма договора", active: true},
        {title: "Дата договора", active: true},
        {title: "Actions", active: true},
    ])

    const getAllContracts = async () => {
        try {
            const res = await dispatch(getContracts({page: pageqq, search: search}));
            console.log(res);
            setTotal(res.payload)
            setContractsdata(res.payload.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllContracts()
    }, [dispatch, pageqq, search])


    return (
        <div>
            <div className={'bg-bacWhite flex min-h-[calc(100dvh-70px)] dark:bg-darkBg '}>
                <div className="w-[90%] mx-auto">
                    <UserNavbar value={'Contracts'} columnsArry={columnsArry}
                                setColumnsArry={setColumnsArry}/>

                    <UserPagination total={total} setSearch={setSearch} data={contractsdata} arry={columnsArry}
                                    setColumnsArry={setColumnsArry}
                                    navigateURL={'clients'}/>



                </div>
            </div>
        </div>
    );
}

export default ClientContracts;