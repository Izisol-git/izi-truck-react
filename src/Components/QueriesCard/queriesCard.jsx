import React from "react"
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Button,
    Badge,
    Chip,
    Box,
    Stack,
    Divider,
} from "@mui/material"
import {Bell, Clock, X} from "lucide-react"
import {NotificationsModal} from "../index.js";
import NotificationsIcon from "@mui/icons-material/Notifications";
import dayjs from "../../utils/dayjs.js";

export default function QueriesCard({transaction}) {
    const getStatusButton = () => {
        switch (transaction.status) {
            case "proposed":
                return (
                    <Button color={"primary"} variant={"contained"}
                        className="w-full !text-[12px]    text-white">{"Ставка перевозчика предложена"}</Button>
                )
            case "cancelled":
                return (
                    <Button color={"primary"} variant="destructive" className="w-full !text-[12px]">
                        <X className="mr-2 h-4 w-4"/>
                        {"Отмена"}
                    </Button>
                )
            case "pending":
                return (
                    <Button color={"primary"}
                        className="w-full !text-[12px]  bg-teal-600 hover:bg-teal-700 text-white">{"Ставка перевозчика предложена"}</Button>
                )
            default:
                return null
        }
    }

    return (
        <Card
            className="w-full bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow !rounded-xl">
            <div className="flex items-center justify-between pt-4 px-4 ">
                <h3 className=" font-semibold text-gray-900 text-sm">{transaction.route1}
                    <i className="fa-solid fa-route text-green-500 mx-2"></i>
                    {transaction.route2}
                </h3>

                {/*{transaction.notifications && (*/}
                {/*    <Badge badgeContent={transaction.notifications} color="info"*/}
                {/*           className={'bg-orange-100 text-orange-800 border-orange-200 p-1 rounded'}>*/}
                {/*        <NotificationsIcon className="text-gray-700 dark:text-gray-200 transition-colors duration-300"*/}
                {/*                           color="action"/>*/}
                {/*    </Badge>*/}
                {/*)}*/}

                <div className="flex items-center justify-between ">
                    {/*<Badge variant="outline" className="bg-orange-500 text-orange-900 border-orange-800 flex items-center p-1 rounded">*/}
                    {/*<Clock className="mr-1 h-3 w-3"/>*/}
                    <Chip className={'!rounded !text-[12px]'} label={`${dayjs(transaction?.created_at).fromNow()}`}
                          color="error"/>
                    {/*{transaction.timeAgo}*/}
                    {/*</Badge>*/}

                    {transaction.status === "cancelled" && transaction.cancelReason && (
                        <Button variant="destructive" size="sm" className={'!text-[12px]'}>
                            {"Отмена"}
                        </Button>
                    )}
                </div>


            </div>

            <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                        <span className="text-green-600 font-semibold">{"Груз:"}</span>
                        <div className="font-medium text-blue-600">{transaction.cargo}</div>
                    </div>
                    <div>
                        <span className="text-green-600 font-semibold">{"Тип оплаты:"}</span>
                        <div className="font-medium text-blue-600">{transaction.paymentType}</div>
                    </div>

                    <div>
                        <span className="text-green-600 font-semibold">Цена клиента:</span>
                        <div className="font-medium">{transaction.clientPrice}</div>
                    </div>
                    {/*{transaction.carrierPrice && (*/}
                    {/*    <div>*/}
                    {/*        <span className="text-gray-600">{"Цена перевозчика:"}</span>*/}
                    {/*        <div className="font-medium">{transaction.carrierPrice}</div>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>

                <div className="text-sm text-green-600 font-semibold    ">
                    Цена перевозчика действительна до
                    <p className={'font-medium text-black'}>{transaction.validUntil}</p>
                </div>

                {/*<div className="space-y-1 text-xs">*/}
                {/*    <div>*/}
                {/*        <span className="text-gray-600">Sales:</span>*/}
                {/*        <span className="ml-2 text-purple-600 font-medium">{transaction.sales}</span>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <span className="text-gray-600">Operation:</span>*/}
                {/*        <span className="ml-2 text-purple-600 font-medium">{transaction.operation}</span>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <span className="text-gray-600">{"Группы/Запросы:"}</span>*/}
                {/*        <span className="ml-2">0/0</span>*/}
                {/*    </div>*/}
                {/*</div>*/}


                    <div className="flex items-center justify-between  ">{getStatusButton()}</div>


                {transaction.cancelReason && (
                    <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        <span className="font-medium">{"Причина отмены:"}</span> {transaction.cancelReason}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
