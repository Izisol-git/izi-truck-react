import React, {useEffect, useRef, useState} from 'react';
import { CurrencyInput, InputMUI, LocationInput, MyCalendar, SelectMUI, SwitchMUI} from "../index.js";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    addOrder,
    editOrder, getFilteredOrders,
    getOrdersId, getShowOrders,
    getState,
    getStateTwo,
    ordersSelect
} from "../../features/orders/ordersThunks.js";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import {openOffersModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import {isArray} from "chart.js/helpers";
import {getQueriesAll} from "../../features/Queries/queriesThunks.js";
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";

function OrdersFrom({mode}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [carrierCurrency, setCarrierCurrency] = useState(1);
    const [fraxtCurrency, setFraxtCurrency] = useState(1);
    const [marginCurrency, setMarginCurrency] = useState(1);
    const [itemsPriceCurrency, setItemsPriceCurrency] = useState(1);
    const [ItemsPointPrice, setItemsPointPrice] = useState(1);
    const {loading} = useSelector((state) => state.orders);
    const {id} = useParams();
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        trailer_floor_volume: '',
        cargo_volume: '',
        client_id: {},
        nds: {},
        service_type: {},
        carrier_price_transfer: '',
        fraxt_price_transfer: '',
        margin_transfer: '',
        items_price: '',
        shipment_type: {},
        transport_value: {},
        transport_type: {},
        location_of_departure: "",
        location_of_destination: "",
        country_of_departure: {},
        payment_condition: {},
        point_of_departure: {},
        country_of_destination: {},
        point_of_destination: {},
        customs_clearance1: "",
        mode: "",
        customs_clearance2: "",
        weight_of_cargo: "",
        status_of_cargo: {},
        act_date: "",
        shipment_date: "",
        unload_date: "",
        transportation_time: "",
        type_of_loading: {},
        nature_of_cargo: "",
        palets: "",
        special_conditions: "",
        // points: {},
        point: {},
        sender_contact: "",
        receiver_contact: "",
        carrier_currency_transfer: "",
        fraxt_currency_transfer: "",
        margin_currency_transfer: "",
        items_price_currency: "",
        point_price: "",
        carrier_additional: "",
        tr_number: "",
    });
    const [rows, setRows] = useState([]);
    const [data, setData] = useState();
    const [stateDataOne, setStateDataOne] = useState();
    const [stateDataTwo, setStateDataTwo] = useState();
    const {dbOrders} = useSelector((state) => state.employesModal);
    const [driversName, setDriversName] = useState();
    const {user} = useSelector((state) => state.auth);
    const [errors, setErrors] = useState({});

    const getSelectAll = async () => {
        // if(mode !== "show"){
        const res = await dispatch(ordersSelect())
        setData(res.payload)
        console.log(res.payload)
        // }
    }
    const StateDataOne = async (id) => {
        // if(mode !== "show"){
        const res = await dispatch(getState(id))
        setStateDataOne(res.payload)
        // }
    }
    const StateDataTwo = async (id) => {
        // if (mode !== "show") {
        const res = await dispatch(getStateTwo(id))
        setStateDataTwo(res.payload)
        // }
    }

    const [priceData, setPriceData] = useState();

    const OrdersId = async (id) => {
        try {
            const res = await dispatch(getOrdersId(id)).unwrap();
            setPriceData(res.prices)
            console.log(res.order);
            console.log(res);
            setCarrierCurrency(res?.order?.carrier_currency_transfer)
            setMarginCurrency(res?.order?.margin_currency_transfer)
            setItemsPriceCurrency(res?.order?.items_price_currency)
            setFraxtCurrency(res?.order?.fraxt_currency_transfer)
            const obj = {
                trailer_floor_volume: res?.order?.trailer_floor_volume,
                cargo_volume: res?.order?.cargo_volume,
                mode: res?.order?.mode,
                carrier_currency_transfer: res?.order?.carrier_currency_transfer,
                fraxt_currency_transfer: res?.order?.fraxt_currency_transfer,
                margin_currency_transfer: res?.order?.margin_currency_transfer,
                items_price_currency: res?.order?.items_price_currency,
                country_of_departure: res?.order?.country_of_departure,
                country_of_destination: res?.order?.country_of_destination,
                nds: res?.order?.nds,
                client_id: res?.order?.client_id,
                payment_condition: res?.order?.payment_condition,
                point_of_departure: res?.order?.point_of_departure,
                point_of_destination: res?.order?.point_of_destination,
                service_type: res?.order?.service_type,
                shipment_type: res?.order?.shipment_type,
                status_of_cargo: res?.order?.status_of_cargo,
                transport_type: res?.order?.transport_type,
                transport_value: res?.order?.transport_value,
                type_of_loading: res?.order?.type_of_loading,
                point: Number(res?.order?.customs),
                point_price: Number(res?.order?.customs_price),
                carrier_price_transfer: res?.order?.carrier_price_transfer,
                fraxt_price_transfer: res?.order?.fraxt_price_transfer,
                margin_transfer: res?.order?.margin_transfer,
                items_price: Number(res?.order?.items_price),
                // location_of_destination: (String(res?.order?.location_of_destination[0]) + ' , ' + String(res?.order?.location_of_destination[1])),
                // location_of_departure: (String(res?.order?.location_of_departure[0] + " , " + res?.order?.location_of_departure[1])),
                location_of_destination: res?.order?.location_of_destination,
                location_of_departure: res?.order?.location_of_departure,
                // location_of_departure: res?.order?.location_of_departure?.split(",").map(n => parseFloat(n.trim())),
                customs_clearance1: res?.order?.customs_clearance1,
                customs_clearance2: res?.order?.customs_clearance2,
                weight_of_cargo: res?.order?.weight_of_cargo,
                act_date: res?.order?.act_date,
                shipment_date: res?.order?.shipment_date,
                unload_date: res?.order?.unload_date,
                transportation_time: res?.order?.transportation_time,
                nature_of_cargo: res?.order?.nature_of_cargo,
                palets: res?.order?.palets,
                special_conditions: res?.order?.special_conditions,
                sender_contact: res?.order?.sender_contact,
                receiver_contact: res?.order?.receiver_contact,
                carrier_additional: res?.order?.carrier_additional,
                tr_number: res?.order?.tr_number,
            }
            // console.log(obj.client_id);
            setFormData(obj)
            console.log(obj)
            // console.log(res?.order?.act_date)
            // console.log(res?.order)
        } catch (error) {
            console.log(error);
        }
    };

    const EditOrder = async (id, formData) => {
        // console.log(rows);
        rows.forEach((row, index) => {
            if (row.point && row.point.id) formData[`point[${index}]`] = row.point.id;
            if (row.point_price) formData[`point_price[${index}]`] = row.point_price;
        });
        // console.log(formData);
        setFormData({...rows})
        // setFormData({
        //     location_of_destination: '',
        //     location_of_departure: '' ,
        // })
        setFormData({
            ...formData,
        })

        try {
            const res = await dispatch(editOrder({id: id, editData: formData})).unwrap();
            navigate("/orders")
            try {
                const res2 = await dispatch(getFilteredOrders({
                    pageqq: 1, search: {
                        search: "",
                        search_status: null,
                        db: "",
                        from_date: "",
                        to_date: "",
                    }
                })).unwrap()
                // console.log(res2)
            } catch (error) {
                console.error(error)
            }
            // console.log(res)
        } catch (error) {
            console.log(error);
            setErrors(error.errors);
        }
    }
    const runCount = useRef(0);
    useEffect(() => {
        if (
            runCount.current < 3
        ) {
            StateDataOne(Number(formData.country_of_departure));
            StateDataTwo(Number(formData.country_of_destination));
            runCount.current += 1;         // har ishlaganda +1
        }
    }, [formData, mode]);



    useEffect(() => {
        getSelectAll()
        if (mode === 'edit' && formData.nds) {
            OrdersId(id)
        }
        if (mode === 'show') {
            getShowOrdersId()
        }

    }, [])

    const newRows = rows.map((row, i) => ({
        [`point[${i + 1}]`]: row.point.id,
        [`point_price[${i + 1}]`]: row.point_price
    }));



    const addOrders = async () => {
        // console.log(formData)
        const obj = {
            // ...formData,
            trailer_floor_volume: formData.trailer_floor_volume,
            cargo_volume: formData.cargo_volume,
            carrier_currency_transfer: carrierCurrency,
            fraxt_currency_transfer: fraxtCurrency,
            margin_currency_transfer: marginCurrency,
            items_price_currency: itemsPriceCurrency,
            // point_price: ItemsPointPrice ,
            client_id: formData.client_id.id,
            country_of_departure: formData.country_of_departure.id,
            country_of_destination: formData.country_of_destination.id,
            nds: formData.nds.value,
            mode: formData.mode,
            payment_condition: formData.payment_condition.value,
            point_of_departure: formData.point_of_departure.id,
            point_of_destination: formData.point_of_destination.id,
            service_type: formData.service_type.id,
            shipment_type: formData.shipment_type.id,
            status_of_cargo: formData.status_of_cargo.id,
            transport_type: formData.transport_type.id,
            transport_value: formData.transport_value.title,
            type_of_loading: formData.type_of_loading.title,
            point: formData.point.id,
            point_price: Number(formData.point_price),
            carrier_price_transfer: formData.carrier_price_transfer,
            fraxt_price_transfer: formData.fraxt_price_transfer,
            margin_transfer: formData.margin_transfer,
            items_price: Number(formData.items_price),
            location_of_destination: formData.location_of_destination,
            // ? String(formData.location_of_destination[0]) + "," + String(formData.location_of_destination[1])
            // : null,
            location_of_departure: formData.location_of_departure,
            // ? String(formData.location_of_departure[0]) + "," + String(formData.location_of_departure[1])
            // : null,
            customs_clearance1: formData.customs_clearance1,
            customs_clearance2: formData.customs_clearance2,
            weight_of_cargo: formData.weight_of_cargo,
            act_date: formData.act_date,
            shipment_date: formData.shipment_date,
            unload_date: formData.unload_date,
            transportation_time: formData.transportation_time,
            nature_of_cargo: formData.nature_of_cargo,
            palets: formData.palets,
            special_conditions: formData.special_conditions,
            sender_contact: formData.sender_contact,
            receiver_contact: formData.receiver_contact,
            tr_number: formData.tr_number,
            carrier_additional:formData.carrier_additional,
        }
        rows.forEach((row, index) => {
            if (row.point && row.point.id) obj[`point[${index}]`] = row.point.id;
            if (row.point_price) obj[`point_price[${index}]`] = row.point_price;
        });
        // setFormData({...rows})
        // console.log(formData)

        try {
            const res = await dispatch(addOrder(obj)).unwrap()
            navigate("/orders")
            try {
                const res2 = await dispatch(getFilteredOrders({
                    pageqq: 1, search: {
                        search: "",
                        search_status: 2,
                        db: "",
                        from_date: "",
                        to_date: "",
                    }
                })).unwrap()
                // console.log(res2)
            } catch (error) {
                console.error(error)
            }

        } catch (err) {
            console.log(err.errors);
            setErrors({...err.errors});
        }
    }
    // console.log(errors)


    const getShowOrdersId = async () => {
        try {
            const res = await dispatch(getShowOrders({id: id, db: localStorage.getItem('dbOrders')})).unwrap();
            console.log(res)
            setFormData(res.order)
            setDriversName(res.driver.fio)
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(formData)

    const nds = [
        {title: "без ндс", value: 'without_nds'},
        {title: "0% ндс", value: 'nds0'},
        {title: "12% ндс", value: 'nds15'},
    ];
    const dangerous = [
        {id: 0, title: "Yo'q"},
        {id: 1, title: "Ha"},
    ];

    const typeService = [
        {id: 1, title: "LTL"},
        {id: 2, title: "FTL"},
        {id: 3, title: "LCL"},
        {id: 4, title: "FCL"},
        {id: 5, title: "AVIA"},
        {id: 6, title: "FTLS"},
    ]
    const typeLoading = [
        {title: "Задняя"},
        {title: "Боковая"},
        {title: "Верхняя"},
        {title: "Растентовка"},

    ]

    const options = [
        {title: '1'},
    ];
    const typePayment = [
        {value: 1, title: "Перечисления"},
        {value: 2, title: "Нақд"},
        {value: 3, title: "Ярим перечисления"},
    ];

    const handleAdd = () => {
        setRows([...rows, {id: Date.now(), point: '', point_price: "", value: ''}]);
    };

    const handleRemove = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

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
    const [activeRadio, setActiveRadio] = useState(
        Number(localStorage.getItem("statusListOrders")) || 0
    );

    const statusList = [
        {label: t("ordersTranslation.driver_assigned"), value: 4},
        {label: t("ordersTranslation.completed"), value: 6},
    ];

    const handleRadioChange = (value) => {
        localStorage.setItem("statusListOrders", value);
        setActiveRadio(value);
    };
    return (

        <div>
            <div className={'bg-bacWhite w-full min-h-[calc(100dvh-70px)] py-5 dark:bg-darkBg'}>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow dark:bg-darkBgTwo'}>
                    <div className={'h-[40px] gap-4 relative text-center center  w-full   mb-10'}>
                        <div className={'w-max  absolute top-0 left-0'} >
                            <Button
                                onClick={() => navigate(`/orders`)}
                                sx={{
                                    background : '#1D2D5B',
                                    '.dark &':{
                                        background : '#2B4764',
                                    }
                                }}
                                color={'info'}
                                variant={'contained'}>
                                <i className="fa-solid fa-right-from-bracket mr-2"></i>
                                {t('ordersTranslation.back_to_orders')}
                            </Button>
                        </div>
                        <p className={'text-blue font-bold text-xl dark:text-darkText'}> {mode === 'edit' ? `${t('ordersTranslation.edit_order')}` : mode === 'add' ? `${t('ordersTranslation.ordersCreate')}` : mode === "show" ? `${t("ordersTranslation.order_details")}` : ''}</p>
                        {
                            mode === 'show' ?
                                <div className={'absolute top-0 right-0 flex items-center gap-3'}>
                                    <button
                                        onClick={(e) => {
                                            handleClick(e, rippleRefs.add)
                                            navigate(`/orders/${id}/didox`)
                                        }}
                                        className="relative overflow-hidden rounded bg-[#A855F7] text-white py-2 px-3"
                                    >
                                        <i className="fas fa-plus mr-2"></i>DIDOX
                                        <TouchRipple ref={rippleRefs.add} center={false}/>
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            handleClick(e, rippleRefs.suggest)
                                        }}
                                        className="relative overflow-hidden rounded bg-red-500 text-white py-2 px-3"
                                    >
                                        <i className="fa-solid fa-ban mr-2"></i>{t("ordersTranslation.cancel")}
                                        <TouchRipple ref={rippleRefs.suggest} center={false}/>
                                    </button>
                                </div>
                                :
                                ""
                        }
                    </div>
                    {
                        mode === 'show' ?
                            <>
                                <div className={'mb-10'}>
                                    <FormControl>
                                        <RadioGroup row>
                                            <div className="flex flex-wrap gap-2 text-blue dark:text-darkText">
                                                {statusList.map((item) => (
                                                    <button
                                                        key={item.value}
                                                        onClick={() => handleRadioChange(item.value)}
                                                        style={{position: "relative", overflow: "hidden"}}
                                                        className={`border-2 px-3 rounded-lg cursor-pointer text-[14px] ${
                                                            activeRadio === item.value ? "bg-gray-200 dark:bg-navBgHover" : ""
                                                        }`}
                                                    >
                                                        <FormControlLabel
                                                            value={item.label}
                                                            control={
                                                                <Radio
                                                                    sx={{
                                                                        color: "#1D2D5B", // light mode
                                                                        "&.Mui-checked": {color: "#1D2D5B"},

                                                                        // dark mode
                                                                        "@media (prefers-color-scheme: dark)": {
                                                                            color: "#fff",
                                                                            "&.Mui-checked": {color: "#fff"},
                                                                        },
                                                                    }}
                                                                    checked={activeRadio === item.value}
                                                                />
                                                            }
                                                            label={item.label}
                                                        />
                                                        <TouchRipple ref={null} center={false}/>
                                                    </button>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </div>


                            </>
                            : ""
                    }

                    <div className={'  grid grid-cols-2 gap-4'}>
                        <div className={"w-full "}>
                            <SelectMUI

                                errorMassage={errors?.client_id}
                                {...{
                                    value:
                                        mode !== "add"
                                            ? data?.clients?.find((opt) => opt.id === formData?.client_id) || null
                                            : formData?.client_id,
                                }}
                                onChange={(val) => {
                                    mode !== "add" ? setFormData({
                                        ...formData,
                                        client_id: val.id
                                    }) : setFormData({...formData, client_id: val})
                                }}
                                options={data?.clients || []}
                                variant={'outlined'}
                                label={t('queriesTranslation.client')}
                                placeholder={t('queriesTranslation.client')}
                            />
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI
                                errorMassage={errors?.nds}
                                {...{
                                    value:
                                        mode !== "add"
                                            ? nds.find((opt) => opt.value === formData?.nds) || null
                                            : formData?.nds,
                                }}
                                onChange={(val) => {
                                    mode !== "add" ? setFormData({
                                        ...formData,
                                        nds: val.value
                                    }) : setFormData({...formData, nds: val})
                                }}

                                options={nds}
                                variant={'outlined'}
                                label={t('queriesTranslation.nds')}
                                placeholder={t('queriesTranslation.nds')}/>
                        </div>
                        <div className={" w-full "}>

                            <CurrencyInput errorMassage={errors?.fraxt_price_transfer}
                                           value={formData.fraxt_price_transfer ?? ''}
                                           setCarrierCurrency={setFraxtCurrency}
                                           carrierCurrency={fraxtCurrency}
                                           onChange={(e) => setFormData({
                                               ...formData,
                                               fraxt_price_transfer: e.target.value
                                           })} label={t('queriesTranslation.client_price')}/>
                        </div>
                        <div className={"w-full  "}>
                            <SelectMUI errorMassage={errors?.transport_type} options={data?.transport_types || []}
                                       variant={'outlined'}
                                       label={t('queriesTranslation.transport_type')}
                                       placeholder={t('queriesTranslation.transport_type')}

                                       {...{
                                           value:
                                               mode !== "add"
                                                   ? data?.transport_types?.find((opt) => opt.id === formData?.transport_type) || null
                                                   : formData?.transport_type,
                                       }}
                                       onChange={(val) => {
                                           mode !== "add" ? setFormData({
                                               ...formData,
                                               transport_type: val.id
                                           }) : setFormData({...formData, transport_type: val})
                                       }}
                            />


                        </div>
                        <div className={''}>
                            {
                                String(formData?.transport_type?.id) === '3' || String(formData?.transport_type) === '3' ? <>
                                    <InputMUI errorMassage={errors?.mode}
                                              value={formData?.mode ?? ''}
                                              onChange={(e) =>
                                                  setFormData({...formData, mode: e.target.value})
                                              }
                                              variant={'outlined'} label={t('queriesTranslation.mode')}
                                    /></> : ''
                            }
                        </div>

                    </div>

                </div>


                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5 dark:bg-darkBgTwo'}>
                    <div className={'grid grid-cols-4 gap-4'}>
                        <div className={" col-span-2"}>
                            <LocationInput
                                value={formData?.location_of_departure || null}
                                onChange={(pos) => setFormData({...formData, location_of_departure: pos.join(',')})}
                                label={t('queriesTranslation.location_of_departure')}/>
                        </div>
                        <div className={"  col-span-2"}>
                            <LocationInput
                                value={formData?.location_of_destination || null}

                                onChange={(pos) => setFormData({...formData, location_of_destination: pos.join(',')})}
                                label={t('queriesTranslation.location_of_destination')}/>
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI errorMassage={errors?.country_of_departure} options={data?.countries || []}
                                       variant={'outlined'} label={t('queriesTranslation.country_of_departure')}
                                       placeholder={t('queriesTranslation.country_of_departure')}
                                       {...{
                                           value:
                                               mode !== "add"
                                                   ? data?.countries?.find((opt) => String(opt.id) === formData?.country_of_departure) || null
                                                   : formData?.country_of_departure,
                                       }}
                                       onChange={(val) => {
                                           if (mode !== "add") {
                                               setFormData({
                                                   ...formData,
                                                   country_of_departure: val?.id,
                                               });
                                           } else {
                                               setFormData({
                                                   ...formData,
                                                   country_of_departure: val,
                                               });
                                           }
                                           StateDataOne(val?.id);

                                       }}
                            />
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI errorMassage={errors?.point_of_departure}
                                       options={stateDataOne?.cities_from || []} variant={'outlined'}
                                       label={t('queriesTranslation.point_of_departure')}
                                       placeholder={t('queriesTranslation.point_of_departure')}
                                       {...{
                                           value:
                                               mode !== "add"
                                                   ? stateDataOne?.cities_from?.find((opt) => String(opt.id) === formData?.point_of_departure) || null
                                                   : formData?.point_of_departure,
                                       }}
                                       onChange={(val) => {
                                           if (mode !== "add") {
                                               setFormData({
                                                   ...formData,
                                                   point_of_departure: val?.id,
                                               });
                                           } else {
                                               setFormData({
                                                   ...formData,
                                                   point_of_departure: val,
                                               });
                                           }
                                       }}
                            />
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI errorMassage={errors?.country_of_destination} options={data?.countries || []}
                                       variant={'outlined'} label={t('queriesTranslation.country_of_destination')}
                                       placeholder={t('queriesTranslation.country_of_destination')}

                                       {...{
                                           value:
                                               mode !== "add"
                                                   ? data?.countries?.find((opt) => String(opt.id) === formData?.country_of_destination) || null
                                                   : formData?.country_of_destination,
                                       }}
                                       onChange={(val) => {
                                           if (mode !== "add") {
                                               setFormData({
                                                   ...formData,
                                                   country_of_destination: val?.id,
                                               });
                                           } else {
                                               setFormData({
                                                   ...formData,
                                                   country_of_destination: val,
                                               });
                                           }
                                           StateDataTwo(val?.id)

                                       }}
                            />
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI errorMassage={errors?.point_of_destination}
                                       options={stateDataTwo?.cities_to || []} variant={'outlined'}
                                       label={t('queriesTranslation.point_of_destination')}
                                       placeholder={t('queriesTranslation.point_of_destination')}
                                       {...{
                                           value:
                                               mode !== "add"
                                                   ? stateDataTwo?.cities_to?.find((opt) => String(opt.id) === formData?.point_of_destination) || null
                                                   : formData?.point_of_destination,
                                       }}
                                       onChange={(val) => {
                                           if (mode !== "add") {
                                               setFormData({
                                                   ...formData,
                                                   point_of_destination: val?.id,
                                               });
                                           } else {
                                               setFormData({
                                                   ...formData,
                                                   point_of_destination: val,
                                               });
                                           }

                                       }}
                            />
                        </div>
                    </div>
                </div>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5 dark:bg-darkBgTwo'}>
                    <div className={'grid grid-cols-4 gap-4'}>
                        <div className={" col-span-2"}>
                            <InputMUI type={'number'} errorMassage={errors?.weight_of_cargo}
                                      value={formData?.weight_of_cargo ?? ''}

                                      onChange={(e) =>
                                          setFormData({...formData, weight_of_cargo: e.target.value})
                                      }
                                      variant={'outlined'} label={t('queriesTranslation.weight_of_cargo')}
                            />
                        </div>
                        <div className={"  col-span-2"}>
                            <SelectMUI errorMassage={errors?.status_of_cargo} options={dangerous} variant={'outlined'}
                                       label={t('queriesTranslation.status_of_cargo')}
                                       placeholder={t('queriesTranslation.status_of_cargo')}
                                       {...{
                                           value:
                                               mode !== "add"
                                                   ? dangerous.find((opt) => opt.id === formData?.status_of_cargo) || null
                                                   : formData?.status_of_cargo,
                                       }}
                                       onChange={(val) => {
                                           mode !== "add" ? setFormData({
                                               ...formData,
                                               status_of_cargo: val.id
                                           }) : setFormData({...formData, status_of_cargo: val})
                                       }}
                            />
                        </div>

                        <div className={"w-full "}>
                            <div className={'relative'}>
                                <MyCalendar
                                    label={t('queriesTranslation.shipment_date')}
                                    errorMassage={errors?.shipment_date}
                                    value={formData?.shipment_date ?? ''} // misol uchun yangi property
                                    onChange={(val) => setFormData({...formData, shipment_date: val})}/>
                                {/*<p className={`absolute text-[12px] pt-1 px-1 font-medium -top-[14px] left-2 text-[#3B82F6] ${errors?.shipment_date ? 'text-red-500' : 'text-[#3B82F6]'} dark:text-darkText bg-white dark:bg-darkBgTwo`}>*/}
                                {/*    Дата погрузки</p>*/}
                                {
                                    errors?.shipment_date ?
                                        <p className={'text-[#d32f2f] text-[12px] mt-1 ml-2'}>{errors?.shipment_date[0]}</p> : ''
                                }
                            </div>

                        </div>
                        <div className={"w-full "}>
                            <div className={'relative'}>
                                <MyCalendar
                                    label={t('queriesTranslation.unload_date')}

                                    errorMassage={errors?.unload_date}
                                    value={formData?.unload_date ?? ''} // misol uchun yangi property
                                    onChange={(val) => setFormData({...formData, unload_date: val})}/>
                                {/*<p className={`absolute text-[12px] pt-1 px-1 font-medium -top-[14px] left-2   ${errors?.unload_date ? 'text-red-500' : 'text-[#3B82F6]'} dark:text-darkText bg-white dark:bg-darkBgTwo`}>*/}
                                {/*    Дата разгрузки</p>*/}

                                {
                                    errors?.unload_date ?
                                        <p className={'text-[#d32f2f] text-[12px] mt-1 ml-2'}>{errors?.unload_date[0]}</p> : ''
                                }

                            </div>

                        </div>
                        <div className={"col-span-2"}>
                            <InputMUI errorMassage={errors?.nature_of_cargo} value={formData?.nature_of_cargo ?? ''}
                                      onChange={(e) =>
                                          setFormData({...formData, nature_of_cargo: e.target.value})
                                      }
                                      variant={'outlined'} label={t('queriesTranslation.nature_of_cargo')}
                            />
                        </div>

                    </div>
                </div>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5 dark:bg-darkBgTwo'}>
                    <div className={'grid grid-cols-3 gap-4'}>
                        <div className={" "}>
                            <SelectMUI errorMassage={errors?.payment_condition} options={typePayment}
                                       variant={'outlined'} label={t('queriesTranslation.payment_condition')}
                                       placeholder={t('queriesTranslation.payment_condition')}

                                       {...{
                                           value:
                                               mode !== "add"
                                                   ? typePayment.find((opt) => opt.value === Number(formData?.payment_condition)) || null
                                                   : formData?.payment_condition,
                                       }}
                                       onChange={(val) => {
                                           mode !== "add" ? setFormData({
                                               ...formData,
                                               payment_condition: val.value
                                           }) : setFormData({...formData, payment_condition: val})
                                       }}
                            />


                        </div>
                        <div className={""}>
                            <InputMUI errorMassage={errors?.sender_contact} value={formData?.sender_contact ?? ''}
                                      onChange={(e) =>
                                          setFormData({...formData, sender_contact: e.target.value})
                                      }
                                      variant={'outlined'} label={t('queriesTranslation.sender_contact')}
                            />
                        </div>
                        <div className={""}>
                            <InputMUI errorMassage={errors?.receiver_contact} value={formData?.receiver_contact ?? ''}
                                      onChange={(e) =>
                                          setFormData({...formData, receiver_contact: e.target.value})
                                      } variant={'outlined'} label={t('queriesTranslation.receiver_contact')}
                            />
                        </div>
                    </div>
                    <div className={'grid grid-cols-3 gap-4 mt-5'}>

                        <div className={""}>
                            <InputMUI type={'number'} errorMassage={errors?.tr_number} value={formData?.tr_number ?? ''}
                                      onChange={(e) =>
                                          setFormData({...formData, tr_number: e.target.value})
                                      } variant={'outlined'} label={t('queriesTranslation.tr_number')}
                            />
                        </div>
                        <div className={""}>
                            <InputMUI errorMassage={errors?.carrier_additional} value={formData?.carrier_additional ?? ''}
                                      onChange={(e) =>
                                          setFormData({...formData, carrier_additional: e.target.value})
                                      }
                                      variant={'outlined'} label={t('queriesTranslation.carrier_additional')}
                            />
                        </div>
                        <div className={" "}>
                            {
                                mode !== 'show' ? <div className={'w-full flex items-center justify-end gap-4'}>
                                    <button
                                        onClick={() => {
                                            navigate('/orders');
                                        }}
                                        className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out  hover:text-white hover:bg-blue py-2 px-3 dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText"
                                    >
                                        {t('queriesTranslation.close')}
                                    </button>
                                    <button onClick={() => {
                                        if (mode === "add") {
                                            addOrders()
                                        }
                                        if (mode === "edit") {
                                            EditOrder(id, formData)
                                        }
                                    }}
                                            className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out  hover:text-white hover:bg-blue py-2 px-3 dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText"
                                    >
                                        {loading ? `${t('queriesTranslation.add')}...` : t('queriesTranslation.add')}
                                    </button>
                                </div> : ""
                            }
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default OrdersFrom;