import React, {useEffect, useState} from 'react';
import {ArrowTrendingUpIcon} from '@heroicons/react/24/solid';
import {OrdersChartPlaceholder, StatisticsFilter, TruckLoadPieChart} from "../../Components/index.js";
import {useDispatch, useSelector} from "react-redux";
import {getStatistics} from "../../features/Statistics/statisticsThunks.js";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Box, Button, Chip} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {useTranslation} from "react-i18next";
import {BookUser, Clipboard, FileText, Folders, Moon, Users, UsersRound} from "lucide-react";


function Counter({target}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const step = Math.ceil(target / 30); // tezlik
        const interval = setInterval(() => {
            start += step;
            if (start >= target) {
                clearInterval(interval);
                setCount(target);
            } else {
                setCount(start);
            }
        }, 20); // ms
        return () => clearInterval(interval);
    }, [target]);

    return <span>{count}</span>;
}


function SuperAdminDashboard() {
    const dispatch = useDispatch();
    // const [statistics, setStatistics] = useState();
    const {statistics} = useSelector(state => state.statistics);
    const [search, setSearch] = useState({
        from: null,
        to: null,
    });


    const getStatistic = async (search) => {
        try {
            const res = await dispatch(getStatistics({
                from: search.from ? dayjs(search.from).format("YYYY-MM-DD") : "",
                to: search.to ? dayjs(search.to).format("YYYY-MM-DD") : "",
            })).unwrap();
            console.log(res)
            // setStatistics(res)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {

        if (statistics.length === 0) {
            getStatistic(search)
        }
        // dispatch(getCurrentUser());
    }, [dispatch])


    const {t} = useTranslation();

    const dashboardCard = [
        {
            title: t("dashboard.totalOrders"),
            icon: <Folders className="w-8 h-8 text-primary"/>,
            amount: `${statistics?.total_orders || 0}`,
            data: t("dashboard.inLastWeek"),
            percent: "20%",
        },
        {
            title: t("dashboard.totalDrivers"),
            icon: <Users className="w-8 h-8 text-secondary"/>,
            amount: `${statistics?.total_drivers || 0}`,
            data: t("dashboard.inLastWeek"),
            percent: "1.8%",
        },
        {
            title: t("dashboard.totalClients"),
            icon: <BookUser className="w-8 h-8 text-warning"/>,
            amount: `${statistics?.total_clients || 0}`,
            data: t("dashboard.inLastWeek"),
            percent: "1.8%",
        },
        {
            title: t("dashboard.totalEmployees"),
            icon: <UsersRound className="w-8 h-8 text-success"/>,
            amount: `${statistics?.total_employees || 0}`,
            data: t("dashboard.inLastWeek"),
            percent: "1.2%",
        },
    ];
    return (
        <div className="bg-bacWhite dark:bg-darkBg">
            {/* HEADER */}
            <div className="w-[90%] py-5 mx-auto flex items-center justify-between">
                <p className="text-2xl text-blue font-semibold dark:text-darkText">
                    {t("dashboard.title")}
                </p>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <DatePicker
                            label={t("dashboard.dateFrom")} // tarjimadan
                            value={search.from}
                            onChange={(newValue) => setSearch({...search, from: newValue})}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    fullWidth: true,
                                },
                            }}
                        />

                        <DatePicker
                            label={t("dashboard.dateTo")} // tarjimadan
                            value={search.to}
                            onChange={(newValue) => setSearch({...search, to: newValue})}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    fullWidth: true,
                                },
                            }}
                        />

                        <Box display="flex" alignItems="center" gap={1}>
                            <Button
                                onClick={() => {
                                    setSearch({from: null, to: null});
                                    getStatistic({from: "", to: ""});
                                }}
                                variant="contained"
                                color="warning"
                            >
                                {t("dashboard.actionsClear")}
                            </Button>
                            <Button
                                onClick={() => {
                                    getStatistic(search);
                                }}
                                variant="contained"
                            >
                                {t("dashboard.actionsSearch")}
                            </Button>
                        </Box>
                    </Box>
                </LocalizationProvider>
            </div>

            {/* CARDS */}
            <div className="w-[90%] pb-5 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardCard.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded shadow-sm p-4 flex flex-col gap-3 w-full max-w-sm border border-gray-100 dark:bg-darkBgTwo dark:border-navBgHover"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-[50px] h-[50px] p-2 bg-violet-100 rounded-lg dark:bg-navBgHover">
                                    {item.icon}
                                </div>
                                <p className="text-sm text-gray-600 font-medium dark:text-darkText">
                                    {t(item.title)} {/* tarjima */}
                                </p>
                            </div>
                            <div
                                className="flex items-center gap-1 bg-violet-100 text-violet-600 text-sm px-2 py-1 rounded-full dark:bg-navBgHover">
                                <ArrowTrendingUpIcon className="w-4 h-4"/>
                                <span>{item.percent}</span>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-darkText">
                            <Counter target={item.amount}/>
                        </h2>
                        <p className="text-sm text-gray-400 dark:text-[#00a77e]">
                            {t("dashboard.inLastWeek")}
                        </p>
                    </div>
                ))}

                {/* CHART */}
                <div className="bg-white rounded shadow-sm col-span-2 p-4 flex flex-col gap-3 w-full dark:bg-darkBgTwo">
                    <h2 className="text-lg text-center text-blue font-semibold mb-4 dark:text-darkText">
                        {t("dashboard.orders")}
                    </h2>
                    <OrdersChartPlaceholder statistics={statistics}/>
                </div>

                {/* TRUCK LOAD */}
                <div className="bg-white rounded shadow-sm col-span-2 p-4 flex flex-col gap-3 w-full dark:bg-darkBgTwo">
                    <h2 className="text-lg text-center text-blue font-semibold mb-4 dark:text-darkText">
                        {t("dashboard.queries")}
                    </h2>
                    <TruckLoadPieChart statistics={statistics}/>
                </div>

                {/* RECENT ORDERS */}
                <div className="bg-white rounded shadow-sm col-span-2 p-4 flex flex-col gap-3 w-full dark:bg-darkBgTwo">
                    <h2 className="text-lg text-center text-blue font-semibold mb-4 dark:text-darkText">
                        {t("dashboard.recentOrders")}
                    </h2>
                    <div className="overflow-x-auto rounded-lg dark:bg-darkBgTwo bg-base-100">
                        <table className="table dark:text-darkText">
                            <thead className="dark:text-darkText dark:font-bold">
                            <tr>
                                <th>{t("dashboard.table.id")}</th>
                                <th>{t("dashboard.table.address")}</th>
                                <th>{t("dashboard.table.status")}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                statistics?.last_orders?.map((item, index) => (
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>{item.destination_location.replace(',', '  →  ')}</td>
                                        <td>
                                            {
                                                item.status === 0 ?
                                                    <Chip size={'small'} className="text-" variant={'filled'}  color={'warning'} label={t("ordersTranslation.ordersCard.unknown")}/>
                                                    :
                                                    <Chip size={'small'} className="text-" variant={'filled'}  color={'success'} label={t("ordersTranslation.ordersCard.driver_assigned")}/>
                                             }
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* DRIVERS STATUS */}
                <div className="bg-white rounded shadow-sm col-span-2 p-4 flex flex-col gap-3 w-full dark:bg-darkBgTwo">
                    <h2 className="text-lg text-blue text-center font-semibold mb-4 dark:text-darkText">
                        {t("dashboard.driversStatus")}
                    </h2>
                    <div className="p-2 flex flex-col gap-3">
                        <div className="flex items-center justify-between w-full">
                            <p className="font-semibold text-blue dark:text-darkText">👷 Sh.Ergashev</p>
                            <p className="text-[#16a34a]">{t("dashboard.drivers.busy")}</p>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <p className="font-semibold text-blue dark:text-darkText">👷 N.Karimov</p>
                            <p className="text-yellow-500">{t("dashboard.drivers.waiting")}</p>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <p className="font-semibold text-blue dark:text-darkText">👷 D.Saidov</p>
                            <p className="text-red-500">{t("dashboard.drivers.vacation")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuperAdminDashboard;