import React, {useEffect, useState} from "react";

import {InputMUI, Loading, MyCalendar, PaginationFooter, QueriesCard, SelectMUI} from "../../Components/index.js";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getQueriesAll} from "../../features/Queries/queriesThunks.js";
import {LogisticsInterface} from "../../Components/index.js";
import {openExcelModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import ExcelModal from "../../Components/Modal/excelModal.jsx";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";


function Queries() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;
    const {queries} = useSelector((state) => state.queries);
    const {loading} = useSelector((state) => state.queries);
    const [filters, setFilters] = useState({
        search: "",
        from: '',
        to: ''
    });
    const [selectedKeys, setSelectedKeys] = useState([]);
    const {t} = useTranslation();

    // console.log(filters);

    const getQueries = async () => {
        try {
            const res = await dispatch(getQueriesAll({
                pageqq: pageqq, search: {
                    ...filters,
                    from: filters.from ? dayjs(filters.from).format("YYYY-MM-DD") : "",
                    to: filters.to ? dayjs(filters.to).format("YYYY-MM-DD") : "",
                }
            })).unwrap()
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }


    // console.log(queries?.data)

    useEffect(() => {
        if (queries.length === 0) {
            getQueries()
        }
    }, [pageqq, dispatch, filters])


    const exportValues = [
        {id: "id", value: "ID"},
        {id: "title", value: "Название заявки"},
        {id: "client", value: "Клиент"},
        {id: "client_inn", value: "ИНН клиента"},
        {id: "transport_type", value: "Вид транспорта"},
        {id: "transport_volume", value: "Объем транспорта"},
        {id: "count_of_cars", value: "Количество машин"},
        {id: "weight", value: "Вес (кг)"},
        {id: "payment_method", value: "Метод оплаты"},
        {id: "client_enumeration_price", value: "Цена клиента (перечисление)"},
        {id: "client_enumeration_currency", value: "Валюта цены клиента"},
        {id: "mode", value: "Режим (для рефрижератора)"},
        {id: "degree_of_danger", value: "Степень опасности"},
        {id: "load_time_from", value: "Дата загрузки"},
        {id: "notes", value: "Примечания"},
        {id: "status_of_cargo", value: "Статус груза"},
        {id: "created_at", value: "Дата создания"},
        {id: "updated_at", value: "Дата обновления"},
        {id: "from_country", value: "Страна отправления"},
        {id: "from_region", value: "Регион отправления"},
        {id: "from_city", value: "Город отправления"},
        {id: "to_country", value: "Страна назначения"},
        {id: "to_region", value: "Регион назначения"},
        {id: "to_city", value: "Город назначения"},
    ];


    return (
        <div className="bg-bacWhite dark:bg-darkBg min-h-[calc(100dvh-70px)]">
            <div className="w-[90%] mx-auto py-5">


                <div
                    className={"w-full flex items-center justify-between bg-white overflow-hidden p-4  rounded-lg mb-4    dark:bg-darkBgTwo "}>

                    <div className={' flex items-center   flex-1 gap-2 '}>
                        <div className={'w-[20%]'}>
                            <InputMUI
                                value={filters?.search}
                                onChange={(e) => setFilters({...filters, search: e.target.value})}
                                variant={'outlined'} label={'Search'}/>
                        </div>

                        <div className={'relative w-[20%]'}>
                            <MyCalendar
                                label={'Kelish vaqti'}
                                value={filters?.from}
                                onChange={(val) => setFilters({...filters, from: val})}
                            />

                        </div>
                        <div className={'relative w-[20%]'}>
                            <MyCalendar
                                label={'Ketish vaqti'}
                                value={filters?.to}
                                onChange={(val) => setFilters({...filters, to: val})}
                            />


                        </div>
                        <div className={'flex items-center gap-2 '}>
                            <button
                                onClick={() => {
                                    setFilters({
                                        search: "",
                                        from_date: "",
                                    })
                                    getQueries({
                                        pageqq: pageqq, filters: {
                                            search: "",
                                            from_date: "",
                                        }
                                    })
                                }}
                                className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue   transition-all duration-300 ease-in-out  hover:text-white hover:bg-blue py-[6px] px-3 dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText"
                            >
                                Clear input

                            </button>
                            <button
                                onClick={() => getQueries(filters, pageqq)}

                                className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out  hover:text-white hover:bg-blue py-[6px] px-3 dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText"
                            >
                                <i className="fa-solid fa-magnifying-glass mr-2"></i>
                                Search

                            </button>
                        </div>
                    </div>

                    <div className={'flex items-center gap-2'}>
                        <button
                            onClick={(e) => {
                                dispatch(openExcelModal())
                            }}
                            className="relative overflow-hidden rounded bg-green-500 hover:ring-2 ring-green-500 dark:bg-btnBgDark text-white py-2 px-3"
                        >
                            <i className="fa-solid fa-table mr-2"></i> excel

                            <TouchRipple center={false}/>
                        </button>
                        <button
                            onClick={() => navigate("/queries/create")}
                            className={'flex items-center py-2 px-3 bg-blue text-white rounded hover:ring-2 ring-blue outline-none dark:bg-btnBgDark'}>
                            <i className={'fas fa-plus mr-2'}></i>Добавить
                        </button>
                    </div>


                </div>

                <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4'}>
                    {loading ? <Loading/> :
                        queries?.data?.map((item, index) => (
                            <QueriesCard transaction={item} index={index}/>
                        ))
                    }


                </div>
            </div>

            <div className="flex items-center justify-end w-[90%] mx-auto pb-5">
                <PaginationFooter total={queries}/>
            </div>

            <LogisticsInterface data={queries}/>
            <ExcelModal search={filters} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys}
                        data={exportValues} mode={'queries'}/>
        </div>
    );
}

export default Queries;
