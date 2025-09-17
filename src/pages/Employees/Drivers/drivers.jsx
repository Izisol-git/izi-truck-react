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
import {driversGetId, getDrivers} from "../../../features/Drivers/driversThunks.js";
import ExcelModal from "../../../Components/Modal/excelModal.jsx";
import select from "daisyui/components/select/index.js";
import {useTranslation} from "react-i18next";

function Drivers() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;
    const [total, setTotal] = useState();
    const { t } = useTranslation();

    // const [driversId, setDrversId] = useState();
    const [searchDriver, setSearchDriver] = useState('');
    const [driversData, setDriversData] = useState();
    const [data, setData] = useState();
    const id = useSelector((state) => state.employesModal.driversId);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [dataIndex , setDataIndex] = useState(0);
    const [columnsArry, setColumnsArry] = useState([
        { key: "notifications.notificationsTable.avatar", title: "Аватар", active: true },
        { key: "notifications.notificationsTable.full_name", title: "Full name", active: true },
        { key: "notifications.notificationsTable.username", title: "User Name", active: true },
        { key: "notifications.notificationsTable.created_at", title: "Created at", active: true },
        { key: "notifications.notificationsTable.action", title: "Action", active: true }
    ]);




    const exportValues = [
        { id: "fio", value: t("drivers.exportValues.fio") },
        { id: "phone_number", value: t("drivers.exportValues.phone_number") },
        { id: "number", value: t("drivers.exportValues.number") },
        { id: "trailer_number", value: t("drivers.exportValues.trailer_number") },
        { id: "brand", value: t("drivers.exportValues.brand") },
        { id: "length", value: t("drivers.exportValues.length") },
        { id: "width", value: t("drivers.exportValues.width") },
        { id: "height", value: t("drivers.exportValues.height") },
        { id: "capacity", value: t("drivers.exportValues.capacity") },
        { id: "carrying", value: t("drivers.exportValues.carrying") },
        { id: "condition", value: t("drivers.exportValues.condition") },
        { id: "type", value: t("drivers.exportValues.type") },
        { id: "created_by", value: t("drivers.exportValues.created_by") },
        { id: "created_at", value: t("drivers.exportValues.created_at") }
    ];



    const DriversId = async ()=> {
        try {
            const res = await dispatch(driversGetId(id)).unwrap()
            setData(res.driver)
            console.log(res)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        if(id !== null){
            DriversId()
        }
    } , [id])


    const driverData = async () => {
       try {
           const res = await dispatch(getDrivers({page: pageqq, search: searchDriver , selectedKeys :  selectedKeys  })).unwrap()
           setDriversData(res.data.data);
           setTotal(res.data)
           setDataIndex({
               current_page: res.data.current_page ,
               per_page:res.data.per_page,
           })
           console.log(res);
       }catch (error){
           console.log(error)
       }
    };

    useEffect(() => {
        driverData();
    }, [pageqq, dispatch, searchDriver]);

    return (
        <div>
            <div className={'bg-bacWhite flex  dark:bg-darkBg min-h-[calc(100dvh-70px)]'}>
                <div className="w-[90%] mx-auto">
                    <UserNavbar value={'Drivers'} columnsArry={columnsArry}
                                setColumnsArry={setColumnsArry}/>
                        <UserPagination dataIndex={dataIndex} setSearch={setSearchDriver}   total={total}
                                    data={driversData} arry={columnsArry} setColumnsArry={setColumnsArry}
                                    navigateURL={'drivers'}  />
                    <Timeline data={data} />
                </div>
            </div>

            <ExcelModal page={pageqq} search={searchDriver}  setSelectedKeys={setSelectedKeys} selectedKeys={selectedKeys}  data={exportValues} mode={'driver'} />

        </div>);
}

export default Drivers;