import React, {useEffect, useState} from 'react';
import {ArrowTrendingUpIcon} from '@heroicons/react/24/solid';
import {DateRange, OrdersChartPlaceholder, StatisticsFilter, TruckLoadPieChart} from "../../Components/index.js";
import {useDispatch, useSelector} from "react-redux";
import {getStatistics} from "../../features/Statistics/statisticsThunks.js";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {useTranslation} from "react-i18next";
import {BookUser, Clipboard, FileText, Folders, Moon, Users, UsersRound} from "lucide-react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Box, Button, Chip, Grid
} from "@mui/material";

function Counter({target}) {
    const [count, setCount] = useState(0);
    const {isOpenNavbarY} = useSelector((state) => state.employesModal);

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
            icon: <Folders className="w-8 h-8 text-brandBlue-600"/>,
            amount: `${statistics?.total_orders || 0}`,
            data: t("dashboard.inLastWeek"),
            percent: "20%",
        },
        {
            title: t("dashboard.totalDrivers"),
            icon: <Users className="w-8 h-8 text-orange-600"/>,
            amount: `${statistics?.total_drivers || 0}`,
            data: t("dashboard.inLastWeek"),
            percent: "1.8%",
        },
        {
            title: t("dashboard.totalClients"),
            icon: <BookUser className="w-8 h-8 text-yellow-500"/>,
            amount: `${statistics?.total_clients || 0}`,
            data: t("dashboard.inLastWeek"),
            percent: "1.8%",
        },
        {
            title: t("dashboard.totalEmployees"),
            icon: <UsersRound className="w-8 h-8 text-green-600"/>,
            amount: `${statistics?.total_employees || 0}`,
            data: t("dashboard.inLastWeek"),
            percent: "1.2%",
        },
    ];

    return (
        <div className="bg-bacWhite dark:bg-darkBg">
            {/* HEADER */}
            <div className={`w-[95%] py-5 mx-auto block items-center justify-between sm:flex`}>
                <p className="text-2xl mb-2 sm:mb-0 text-blue whitespace-nowrap font-semibold dark:text-darkText">
                    {t("dashboard.title")}
                </p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid container gap={{ xs: "5px", sm: 2}}   >
                        <Grid item  xs={3} display={{ xs: "block", lg: "none" }}>
                           <div className={'h-full'}>
                               <DateRange setSearch={setSearch}  search={search} />
                           </div>
                        </Grid>
                        <Grid item  xs={3} display={{ xs: "none", lg: "block" }}>
                            <DatePicker
                                label={t("dashboard.dateFrom")}
                                value={search.from}
                                onChange={(newValue) => setSearch({...search, from: newValue})}
                                slotProps={{
                                    textField: {
                                        size: "small",
                                        fullWidth: true,
                                        sx: { height: 40 }


                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={3} display={{ xs: "none", lg: "block" }}>
                            <DatePicker
                                label={t("dashboard.dateTo")} // tarjimadan
                                value={search.to}
                                onChange={(newValue) => setSearch({...search, to: newValue})}
                                slotProps={{
                                    textField: {
                                        size: "small",
                                         fullWidth: true,
                                        sx: { height: 40 }
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
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
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                onClick={() => {
                                    getStatistic(search);
                                }}
                                variant="contained"
                            >
                                {t("dashboard.actionsSearch")}
                            </Button>
                        </Grid>
                    </Grid>
                </LocalizationProvider>
            </div>

            {/* CARDS */}
            <div className={"w-[95%] pb-5 mx-auto grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4"}>
                {/* DASHBOARD CARDS */}
                {dashboardCard.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded shadow-sm p-4 flex flex-col gap-3 border border-gray-100 dark:bg-darkBgTwo dark:border-navBgHover"
                    >
                        <div className="flex items-start justify-between   relative">
                            <div className="flex items-center gap-3">
                                <div className="w-[50px] h-[50px] p-2 bg-violet-100 rounded-lg dark:bg-navBgHover">
                                    {item.icon}
                                </div>
                                <p className="text-sm text-gray-600 font-medium dark:text-darkText">
                                    {t(item.title)}
                                </p>
                            </div>
                            <div
                                className=" absolute -top-2 -right-2 flex items-center gap-1 bg-violet-100 text-violet-600 text-sm px-2 py-1 rounded-full dark:bg-navBgHover">
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
                <div
                    className="bg-white rounded shadow-sm col-span-1 sm:col-span-2   p-4 flex flex-col gap-3 dark:bg-darkBgTwo">
                    <h2 className="text-lg text-center text-blue font-semibold mb-4 dark:text-darkText">
                        {t("dashboard.orders")}
                    </h2>
                    <OrdersChartPlaceholder statistics={statistics}/>
                </div>

                {/* TRUCK LOAD */}
                <div
                    className="bg-white rounded shadow-sm col-span-1  sm:col-span-2 p-4 flex flex-col gap-3 dark:bg-darkBgTwo">
                    <h2 className="text-lg text-center text-blue font-semibold mb-4 dark:text-darkText">
                        {t("dashboard.queries")}
                    </h2>
                    <TruckLoadPieChart statistics={statistics}/>
                </div>

                {/* RECENT ORDERS */}
                <div
                    className="bg-white rounded shadow-sm col-span-1 sm:col-span-2  lg:col-span-4 p-4 flex flex-col gap-3 dark:bg-darkBgTwo">
                    <h2 className="text-lg text-center text-blue font-semibold mb-4 dark:text-darkText">
                        {t("dashboard.recentOrders")}
                    </h2>
                    <div className="overflow-x-auto rounded-lg dark:bg-darkBgTwo bg-base-100">
                        <TableContainer component={Paper} sx={{borderRadius: "12px", overflowX: "auto"}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t("dashboard.table.id")}</TableCell>
                                        <TableCell>{t("dashboard.table.address")}</TableCell>
                                        <TableCell>{t("dashboard.table.cargo_name")}</TableCell>
                                        <TableCell>{t("dashboard.table.tr_number")}</TableCell>
                                        <TableCell>{t("dashboard.table.date")}</TableCell>
                                        <TableCell>{t("dashboard.table.status")}</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {statistics?.last_orders?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.destination_location.replace(",", " → ")}</TableCell>
                                            <TableCell>{item.nature_of_cargo}</TableCell>
                                            <TableCell>{item.tr_number}</TableCell>
                                            <TableCell>{new Date(item.created_at).ddmmyyyy()}</TableCell>
                                            <TableCell>
                                                {item.status === 0 ? (
                                                    <Chip
                                                        size="small"
                                                        variant="filled"
                                                        color="warning"
                                                        label={t("ordersTranslation.ordersCard.unknown")}
                                                    />
                                                ) : (
                                                    <Chip
                                                        size="small"
                                                        variant="filled"
                                                        color="success"
                                                        label={t("ordersTranslation.ordersCard.driver_assigned")}
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SuperAdminDashboard;