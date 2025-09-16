import React, {useEffect, useRef, useState} from 'react';
import {
    MyCalendar,
    InputMUI,
    SelectMUI,
    OrdersCard,
    OffersOrders,
    Loading,
    PaginationFooter,  OffersOrdersCarrier
} from "../../Components/index.js";
import {OrdersDropDown} from "../../Components/index.js";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {openExcelModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {getFilteredOrders} from "../../features/orders/ordersThunks.js";
import ExcelModal from "../../Components/Modal/excelModal.jsx";
import {useTranslation} from "react-i18next";


function Orders() {
    const {user} = useSelector((state) => state.auth);
    const {t} = useTranslation();
    const [activeStatus, setActiveStatus] = useState();
    const [showSearch, setShowSearch] = useState('false');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [suggestions, setSuggestions] = useState();
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;
    // const [ordersData, setOrdersData] = useState();
    const {orders} = useSelector((state) => state.orders);
    const {loading} = useSelector((state) => state.orders);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const company = [
        {label: 'EGS', value: 'egs'},
        {label: 'INCOTRUCK', value: 'incotruck'},
        {label: 'EASTLINE EXPRESS', value: 'eastline'},
        {label: 'TRANSEKA', value: 'transceka'},
    ];
    const [filters, setFilters] = useState({
        search: "",
        search_status: 2,
        db: "",
        from_date: "",
        to_date: "",
    });

    const findOrders = async (filters, pageqq) => {
       try {
           const res = await dispatch(getFilteredOrders({filters: filters, pageqq: pageqq})).unwrap()
           // setOrdersData(res.orders.data)
           console.log(res)
       }
       catch (error) {
           console.log(error);
       }
    }
    useEffect(() => {
        if(orders.length === 0) {
          findOrders(filters, pageqq)
        }
    }, [pageqq]);

    useEffect(() => {
        const value = localStorage.getItem("showSearch");
        if (value !== 'true' || value !== 'false') {
            localStorage.setItem('showSearch', 'false');
        }
    }, [])

    const showSearchFunc = () => {
        const value = localStorage.getItem("showSearch");
        if (value !== 'true') {
            localStorage.setItem('showSearch', 'true');
            setShowSearch('true');
        } else {
            localStorage.setItem('showSearch', 'false');
            setShowSearch('false');
        }
    }

    const rippleRefs = {
        xls: useRef(null),
        add: useRef(null),
        suggest: useRef(null),
        view: useRef(null),
        search: useRef(null),
    };
    const handleClick = (event, ref) => {
        if (ref.current) {
            ref.current.start(event);
            requestAnimationFrame(() => {
                ref.current.stop(event);
            });
        }
    };

    const exportValues = [
        { id: "order_id", value: "ordersTranslation.order_id" },
        { id: "order_date", value: "ordersTranslation.order_date" },
        { id: "point_of_departure", value: "ordersTranslation.point_of_departure" },
        { id: "point_of_destination", value: "ordersTranslation.point_of_destination" },
        { id: "country_of_departure", value: "ordersTranslation.country_of_departure" },
        { id: "country_of_destination", value: "ordersTranslation.country_of_destination" },
        { id: "shipment_type", value: "ordersTranslation.shipment_type" },
        { id: "transport_value", value: "ordersTranslation.transport_value" },
        { id: "customs_clearance1", value: "ordersTranslation.customs_clearance1" },
        { id: "weight_of_cargo", value: "ordersTranslation.weight_of_cargo" },
        { id: "shipment_date", value: "ordersTranslation.shipment_date" },
        { id: "nature_of_cargo", value: "ordersTranslation.nature_of_cargo" },
        { id: "car_number", value: "ordersTranslation.car_number" },
        { id: "carp_number", value: "ordersTranslation.carp_number" },
        { id: "carrier_contract_no", value: "ordersTranslation.carrier_contract_no" },
        { id: "carrier_company", value: "ordersTranslation.carrier_company" },
        { id: "carrier_tin", value: "ordersTranslation.carrier_tin" },
        { id: "carrier_contract_date", value: "ordersTranslation.carrier_contract_date" },
        { id: "act_date", value: "ordersTranslation.act_date" },
        { id: "carrier_price_transfer", value: "ordersTranslation.carrier_price_transfer" },
        { id: "mode", value: "ordersTranslation.mode" }
    ];



    return (
        <div className={'bg-bacWhite dark:bg-darkBg min-h-[calc(100dvh-70px)] '}>
            <div className=" w-[90%] mx-auto py-5 ">
                <div className={'flex items-center justify-between  '}>
                    <div className="flex items-center gap-2">
                        <OrdersDropDown pageqq={pageqq} onClick={findOrders} filters={filters} setFilters={setFilters}
                                        activeStatus={activeStatus}
                                        setActiveStatus={setActiveStatus}/>
                    </div>


                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => {
                                handleClick(e, rippleRefs.xls)
                                dispatch(openExcelModal())
                            }}
                            className="relative overflow-hidden rounded bg-green-500 dark:bg-btnBgDark text-white py-2 px-3"
                        >
                            <i className="fa-solid fa-table mr-2"></i> {t("ordersTranslation.excel")}
                            <TouchRipple ref={rippleRefs.xls} center={false}/>
                        </button>

                        <button
                            onClick={(e) => {
                                handleClick(e, rippleRefs.add)
                                navigate('/orders/create')
                            }}
                            className="relative overflow-hidden rounded bg-[#A855F7] dark:bg-btnBgDark text-white py-2 px-3"
                        >
                            <i className="fas fa-plus mr-2"></i> {t("ordersTranslation.add")}
                            <TouchRipple ref={rippleRefs.add} center={false}/>
                        </button>

                        {/*<button*/}
                        {/*    onClick={(e) => {*/}
                        {/*        handleClick(e, rippleRefs.suggest)*/}
                        {/*        dispatch(openOffersModal())*/}
                        {/*        getSuggestion()*/}
                        {/*    }}*/}
                        {/*    className="relative overflow-hidden rounded bg-[#EAB308] dark:bg-btnBgDark text-white py-2 px-3"*/}
                        {/*>*/}
                        {/*    <i className="fas fa-comment-alt mr-2"></i>*/}
                        {/*    {t("ordersTranslation.suggest_add")}*/}
                        {/*    {t("ordersTranslation.suggest_view")}*/}
                        {/*    <TouchRipple ref={rippleRefs.suggest} center={false}/>*/}
                        {/*</button>*/}
                        {/*{user?.user?.roles[0]?.name === 'super-admin' && (*/}
                            <button
                                onClick={(e) => {
                                    handleClick(e, rippleRefs.view)
                                    navigate('/orders/replies')
                                }}
                                className="relative overflow-hidden rounded bg-[#5E83D4] dark:bg-btnBgDark text-white py-2 px-3"
                            >
                                <i className="fas fa-eye mr-2"></i> {t("ordersTranslation.suggests_view")}
                                <TouchRipple ref={rippleRefs.view} center={false}/>
                            </button>
                        {/*)}*/}

                        <button
                            onClick={(e) => {
                                handleClick(e, rippleRefs.search)
                                showSearchFunc()
                            }}
                            className="relative overflow-hidden rounded bg-blue dark:bg-btnBgDark text-white py-2 px-3"
                        >
                            {t("ordersTranslation.search_show")} <i className="fa-solid fa-angle-right"></i>
                            <TouchRipple ref={rippleRefs.search} center={false}/>
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={` ${showSearch === 'true' ? 'max-h-96' : 'max-h-0'} transition-all w-[90%] mx-auto mb-4  duration-500 ease-in-out  bg-white dark:bg-darkBgTwo rounded-lg center overflow-hidden `}>
                <div className={"w-full overflow-hidden p-4 grid grid-cols-5 gap-5 dark:bg-darkBgTwo"}>
                    <div>
                        <InputMUI
                            value={filters.search}
                            onChange={(e) => setFilters({...filters, search: e.target.value})}
                            variant="outlined"
                            label={t("ordersTranslation.filters.order_id_or_cargo")}
                        />
                    </div>
                    <div>
                        <SelectMUI
                            onChange={(val) => setFilters({...filters, db: val.value})}
                            options={company}
                            variant="outlined"
                            label={t("ordersTranslation.filters.select_company")}
                            value={company.find((obj) => obj.value === filters.db)}
                            placeholder={t("ordersTranslation.filters.select_company")}
                        />
                    </div>
                    <div className="relative">
                        <MyCalendar
                            value={filters.from_date}
                            onChange={(val) => setFilters({...filters, from_date: val})}
                        />
                        <p className="absolute text-[12px] pt-1 px-1 font-medium -top-[14px] left-2 text-[#3B82F6] dark:text-darkText bg-white dark:bg-darkBgTwo">
                            {t("ordersTranslation.filters.arrival_time")}
                        </p>
                    </div>
                    <div className="relative">
                        <MyCalendar
                            value={filters.to_date}
                            onChange={(val) => setFilters({...filters, to_date: val})}
                        />
                        <p className="absolute text-[12px] pt-1 px-1 font-medium -top-[14px] left-2 text-[#3B82F6] dark:text-darkText bg-white dark:bg-darkBgTwo">
                            {t("ordersTranslation.filters.departure_time")}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            findOrders({
                                filters: {
                                    search: "",
                                    search_status: null,
                                    db: "",
                                    from_date: "",
                                    to_date: ""
                                },
                                pageqq
                            })
                            setActiveStatus("")
                            setFilters({
                                search: "",
                                search_status: null,
                                db: "",
                                from_date: "",
                                to_date: ""
                            })
                        }}
                        className="w-full relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out hover:text-white hover:bg-blue py-1 px-2 dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText"
                    >
                        {t("ordersTranslation.filters.clear_input")}
                    </button>

                    <div className="mx-auto col-span-full center gap-5">
                        <button
                            onClick={() => {
                                showSearchFunc()
                            }}
                            className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out hover:text-white hover:bg-blue py-2 px-3 dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText"
                        >
                            {t("ordersTranslation.filters.close")}
                        </button>
                        <button
                            onClick={() => findOrders(filters, pageqq)}
                            className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out hover:text-white hover:bg-blue py-2 px-3 dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText"
                        >
                            {t("ordersTranslation.filters.search")}
                        </button>
                    </div>
                </div>

            </div>
            <div className={'w-[90%] mx-auto pb-5 grid grid-cols-2 3xl:grid-cols-3 gap-4'}>


                {
                    // loading ? <Loading/> :
                    orders?.orders?.data?.map((order) => (
                        <div>
                            <OrdersCard key={order.id} order={order}/>
                        </div>
                    ))
                }

            </div>
            <div className={'flex items-center justify-end w-[90%] mx-auto pb-5'}>
                <PaginationFooter filters={filters} onClick={findOrders} total={orders}/>
            </div>




            <ExcelModal search={filters} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys}
                        data={exportValues} mode={'order'}/>


        </div>
    );
}

export default Orders;
