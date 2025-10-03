import React, {useEffect, useState} from "react";

import {
    InputMUI,
    Loading,
    MyCalendar,
    NotFound,
    PaginationFooter,
    QueriesCard
} from "../../Components/index.js";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getQueriesAll} from "../../features/Queries/queriesThunks.js";
import {LogisticsInterface} from "../../Components/index.js";
import {openExcelModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import ExcelModal from "../../Components/Modal/excelModal.jsx";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";
import {Button} from "@mui/material";


function Queries() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;
    const {queries, addQueriesDate} = useSelector((state) => state.queries);
    const {loading} = useSelector((state) => state.queries);
    const [showSearch, setShowSearch] = useState(false);

    const [filters, setFilters] = useState({
        search: "",
        from: '',
        to: ''
    });
    const [selectedKeys, setSelectedKeys] = useState([]);
    const {t} = useTranslation();

    const getQueries = async (pageqq, filters) => {
        try {
            const res = await dispatch(getQueriesAll({
                pageqq: pageqq, search: {
                    ...filters,
                    from: filters.from ? dayjs(filters.from).format("YYYY-MM-DD") : "",
                    to: filters.to ? dayjs(filters.to).format("YYYY-MM-DD") : "",
                }
            })).unwrap()
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const now = Date.now()
        const lastFetch = addQueriesDate ? new Date(addQueriesDate).getTime() : Number(localStorage.getItem("refreshValue"));
        const diff = now - lastFetch;

        if (queries.length === 0 || diff >= Number(localStorage.getItem("refreshValue"))) {
            getQueries(pageqq, filters)
        }
    }, [pageqq, dispatch, filters])


    const exportValues = [
        {id: "id", value: "queriesTranslation.id"},
        {id: "title", value: "queriesTranslation.title"},
        {id: "client", value: "queriesTranslation.client"},
        {id: "client_inn", value: "queriesTranslation.client_inn"},
        {id: "transport_type", value: "queriesTranslation.transport_type"},
        {id: "transport_volume", value: "queriesTranslation.transport_volume"},
        {id: "count_of_cars", value: "queriesTranslation.count_of_cars"},
        {id: "weight", value: "queriesTranslation.weight"},
        {id: "payment_method", value: "queriesTranslation.payment_method"},
        {id: "client_enumeration_price", value: "queriesTranslation.client_enumeration_price"},
        {id: "client_enumeration_currency", value: "queriesTranslation.client_enumeration_currency"},
        {id: "mode", value: "queriesTranslation.mode"},
        {id: "degree_of_danger", value: "queriesTranslation.degree_of_danger"},
        {id: "load_time_from", value: "queriesTranslation.load_time_from"},
        {id: "notes", value: "queriesTranslation.notes"},
        {id: "status_of_cargo", value: "queriesTranslation.status_of_cargo"},
        {id: "created_at", value: "queriesTranslation.created_at"},
        {id: "updated_at", value: "queriesTranslation.updated_at"},
        {id: "from_country", value: "queriesTranslation.from_country"},
        {id: "from_region", value: "queriesTranslation.from_region"},
        {id: "from_city", value: "queriesTranslation.from_city"},
        {id: "to_country", value: "queriesTranslation.to_country"},
        {id: "to_region", value: "queriesTranslation.to_region"},
        {id: "to_city", value: "queriesTranslation.to_city"},
    ];

    return (
        <div className="bg-bacWhite dark:bg-darkBg min-h-[calc(100dvh-70px)]    ">
            <div className="w-[95%] mx-auto py-5 ">
                <div
                    className={"w-full flex items-center justify-between  mb-1  "}>
                    <p className={'text-2xl text-blue font-semibold dark:text-darkText'}>{t('queriesTranslation.queries')}</p>
                    <div className={'flex items-center gap-2 '}>
                        <Button
                            variant="contained"
                            size="small"
                            color={'success'}
                            onClick={() => {
                                dispatch(openExcelModal())
                            }}
                        >
                            <i className="fa-solid fa-table mr-2"></i> excel

                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            color={'success'}
                            sx={{
                                background: "#5E83D4"
                            }}
                            onClick={() => navigate("/queries/create")}
                        >
                            <i className={'fas fa-plus mr-2'}></i>{t('queriesTranslation.add')}
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            color={'success'}
                            sx={{
                                background: "#1D2D5B"
                            }}
                            onClick={() => {
                                setShowSearch(prev => !prev);
                            }}
                        >
                            {t("ordersTranslation.search_show")} <i className={`fa-solid fa-angle-right ${showSearch ? 'transition-transform rotate-90' : ''} transition duration-300 ease-in-out `}></i>
                        </Button>
                    </div>


                </div>


                <div
                    className={` ${showSearch ? 'max-h-96' : 'max-h-0'} transition-all   mx-auto my-4   duration-500 ease-in-out  bg-white dark:bg-darkBgTwo rounded-lg center overflow-hidden `}>
                    <div className={"w-full overflow-hidden p-4  dark:bg-darkBgTwo"}>
                        <div className={' grid grid-cols-3 flex-1 gap-2 '}>
                            <InputMUI
                                value={filters?.search}
                                onChange={(e) => setFilters({...filters, search: e.target.value})}
                                variant={'outlined'} label={t("queriesTranslation.filters.search")}/>
                            <MyCalendar
                                label={t("queriesTranslation.filters.arrival_time")}
                                value={filters?.from}
                                onChange={(val) => setFilters({...filters, from: val})}
                            />

                            <MyCalendar
                                size={'small'}
                                label={t("queriesTranslation.filters.departure_time")}
                                value={filters?.to}
                                onChange={(val) => setFilters({...filters, to: val})}
                            />
                        </div>
                        <div className={'  w-max mx-auto    flex items-center gap-2 mt-3  '}>
                            <Button className={'dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText'}
                                variant="outlined"
                                color={'myPurple'}
                                onClick={() => {
                                    setFilters({
                                        search: "",
                                        from_date: "",
                                    })
                                    getQueries(
                                        1, {
                                            search: "",
                                            from_date: "",
                                        }
                                    )
                                }}

                            >
                                {t("queriesTranslation.filters.clear_input")}

                            </Button>
                            <Button className={'dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText'}
                                variant="outlined"
                                color={'myPurple'}
                                onClick={() => getQueries(pageqq, filters)}

                             >
                                <i className="fa-solid fa-magnifying-glass mr-2"></i>
                                {t("queriesTranslation.filters.search")}

                            </Button>
                        </div>

                    </div>

                </div>


                <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4   gap-4'}>
                    {loading ? <Loading/> :
                        queries?.data?.length === 0 ? <NotFound/> : queries?.data?.map((item, index) => (
                            <QueriesCard key={item.id || index} transaction={item} index={index}/>
                        ))
                    }
                </div>
            </div>

            <div className="flex items-center justify-end w-[90%] mx-auto pb-5">
                <PaginationFooter total={queries} search={filters} onClick={getQueries}/>
            </div>

            <LogisticsInterface/>
            <ExcelModal search={filters} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys}
                        data={exportValues} mode={'queries'}/>
        </div>
    );
}

export default Queries;
