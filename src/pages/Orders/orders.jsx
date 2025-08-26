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
import {openExcelModal, openOffersModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {getFilteredOrders} from "../../features/orders/ordersThunks.js";
import {getSuggestions} from "../../features/suggestions/suggestionsThunks.js";
import ExcelModal from "../../Components/Modal/excelModal.jsx";


function Orders() {
    const {user} = useSelector((state) => state.auth);
    const [activeStatus, setActiveStatus] = useState(null);
    const [showSearch, setShowSearch] = useState('false');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [suggestions, setSuggestions] = useState();
    const [open, setOpen] = useState(false)
    const sampleOrder = {
        sales: "NURULLAEVA HILOLA KAHRAMONOVNA",
        operation: "XASANOV FARXOD TAXIROVICH",
        client: "OOO «TOPFIN RESULT»",
        polCity: "Анкара",
        etd: "14.08.2025",
        id: "2508130022",
        podCity: "Навои",
        createdAt: "13.08.2025",
        status: "new",
        actDate: "-",
        compensation: "78 000 000 UZS",
        reward: "500 000 UZS",
        freight: "78 500 000 UZS",
        insurance: "0 UZS",
        carrier: "-",
        carNumber: "-",
        trailerNumber: "-",
        cargoName: "трубы",
        vat: "0",
        carrierIdle: "0 UZS",
        clientInn: "302097527",
        clientIdle: "0 UZS",
        carrierInn: "-",
        mode: "0",
        serviceType: "FTL",
        transportType: "Автоперевозка",
    };


    // console.log(window.location.protocol.toLowerCase())
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;
    const [total, setTotal] = useState();
    const [ordersId, setOrdersId] = useState();
    const [ordersData, setOrdersData] = useState();
    const {loading} = useSelector((state) => state.orders);


    const company = [
        {label: 'EGS', value: 'egs'},
        {label: 'INCOTRUCK', value: 'incotruck'},
        {label: 'EASTLINE EXPRESS', value: 'eastline'},
        {label: 'TRANSEKA', value: 'transceka'},
    ];
    const [filters, setFilters] = useState({
        search: "",
        search_status: null,
        db: "",
        from_date: "",
        to_date: "",
    });

    const getSuggestion = async () => {
        try {
            const res = await dispatch(getSuggestions()).unwrap()
            setSuggestions(res)
            console.log(res)
        } catch (err) {
            console.log(err);
        }
    }

    const findOrders = async (filters, pageqq) => {
        const res = await dispatch(getFilteredOrders({filters: filters, pageqq: pageqq})).unwrap()
        setOrdersData(res.orders.data)
        setTotal(res)
    }


    useEffect(() => {
        findOrders()
        console.log(ordersData)
    }, [pageqq, dispatch]);


    // useEffect(() => {
    //     const fetchOrders = async () => {
    //         try {
    //             const result = await dispatch(getOrders(pageqq)).unwrap(); // unwrap() bilan payload to'g'ridan-to'g'ri olinadi
    //             setOrdersData(result.orders.data); // agar API data obj ichida bo'lsa
    //             setTotal(result );     // agar API total miqdorni bersa
    //             console.log(result.orders.data);
    //         } catch (err) {
    //             console.error("Failed to fetch orders:", err);
    //         }
    //     };
    //
    //     fetchOrders();
    // }, [pageqq, dispatch]);


    useEffect(() => {
        const ports = [64646, 64443];
        ports.forEach((port) => {
            const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
            const ws = new WebSocket(`${wsProtocol}://127.0.0.1:${port}/service/cryptapi`);

            ws.onopen = () => {
                console.log(`E-imzo agent ishlayapti: port ${port}`);
                ws.close();
            };

            ws.onerror = () => {
                console.log(`Port ${port} javob bermadi`);
            };
        });
    }, []);


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


    // Har bir button uchun alohida ref
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


    return (
        <div className={'bg-bacWhite'}>
            <div className=" w-[90%] mx-auto py-5">
                <div className={'flex items-center justify-between'}>
                    <div className="flex items-center gap-2">
                        <OrdersDropDown pageqq={pageqq} onClick={findOrders} filters={filters} setFilters={setFilters}
                                        activeStatus={activeStatus}
                                        setActiveStatus={setActiveStatus}/>
                    </div>


                    <div className="flex items-center gap-2">
                        {/*<div className="flex items-center ">*/}
                        {/*    <img className={'w-8 h-8 cursor-pointer'} src="../../../public/xls.png" alt="excel"/>*/}
                        {/*</div>*/}
                        <button
                            onClick={(e) => {
                                handleClick(e, rippleRefs.xls)
                                dispatch(openExcelModal())
                            }}
                            className="relative overflow-hidden rounded bg-green-500 text-white py-2 px-3"
                        >
                            <i className="fa-solid fa-table mr-2"></i> excel

                            <TouchRipple ref={rippleRefs.xls} center={false}/>
                        </button>
                        <button
                            onClick={(e) => {
                                handleClick(e, rippleRefs.add)
                                navigate('/orders/create')
                            }}
                            className="relative overflow-hidden rounded bg-[#A855F7] text-white py-2 px-3"
                        >
                            <i className="fas fa-plus mr-2"></i>Qo‘shish
                            <TouchRipple ref={rippleRefs.add} center={false}/>
                        </button>

                        <button
                            onClick={(e) => {
                                handleClick(e, rippleRefs.suggest)
                                dispatch(openOffersModal())
                                getSuggestion()
                            }}
                            className="relative overflow-hidden rounded bg-[#EAB308] text-white py-2 px-3"
                        >
                            <i className="fas fa-comment-alt mr-2"></i>Taklif kiritish
                            <TouchRipple ref={rippleRefs.suggest} center={false}/>
                        </button>

                        <button
                            onClick={(e) => {
                                handleClick(e, rippleRefs.view)
                                navigate('/orders/replies')
                            }}
                            className="relative overflow-hidden rounded bg-[#5E83D4] text-white py-2 px-3"
                        >
                            <i className="fas fa-eye mr-2"></i> Takliflarni ko‘rish
                            <TouchRipple ref={rippleRefs.view} center={false}/>
                        </button>

                        <button
                            onClick={(e) => {
                                handleClick(e, rippleRefs.search)
                                showSearchFunc()
                            }}
                            className="relative overflow-hidden rounded bg-blue text-white py-2 px-3"
                        >
                            show search button <i className="fa-solid fa-angle-right"></i>
                            <TouchRipple ref={rippleRefs.search} center={false}/>
                        </button>

                    </div>
                </div>
            </div>
            <div
                className={` ${showSearch === 'true' ? 'max-h-96' : 'max-h-0'} transition-all w-[90%] mx-auto duration-500 ease-in-out  bg-white rounded-lg center overflow-hidden`}>
                <div className={"w-full overflow-hidden p-4   grid grid-cols-5 gap-5 "}>
                    <div className={''}>
                        <InputMUI value={filters.search}
                                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                                  variant={'outlined'} label={'Order ID yoki Yuk nomi'}/>
                    </div>
                    <div className={''}>
                        <SelectMUI
                            onChange={(val) => setFilters({...filters, db: val.value})}
                            options={company} variant={'outlined'} label={'Kompaniyani tanlang'}
                            value={company.find((obj) => obj.value === filters.db)}
                            placeholder={'Kompaniyani tanlang'}/>
                    </div>
                    <div className={'relative'}>
                        <MyCalendar value={filters.from_date}
                                    onChange={(val) => setFilters({...filters, from_date: val})}

                            // value={formData?.act_date}
                            // onChange={(val) => setFormData({...formData, act_date: val})}
                        />

                        <p className={'absolute text-[12px] pt-1 px-1 font-medium -top-[14px] left-2 text-[#3B82F6] bg-white'}>Kelish
                            vaqti</p>

                    </div>
                    <div className={'relative'}>
                        <MyCalendar value={filters.to_date}
                                    onChange={(val) => setFilters({...filters, to_date: val})}/>
                        <p className={'absolute text-[12px] pt-1 px-1 font-medium -top-[14px] left-2 text-[#3B82F6] bg-white'}>Ketish
                            vaqti</p>
                    </div>
                    <button
                            onClick={()=>setFilters({
                                search: "",
                                search_status: null,
                                db: "",
                                from_date: "",
                                to_date: "",
                            })}
                        className="w-full relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue   transition-all duration-300 ease-in-out  hover:text-white hover:bg-blue py-1 px-2"
                    >
                        Clear input

                    </button>

                    <div className={'mx-auto col-span-full center gap-5'}>
                        <button
                            onClick={() => {
                                showSearchFunc()
                            }}
                            className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out  hover:text-white hover:bg-blue py-2 px-3"
                        >
                            Close

                        </button>
                        <button
                            onClick={() => findOrders(filters, pageqq)}

                            className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out  hover:text-white hover:bg-blue py-2 px-3"
                        >
                            Search

                        </button>
                    </div>


                </div>

            </div>
            <div className={'w-[90%] mx-auto pb-5'}>

                {
                    loading ? <Loading/> :
                        ordersData?.map((order) => (
                            <>
                                <OrdersCard key={order.id} order={order}/>
                            </>
                        ))
                }

                <div className={'flex items-center justify-end'}>
                    <PaginationFooter total={total}/>
                </div>
            </div>


            {
                user?.user?.roles[0]?.name === 'super-admin' ? <OffersOrders/> :
                    <OffersOrdersCarrier setSuggestions={setSuggestions} suggestions={suggestions}/>
            }


            <ExcelModal/>


        </div>
    );
}

export default Orders;
