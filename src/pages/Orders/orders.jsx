import React, {useEffect, useRef, useState} from 'react';
import {MyCalendar, InputMUI, SelectMUI, OrdersCard} from "../../Components/index.js";
import {OrdersDropDown} from "../../Components/index.js";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import {useNavigate} from "react-router-dom";



function Orders() {
    const [activeStatus, setActiveStatus] = useState("all");
    const [showSearch, setShowSearch] = useState('false');
    const navigate = useNavigate();
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


    useEffect(() => {
        const value = localStorage.getItem("showSearch");
        if (value !== 'true' || value !== 'false') {
            localStorage.setItem('showSearch', 'false');
        }
    }, [])

    const showSearchFunc =()=> {
        const value = localStorage.getItem("showSearch");
        if (value !== 'true'  ) {
            localStorage.setItem('showSearch', 'true');
            setShowSearch('true');
        }else {
            localStorage.setItem('showSearch', 'false');
            setShowSearch('false');
        }
    }


    // Har bir button uchun alohida ref
    const rippleRefs = {
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
                        <OrdersDropDown activeStatus={activeStatus} setActiveStatus={setActiveStatus}/>
                    </div>

                    <div className="flex items-center gap-2">
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
                            onClick={(e) => handleClick(e, rippleRefs.suggest)}
                            className="relative overflow-hidden rounded bg-[#EAB308] text-white py-2 px-3"
                        >
                            <i className="fas fa-comment-alt mr-2"></i>Taklif kiritish
                            <TouchRipple ref={rippleRefs.suggest} center={false}/>
                        </button>

                        <button
                            onClick={(e) => handleClick(e, rippleRefs.view)}
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
                className={` ${ showSearch === 'true' ? 'max-h-96' : 'max-h-0'} transition-all duration-300 ease-in-out w-full   center overflow-hidden`}>
                <div  className={"w-full overflow-hidden p-4   grid grid-cols-4 gap-5 "}>
                    <div className={''}>
                        <InputMUI variant={'outlined'} label={'Order ID yoki Yuk nomi'} />
                    </div>
                    <div className={''}>
                        <SelectMUI variant={'outlined'} label={'Kompaniyani tanlang'}
                                   placeholder={'Kompaniyani tanlang'}/>
                    </div>
                    <div className={'relative'}>
                        <MyCalendar />
                        <p className={'absolute text-[12px] pt-1 px-1 font-medium -top-[14px] left-2 text-[#3B82F6] bg-bacWhite'}>Kelish
                            vaqti</p>

                    </div>
                    <div className={'relative'}>
                        <MyCalendar/>
                        <p className={'absolute text-[12px] pt-1 px-1 font-medium -top-[14px] left-2 text-[#3B82F6] bg-bacWhite'}>Ketish vaqti</p>
                    </div>

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

                            className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out  hover:text-white hover:bg-blue py-2 px-3"
                        >
                            Search

                        </button>
                    </div>


                </div>

            </div>
            <div className={'w-[90%] mx-auto py-5'}>

                <OrdersCard
                    order={sampleOrder}
                    // onEdit={() => console.log("edit")}
                    // onDelete={() => console.log("delete")}
                    // onActDate={() => console.log("act date")}
                />
            </div>
        </div>
    );
}

export default Orders;
