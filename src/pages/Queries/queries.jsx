import React, {useEffect} from "react";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    Chip,
    Divider,
} from "@mui/material";
import {
    AccessTime,
    Warning,
    CheckCircle,
    Cancel,
    LocalShipping,
} from "@mui/icons-material";
import {InputMUI, MyCalendar, PaginationFooter, QueriesCard, SelectMUI} from "../../Components/index.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getQueriesAll} from "../../features/Queries/queriesThunks.js";


function Queries() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const getQueries = async () => {
        try {
            const res = await dispatch(getQueriesAll()).unwrap()
            console.log(res)
        }catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getQueries()
    } , [])

    const defaultTransaction = {
        id: 1,
        route1: "Москва",
        route2: "Санкт-Петербург",
        notifications: 3,
        cargo: "Строительные материалы",
        paymentType: "Безналичный расчет",
        clientPrice: "120 000 ₽",
        carrierPrice: "100 000 ₽",
        validUntil: "10.09.2025",
        sales: "Иван Петров",
        operation: "ООО Логистика",
        status: "proposed", // "proposed" | "cancelled" | "pending"
        timeAgo: "2 часа назад",
        cancelReason: "", // Agar status "cancelled" bo‘lsa, masalan: "Клиент передумал"
    }

    return (
        <div className="bg-bacWhite dark:bg-darkBg min-h-[calc(100dvh-70px)]">
            <div className="w-[90%] mx-auto py-5">

                <div
                    className={"w-full flex items-center justify-between bg-white overflow-hidden p-4  rounded-lg mb-4    dark:bg-darkBgTwo "}>

                    <div className={' flex items-center   flex-1 gap-2 '}>
                        <div className={'w-[20%]'}>
                            <InputMUI
                                // value={filters.search}
                                //       onChange={(e) => setFilters({...filters, search: e.target.value})}
                                variant={'outlined'} label={'Order ID yoki Yuk nomi'}/>
                        </div>

                        <div className={'relative w-[20%]'}>
                            <MyCalendar
                                // value={filters.from_date}
                                //         onChange={(val) => setFilters({...filters, from_date: val})}

                                // value={formData?.act_date}
                                // onChange={(val) => setFormData({...formData, act_date: val})}
                            />

                            <p className={'absolute text-[12px] pt-1 px-1 font-medium -top-[14px] left-2 text-[#3B82F6] dark:text-darkText bg-white dark:bg-darkBgTwo'}>Kelish
                                vaqti</p>

                        </div>
                        <div className={'flex items-center gap-2 '}>
                            <button
                                // onClick={() => setFilters({
                                //     search: "",
                                //     search_status: null,
                                //     db: "",
                                //     from_date: "",
                                //     to_date: "",
                                // })}
                                className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue   transition-all duration-300 ease-in-out  hover:text-white hover:bg-blue py-[6px] px-3 dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText"
                            >
                                Clear input

                            </button>
                            <button
                                // onClick={() => findOrders(filters, pageqq)}

                                className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out  hover:text-white hover:bg-blue py-[6px] px-3 dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText"
                            >
                                <i className="fa-solid fa-magnifying-glass mr-2"></i>
                                Search

                            </button>
                        </div>
                    </div>


                    <button
                        className={'flex items-center py-2 px-3 bg-[#38CB6E] text-white rounded hover:ring-2 ring-[#38CB6E] outline-none'}>
                        <i className={'fas fa-plus mr-2'}></i>Добавить
                    </button>


                </div>

                <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4'}>
                    <QueriesCard transaction={defaultTransaction}/>

                </div>
            </div>

            <div className="flex items-center justify-end w-[90%] mx-auto pb-5">
                <PaginationFooter/>
            </div>
        </div>
    );
}

export default Queries;
