import React from "react";
import dayjs from "../../utils/dayjs.js";
import relativeTime from "dayjs/plugin/relativeTime";
import {
    Card,
    CardContent,
    Chip,
    Button,
    Grid,
    Divider,
} from "@mui/material";
import {
    LocalShipping as TruckIcon,
    LocationOn as MapPinIcon,
    AccessTime as ClockIcon,
    Inventory2 as PackageIcon,
    ArrowForward as ArrowRightIcon,
} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {changeDbOrders} from "../../features/EmployeSModalToggle/employesModalToggle.js";

dayjs.extend(relativeTime);
dayjs.locale("uz");

const statusMap = {
    new: {label: "Новый заказ", color: "info"},
    in_progress: {label: "В работе", color: "warning"},
    done: {label: "Завершён", color: "success"},
    canceled: {label: "Отменён", color: "error"},
};

export default function OrderLogisticsCard({order}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const status = statusMap[order?.status] || {
        label: order?.status === 4 ? "Haydovchi tayinlangan" : "Noma'lum",
        color: order?.status === 4 ? "success" : "warning",
    };

    return (
        <Card  onDoubleClick={() => {
            navigate(`/orders/${order?.id}`)
            dispatch(changeDbOrders(order?.source))
            localStorage.setItem("dbOrders", order?.source);
        }} className="  mx-auto   rounded-xl">
            {/* Header */}
            <div
                className="bg-gradient-to-r bg-[#DBE3F5] text-white p-2 flex justify-between items-center rounded-br-lg rounded-bl-lg">
                <div className="flex items-center gap-3">
                    <PackageIcon className={'text-blue'}/>
                    <div className={'text-blue'}>
                        <h6 className="font-bold text-lg">#{order?.order_id || "EXP00001"}</h6>
                        {/*<p className="text-sm">{order?.client_fio || "No client"}</p>*/}
                    </div>
                </div>
                <Chip label={`${dayjs(order?.created_at).fromNow()}`} color="error"/>
            </div>

            <CardContent>

                <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'}>
                    {/* Order Details */}
                    <div className="flex flex-col h-full">
                        <div className="flex items-center gap-2 font-semibold text-blue pb-2  whitespace-nowrap">
                            <ClockIcon color="primary" fontSize="small"/> Buyurtma ma’lumotlari
                        </div>
                        <Divider className="my-2"/>

                        {/* Bu div qolgan joyni egallaydi */}
                        <div className="pt-2 flex flex-col justify-between flex-1">
                            <div className={''}>
                                <p className="text-sm font-semibold text-blue">Дата акта: <span
                                    className={'ml-2'}>{order?.act_date || "-"}</span></p>
                                <div className={''}></div>
                                <p className="text-sm font-semibold text-blue mt-2">Источник
                                    заказа: <span className={'ml-2'}>{order?.source || "-"}</span>
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-blue">
                                    Статус: <Chip size="small" label={status.label} color={status.color}/>
                                </div>
                                <p className="text-sm font-semibold mt-2 text-blue">Номер
                                    машины: <span className={'ml-2'}>{order?.driver_number || "-"}</span>
                                </p>
                            </div>

                            <Button

                                fullWidth
                                variant="contained"
                                color="primary"
                                className="mt-3"

                                onClick={() => {
                                    navigate(`/orders/${order?.id}`)
                                    dispatch(changeDbOrders(order?.source))
                                    localStorage.setItem("dbOrders", order?.source);
                                }}
                            >
                                <i className="fa-solid fa-eye mr-2"></i>
                                Batafsil
                            </Button>
                        </div>
                    </div>


                    {/* Route Information */}
                    <div className={''}>
                        <Grid item xs={12} xl={4}>
                            <div className="flex items-center gap-2 font-semibold text-blue pb-2 whitespace-nowrap">
                                <MapPinIcon color="primary" fontSize="small"/> Yoʻnalish maʼlumotlari
                            </div>
                            <Divider className="my-2"/>
                            <div className={'pt-2'}>
                                <div className="bg-gray-100 p-3 rounded-lg mb-2">
                                    <p className="font-medium">YUKLASH</p>
                                    <p className="text-sm text-gray-500">

                                        {order?.point_of_departure + " - " + order?.country_of_departure || " - "}
                                    </p>
                                </div>
                                <div className="text-center my-2">
                                    <ArrowRightIcon color="primary"/>
                                </div>
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    <p className="font-medium">TUSHIRISH</p>
                                    <p className="text-sm text-gray-500">
                                        {order?.point_of_destination + " - " + order?.country_of_destination || " - "}
                                        {}
                                    </p>
                                </div>
                            </div>
                        </Grid>
                    </div>


                    {/* Timeline & Status */}
                    <div className={'   '}>
                        <div className={'  h-full'}>
                            <div className="flex items-center gap-2 font-semibold text-blue pb-2 whitespace-nowrap">
                                <TruckIcon color="primary" fontSize="small"/> Vaqt jadvali
                            </div>
                            <Divider className="my-2"/>

                            <div className="flex gap-4  pt-2   h-max">
                                {/* Line + Dots */}
                                <div className="relative flex flex-col items-end justify-between  ">
                                    <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-gray-300"></div>
                                    <div
                                        className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center relative z-[1]">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>

                                    </div>
                                    <div
                                        className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center relative z-[1]">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                </div>

                                {/* Start + End */}
                                <div>
                                    <div className="flex items-start gap-4 mb-6">

                                        <div className="flex-1 pt-1">

                                            <div className="flex items-center gap-2 mb-1">
                                              <span className="font-semibold text-gray-900">
                                                {order?.created_at
                                                    ? new Date(order.created_at).toLocaleDateString("ru-RU")
                                                    : "----"}
                                              </span>
                                                <Chip size="small" label="Start" variant="outlined"/>

                                            </div>
                                            <p className="text-sm text-gray-500">Дата погрузки</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-1 pt-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                  <span className="font-semibold text-gray-900">
                                                    {order?.updated_at
                                                        ? new Date(order.updated_at).toLocaleDateString("ru-RU")
                                                        : "----"}
                                                  </span>
                                                <Chip size="small" label="End" variant="outlined"/>
                                            </div>
                                            <p className="text-sm text-gray-500">Дата разгрузки</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>


            </CardContent>
            <div
                className="bg-[#DBE3F5]  mt-4  rounded-tr-lg rounded-tl-lg overflow-hidden text-center flex items-center justify-between  ">
                <div className={'flex items-center gap-5 px-4 py-2'}>
                    <p className="text-sm    font-semibold text-blue ">Оплата</p>
                    <p className="text-lg font-bold text-gray-900">{
                        Number(order?.source === 'mysql' ? order?.fraxt_price_transfer : order?.carrier_price_transfer).toLocaleString("ru-RU", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })} UZS</p>
                </div>
                {
                    order?.source === "mysql" ?
                        <div className={'h-full'}>

                            <Button
                                sx={{
                                    height: 43,
                                    borderRadius: 0,
                                }}
                                // size="small"
                                variant="contained"
                                color="warning"
                                onClick={() => {
                                    navigate(`/orders/edit/${order.id}`);
                                }}
                            >
                                <i className="fa-solid fa-pen-to-square mr-2"></i>
                                Edit
                            </Button>
                        </div>
                        :
                        ''
                }
            </div>
        </Card>
    );
}
