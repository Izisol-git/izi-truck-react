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
import {useTranslation} from "react-i18next";
import {AddOrderId} from "../../features/orders/ordersSlice.js";
dayjs.extend(relativeTime);


const statusMap = {
    new: {label: "Новый заказ", color: "info"},
    in_progress: {label: "В работе", color: "warning"},
    done: {label: "Завершён", color: "success"},
    canceled: {label: "Отменён", color: "error"},
};

export default function OrderLogisticsCard({order}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t } = useTranslation();
    const { i18n } = useTranslation();
    dayjs.locale(i18n.language);
    const status = statusMap[order?.status] || {
        label: order?.status === 4
            ? t("ordersTranslation.ordersCard.driver_assigned")
            : t("ordersTranslation.ordersCard.unknown"),
        color: order?.status === 4 ? "success" : "warning",
    };

    return (
        <Card
            // sx={{
            //     background:'green'
            // }}
            // onDoubleClick={() => {
            //     navigate(`/orders/${order?.id}`)
            //     dispatch(changeDbOrders(order?.source))
            //     localStorage.setItem("dbOrders", order?.source)
            // }}
            className="mx-auto rounded-xl "
        >
            {/* Header */}
            <div className="bg-gradient-to-r bg-[#DBE3F5] text-white p-2 flex justify-between items-center rounded-br-lg rounded-bl-lg dark:bg-navBgHover">
                <div className="flex items-center gap-3">
                    <PackageIcon className="text-blue dark:text-darkTextTwo" />
                    <div className="text-blue dark:text-darkText">
                        <h6 className="font-bold text-lg">#{order?.order_id || "EXP00001"}</h6>
                    </div>
                </div>
                <Chip label={`${dayjs(order?.created_at).fromNow()}`} color="error" />
            </div>

            <CardContent className={` ${order?.act_date ? 'bg-green-200' : ''} `}  >
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
                    {/* Order Details */}
                    <div className="flex flex-col h-full">
                        <div className="flex items-center gap-2 font-semibold text-blue pb-2 whitespace-nowrap dark:text-darkText">
                            <ClockIcon color="primary" fontSize="small" />
                            {t("ordersTranslation.ordersCard.order_info")}
                        </div>
                        <Divider className="my-2" />

                        <div className="pt-2 flex flex-col justify-between flex-1">
                            <div>
                                <p className="text-sm font-semibold text-blue dark:text-darkText">
                                    {t("ordersTranslation.ordersCard.cargo_name")}
                                    <span className="ml-2">{order?.nature_of_cargo || "-"}</span>
                                </p>
                                <p className="text-sm font-semibold text-blue mt-2 dark:text-darkText">
                                    {t("ordersTranslation.ordersCard.act_date")}
                                    <span className="ml-2">{order?.act_date || "-"}</span>
                                </p>
                                <p className="text-sm font-semibold text-blue mt-2 dark:text-darkText">
                                    {t("ordersTranslation.ordersCard.order_source")}
                                    <span className="ml-2">{order?.source || "-"}</span>
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-blue dark:text-darkText">
                                    {t("ordersTranslation.ordersCard.status")}
                                    <Chip size="small" label={status.label} color={status.color} />
                                </div>
                                <p className="text-sm font-semibold mt-2 text-blue dark:text-darkText">
                                    {t("ordersTranslation.ordersCard.car_number")}
                                    <span className="ml-2">{order?.driver_number || "-"}</span>
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
                                    localStorage.setItem("dbOrders", order?.source)
                                    dispatch(AddOrderId(order))
                                }}
                            >
                                <i className="fa-solid fa-eye mr-2"></i>
                                {t("ordersTranslation.ordersCard.details")}
                            </Button>
                        </div>
                    </div>

                    {/* Route Information */}
                    <Grid item xs={12} xl={4}>
                        <div className="flex items-center gap-2 font-semibold text-blue pb-2 whitespace-nowrap dark:text-darkText">
                            <MapPinIcon color="primary" fontSize="small" />
                            {t("ordersTranslation.ordersCard.route_info")}
                        </div>
                        <Divider className="my-2" />
                        <div className="pt-2">
                            <div className="bg-gray-100 p-3 rounded-lg mb-2 dark:bg-navBgHover">
                                <p className="font-medium dark:text-darkText">{t("ordersTranslation.ordersCard.loading")}</p>
                                <p className="text-sm text-gray-500 dark:text-darkText">
                                    {order?.point_of_departure1 + " - " + order?.country_of_departure1 || " - "}
                                </p>
                            </div>
                            <div className="text-center my-2">
                                <ArrowRightIcon color="primary" />
                            </div>
                            <div className="bg-gray-100 p-3 rounded-lg dark:bg-navBgHover">
                                <p className="font-medium dark:text-darkText">{t("ordersTranslation.ordersCard.unloading")}</p>
                                <p className="text-sm text-gray-500 dark:text-darkText">
                                    {order?.point_of_destination1 + " - " + order?.country_of_destination1 || " - "}
                                </p>
                            </div>
                        </div>
                    </Grid>

                    {/* Timeline & Status */}
                    <div>
                        <div className="h-full">
                            <div className="flex items-center gap-2 font-semibold text-blue pb-2 whitespace-nowrap dark:text-darkText">
                                <TruckIcon color="primary" fontSize="small" />
                                {t("ordersTranslation.ordersCard.timeline")}
                            </div>
                            <Divider className="my-2" />

                            <div className="flex gap-4 pt-2 h-max">
                                <div className="relative flex flex-col items-end justify-between">
                                    <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-gray-300"></div>
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center relative z-[1]">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center relative z-[1]">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="flex-1 pt-1">
                                            <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900 dark:text-darkText">
                          {order?.created_at
                              ? new Date(order.shipment_date).toLocaleDateString("ru-RU")
                              : "----"}
                        </span>
                                                <Chip
                                                    size="small"
                                                    label={t("ordersTranslation.ordersCard.start")}
                                                    variant="outlined"
                                                />
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-darkText">
                                                {t("ordersTranslation.ordersCard.loading_date")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-1 pt-1">
                                            <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900 dark:text-darkText">
                         {order?.act_date
                             ? new Date(order.act_date).toLocaleDateString("ru-RU")
                             : t('ordersTranslation.no_data')}
                        </span>
                                                <Chip
                                                    size="small"
                                                    label={t("ordersTranslation.ordersCard.end")}
                                                    variant="outlined"
                                                />
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-darkText">
                                                {t("ordersTranslation.ordersCard.unloading_date")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>

            <div className="bg-[#DBE3F5]   rounded-tr-lg rounded-tl-lg overflow-hidden text-center flex items-center justify-between dark:bg-navBgHover">
                <div className="flex items-center gap-5 px-4 py-2 ">
                    <p className="text-sm font-semibold text-blue dark:text-darkText">
                        {t("ordersTranslation.ordersCard.payment")}
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-darkText">
                        {Number(
                            order?.source === "mysql"
                                ? order?.fraxt_price_transfer
                                : order?.carrier_price_transfer
                        ).toLocaleString("ru-RU", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}{" "}
                        UZS
                    </p>
                </div>
                {order?.source === "mysql" && (
                    <div className="h-full">
                        <Button
                            sx={{ height: 43, borderRadius: 0 }}
                            variant="contained"
                            color="warning"
                            onClick={() => {
                                dispatch(AddOrderId(order))
                                navigate(`/orders/edit/${order.id}`)
                            }}
                        >
                            <i className="fa-solid fa-pen-to-square mr-2"></i>
                            {t("ordersTranslation.ordersCard.edit")}
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
}
