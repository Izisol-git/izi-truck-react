import React, {useEffect, useState} from 'react';
import {
    Timeline,
    UserPagination,
} from "../../../Components/index.js";
import {UserNavbar} from "../../index.js";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {driversGetId, getDrivers} from "../../../features/Drivers/driversThunks.js";
import ExcelModal from "../../../Components/Modal/excelModal.jsx";
import {useTranslation} from "react-i18next";

function Drivers() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;

    const {t} = useTranslation();
    const [searchDriver, setSearchDriver] = useState('');
    const id = useSelector((state) => state.employesModal.driversId);
    const {drivers , addDriversDate} = useSelector((state) => state.drivers);
    const {driversId} = useSelector((state) => state.drivers);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const [columnsArry, setColumnsArry] = useState([
        {key: "notifications.notificationsTable.avatar", title: "Аватар", active: true},
        {key: "notifications.notificationsTable.full_name", title: "Full name", active: true},
        {key: "notifications.notificationsTable.username", title: "User Name", active: true},
        {key: "notifications.notificationsTable.created_at", title: "Created at", active: true},
        {key: "notifications.notificationsTable.action", title: "Action", active: true}
    ]);

    const exportValues = [
        {id: "fio", value: t("drivers.exportValues.fio")},
        {id: "phone_number", value: t("drivers.exportValues.phone_number")},
        {id: "number", value: t("drivers.exportValues.number")},
        {id: "trailer_number", value: t("drivers.exportValues.trailer_number")},
        {id: "brand", value: t("drivers.exportValues.brand")},
        {id: "length", value: t("drivers.exportValues.length")},
        {id: "width", value: t("drivers.exportValues.width")},
        {id: "height", value: t("drivers.exportValues.height")},
        {id: "capacity", value: t("drivers.exportValues.capacity")},
        {id: "carrying", value: t("drivers.exportValues.carrying")},
        {id: "condition", value: t("drivers.exportValues.condition")},
        {id: "type", value: t("drivers.exportValues.type")},
        {id: "created_by", value: t("drivers.exportValues.created_by")},
        {id: "created_at", value: t("drivers.exportValues.created_at")}
    ];


    const DriversId = async () => {
        try {
            const res = await dispatch(driversGetId(id)).unwrap()
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (id !== null) {
            DriversId()
        }
    }, [id])


    const driverData = async (pageqq, searchDriver) => {
        try {
            const res = await dispatch(getDrivers({
                page: pageqq,
                search: searchDriver,
            })).unwrap()
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const now = Date.now()
        const lastFetch = addDriversDate ? new Date(addDriversDate).getTime() : Number(localStorage.getItem("refreshValue"));
        const diff = now - lastFetch;

        if (drivers?.length === 0 || diff >= Number(localStorage.getItem("refreshValue"))) {
            driverData(pageqq, searchDriver);
        }
    }, [pageqq, dispatch, searchDriver]);

    return (
        <div>
            <div className={'bg-bacWhite flex  dark:bg-darkBg min-h-[calc(100dvh-70px)]'}>
                <div className="w-[90%] mx-auto">
                    <UserNavbar value={'Drivers'} columnsArry={columnsArry}
                                setColumnsArry={setColumnsArry}/>
                    <UserPagination search={searchDriver} setSearch={setSearchDriver} onClick={driverData}
                                    data={drivers} arry={columnsArry} setColumnsArry={setColumnsArry}
                                    navigateURL={'drivers'}/>
                    <Timeline data={driversId}/>
                </div>
            </div>

            <ExcelModal page={pageqq} search={searchDriver} setSelectedKeys={setSelectedKeys}
                        selectedKeys={selectedKeys} data={exportValues} mode={'driver'}/>

        </div>);
}

export default Drivers;