import React, {useEffect, useRef, useState} from 'react';
import {Button, CurrencyInput, InputMUI, LocationInput, MyCalendar, SelectMUI, SwitchMUI} from "../index.js";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    addOrder,
    editOrder,
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

    const [formData, setFormData] = useState({
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
    });
    const [rows, setRows] = useState([]);
    const [data, setData] = useState();
    const [stateDataOne, setStateDataOne] = useState();
    const [stateDataTwo, setStateDataTwo] = useState();
    const {dbOrders} = useSelector((state) => state.employesModal);
    const [driversName, setDriversName] = useState();
    const {user} = useSelector((state) => state.auth);

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

    const [fetchedData, setFetchedData] = useState();


    const OrdersId = async (id) => {
        try {
            const res = await dispatch(getOrdersId(id)).unwrap();
            console.log(res.order);
            console.log(res);
            setCarrierCurrency(res?.order?.carrier_currency_transfer)
            setMarginCurrency(res?.order?.margin_currency_transfer)
            setItemsPriceCurrency(res?.order?.items_price_currency)
            setFraxtCurrency(res?.order?.fraxt_currency_transfer)
            // setItemsPointPrice(res?.order?)

            const obj = {
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
                location_of_destination: res?.order?.destination_lat_lng,
                location_of_departure: res?.order?.departure_lat_lng,
                // location_of_departure: res?.order?.location_of_departure,
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
        setFormData({...rows})
        setFormData({
            ...formData,
            location_of_departure: (String(formData.location_of_departure[0] + " , " + formData.location_of_departure[1])),
            location_of_destination: (String(formData.location_of_destination[0]) + ' , ' + String(formData.location_of_destination[1]))
        })

        try {
            const res = await dispatch(editOrder({id: id, editData: formData})).unwrap();
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(formData);


    // const initialized = useRef(false);
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


    // console.log(formData.countryTransmit_1)
    // console.log(formData.countryReceive_1)
    // useEffect(() => {
    //     console.log(formData)
    // }, [formData])

    useEffect(() => {
        getSelectAll()
        if (mode === 'edit') {
            OrdersId(id)
        }
        if (mode === 'show') {
            getShowOrdersId()
        }

    }, [])
    // const newRows = []
    //
    // for (let i = 0; i <rows.length; i++) {
    //     newRows.push({...rows[i] , [`point[${i}]`]:rows[i].point.id , [`point_price[${i}]`]:rows[i].point.id }   )
    // }
    //
    // console.log(newRows)
    const newRows = rows.map((row, i) => ({
        [`point[${i + 1}]`]: row.point.id,
        [`point_price[${i + 1}]`]: row.point_price
    }));


    const addOrders = async () => {
        // console.log(formData)
        const obj = {
            // ...formData,
            carrier_currency_transfer: carrierCurrency,
            fraxt_currency_transfer: fraxtCurrency,
            margin_currency_transfer: marginCurrency,
            items_price_currency: itemsPriceCurrency,
            // point_price: ItemsPointPrice ,
            client_id: formData.client_id.id,
            country_of_departure: formData.country_of_departure.id,
            country_of_destination: formData.country_of_destination.id,
            nds: formData.nds.value,
            payment_condition: formData.payment_condition.id,
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
            location_of_destination: formData?.location_of_destination,
            location_of_departure: formData?.location_of_departure,
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
        }
        rows.forEach((row, index) => {
            if (row.point && row.point.id) obj[`point[${index}]`] = row.point.id;
            if (row.point_price) obj[`point_price[${index}]`] = row.point_price;
        });
        setFormData({...rows})
        console.log(formData)

        try {
            const res = await dispatch(addOrder(obj)).unwrap()
            navigate("/orders")
        } catch (err) {
            console.log(err);
        }
    }


    const getShowOrdersId = async () => {
        try {
            const res = await dispatch(getShowOrders({id: id, db: dbOrders})).unwrap();
            console.log(res)
            setFormData(res.order)
            setDriversName(res.driver.fio)
        } catch (error) {
            console.log(error);
        }
    }

    console.log(formData)

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
        {title: '2'},
        {title: '3'},
    ];
    const typePayment = [
        {title: "Предоплата"},
        {title: "Пост оплата"},
        {title: "Частичная предоплата"},
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
        {label: "Отменен", value: -6},
        {label: "Водител не согласился с офертой", value: -2},
        {label: "Водител отменил заказ", value: -1},
        {label: "Новый заказ", value: 0},
        {label: "У оператора", value: 1},
        {label: "Отправлен водителям", value: 2},
        {label: "Ожидание водителя", value: 3},
        {label: "Водитель назначен", value: 4},
        {label: "Водитель прибыл", value: 5},
        {label: "Завершен", value: 6},
    ];

    const handleRadioChange = (value) => {
        localStorage.setItem("statusListOrders", value);
        setActiveRadio(value);
    };
    return (
        <div>
            <div className={'bg-bacWhite w-full min-h-[calc(100dvh-70px)] py-5'}>
                {/*<div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow'}>*/}

                {/*</div>*/}
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow'}>

                    <div className={'h-[40px] gap-4 relative text-center center  w-full   mb-10'}>
                        <div className={'w-max  absolute top-0 left-0'} onClick={() => navigate(`/orders`)}>
                            <Button icon={<i className="fa-solid fa-arrow-left"></i>} value={'Orders'}/>
                        </div>
                        <p className={'text-blue font-bold text-xl'}>Byurtmani {mode === 'edit' ? "tahrirlash" : mode === 'add' ? "yaratish" : mode === "show" ? "Ko'rish" : ""}</p>

                        {
                            mode === 'show' ?
                                <div className={'absolute top-0 right-0 flex items-center gap-3'}>
                                    <button
                                        onClick={(e) => {
                                            handleClick(e, rippleRefs.add)
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
                                        <i className="fa-solid fa-ban mr-2"></i>Bekor qilish
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
                                            <div className="flex flex-wrap gap-2 text-blue">
                                                {statusList.map((item) => (
                                                    <button
                                                        key={item.value}
                                                        onClick={() => handleRadioChange(item.value)}
                                                        style={{position: "relative", overflow: "hidden"}}
                                                        className={`border-2 px-3 rounded-lg cursor-pointer text-[14px] ${
                                                            activeRadio === item.value ? "bg-gray-200" : ""
                                                        }`}
                                                    >
                                                        <FormControlLabel
                                                            value={item.label}
                                                            control={
                                                                <Radio
                                                                    sx={{
                                                                        color: "#1D2D5B",
                                                                        "&.Mui-checked": {color: "#1D2D5B"},
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


                                <div className={'grid gap-4 grid-cols-2 mb-5'}>
                                    <div className={''}>
                                        <InputMUI value={driversName ?? ''}
                                                  onChange={(e) =>
                                                      setFormData({...formData, receiver_contact: e.target.value})
                                                  } variant={'outlined'} label={'Водитель'}
                                        />
                                    </div>
                                    <div className={''}>
                                        <InputMUI value={user.user.name ?? ''}
                                                  onChange={(e) =>
                                                      setFormData({...formData, receiver_contact: e.target.value})
                                                  } variant={'outlined'} label={'Перевозчик'}
                                        />
                                    </div>
                                </div>
                            </>
                            : ""
                    }

                    <div className={'flex items-center gap-4'}>
                        <div className={"w-full "}>
                            <SelectMUI
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
                                label={'Клиент'}
                                placeholder={'Клиент'}/>
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI
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

                                options={nds} variant={'outlined'} label={'НДС'}
                                // value={formData.nds || null}
                                // onChange={(val) => setFormData({...formData, nds: val})}
                                placeholder={'НДС'}/>
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI
                                {...{
                                    value:
                                        mode !== "add"
                                            ? typeService.find((opt) => opt.id === formData?.service_type) || null
                                            : formData?.service_type,
                                }}
                                onChange={(val) => {
                                    mode !== "add" ? setFormData({
                                        ...formData,
                                        service_type: val.id
                                    }) : setFormData({...formData, service_type: val})
                                }}
                                options={typeService} variant={'outlined'} label={'Тип услуги'}
                                placeholder={'Тип услуги'}
                                // value={formData.service_type}
                                // onChange={(val) => setFormData({...formData, service_type: val})}
                            />
                        </div>
                    </div>
                    {
                        formData?.service_type?.id === 1 || formData?.service_type?.id === 6 ?

                            <div className={'flex items-center gap-4 mt-5'}>
                                <div className={"w-full "}>
                                    <InputMUI value={formData?.receiver_contact ?? ''}
                                              onChange={(e) =>
                                                  setFormData({...formData, receiver_contact: e.target.value})
                                              } variant={'outlined'} label={'Контакты получателя (декларант)'}
                                    />
                                </div>
                                <div className={"w-full "}>
                                    <InputMUI value={formData?.receiver_contact ?? ''}
                                              onChange={(e) =>
                                                  setFormData({...formData, receiver_contact: e.target.value})
                                              } variant={'outlined'} label={'Контакты получателя (декларант)'}
                                    />
                                </div>
                            </div>
                            :
                            ""
                    }

                </div>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5'}>
                    <div className={'grid grid-cols-3 gap-4'}>
                        <div className={"w-full "}>
                            {/*<p className={'font-semibold text-blue mb-2'}>Стоимость перевозчика</p>*/}
                            <p className={'text-blue  mb-3'}>Перечисление</p>
                            <CurrencyInput value={formData.carrier_price_transfer ?? ''}
                                           setCarrierCurrency={setCarrierCurrency} carrierCurrency={carrierCurrency}
                                           onChange={(e) => setFormData({
                                               ...formData,
                                               carrier_price_transfer: e.target.value
                                           })}
                                           label={'Стоимость перевозчика'}/>
                        </div>
                        <div className={"w-full "}>
                            {/*<p className={'font-semibold text-blue mb-2'}>Цена клиента</p>*/}
                            <p className={'text-blue  mb-3'}>Перечисление</p>
                            <CurrencyInput value={formData.fraxt_price_transfer ?? ''}
                                           setCarrierCurrency={setFraxtCurrency}
                                           carrierCurrency={fraxtCurrency}
                                           onChange={(e) => setFormData({
                                               ...formData,
                                               fraxt_price_transfer: e.target.value
                                           })} label={'Цена клиента'}/>

                        </div>
                        <div className={"w-full "}>
                            {/*<p className={'font-semibold text-blue mb-2'}>Маржа</p>*/}
                            <p className={'text-blue  mb-3'}>Перечисление</p>
                            <CurrencyInput value={formData.margin_transfer ?? ''} setCarrierCurrency={setMarginCurrency}
                                           carrierCurrency={marginCurrency}
                                           onChange={(e) => setFormData({...formData, margin_transfer: e.target.value})}
                                           label={'Маржа'}/>
                        </div>
                    </div>
                    <div className={'grid grid-cols-3 gap-4 mt-5'}>
                        <div className={" "}>
                            <CurrencyInput value={formData?.items_price ?? ''}
                                           setCarrierCurrency={setItemsPriceCurrency}
                                           carrierCurrency={itemsPriceCurrency}
                                           onChange={(e) => setFormData({...formData, items_price: e.target.value})}
                                           label={'Стоимость груза'}/>
                        </div>
                    </div>
                </div>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5'}>
                    <div className={'grid grid-cols-3 gap-4'}>
                        <div className={"w-full "}>
                            <SelectMUI options={data?.shipment_types || []} variant={'outlined'} label={'Тип перевозки'}
                                       placeholder={'Тип перевозки'}
                                // value={formData?.shipment_type || null}
                                // onChange={(val) => setFormData({...formData, shipment_type: val})}
                                       {...{
                                           value:
                                               mode !== "add"
                                                   ? data?.shipment_types?.find((opt) => opt.id === formData?.shipment_type) || null
                                                   : formData?.shipment_type,
                                       }}
                                       onChange={(val) => {
                                           mode !== "add" ? setFormData({
                                               ...formData,
                                               shipment_type: val.id
                                           }) : setFormData({...formData, shipment_type: val})
                                       }}
                            />
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI options={options} variant={'outlined'} label={'Объем транспортного средства'}
                                       placeholder={'Объем транспортного средства'}
                                // value={formData?.transport_value || null}
                                // onChange={(val) => setFormData({...formData, transport_value: val})}
                                       {...{
                                           value:
                                               mode !== "add"
                                                   ? options.find((opt) => String(opt.title) === String(formData?.transport_value)) || null
                                                   : formData?.transport_value,
                                       }}
                                       onChange={(val) => {
                                           mode !== "add" ? setFormData({
                                               ...formData,
                                               transport_value: val.title
                                           }) : setFormData({...formData, transport_value: val})
                                       }}
                            />
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI options={data?.transport_types || []} variant={'outlined'}
                                       label={'Тип транспортного средства'}
                                       placeholder={'Тип транспортного средства'}
                                // value={formData?.transport_type || null}
                                // onChange={(val) => setFormData({...formData, transport_type: val})}

                                       {...{
                                           value:
                                               mode !== "add"
                                                   ? data?.transport_types.find((opt) => opt.id === formData?.transport_type) || null
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
                    </div>
                </div>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5'}>
                    <div className={'grid grid-cols-4 gap-4'}>
                        <div className={" col-span-2"}>
                            <LocationInput
                                value={typeof formData?.location_of_departure === "string" ? formData?.location_of_departure.split(',').map(Number) : formData?.location_of_departure || null}
                                onChange={(pos) => setFormData({...formData, location_of_departure: pos})}
                                label={'Локация отправителя'}/>
                        </div>
                        <div className={"  col-span-2"}>
                            <LocationInput
                                value={typeof formData?.location_of_destination === 'string' ? formData?.location_of_destination.split(',') : formData?.location_of_destination || null}

                                onChange={(pos) => setFormData({...formData, location_of_destination: pos})}
                                label={'Локация получателя'}/>
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI options={data?.countries || []} variant={'outlined'} label={'Страна отправителя'}
                                       placeholder={'Страна отправителя'}
                                // value={formData?.country_of_departure || null}
                                // onChange={(val) => {
                                //     setFormData({...formData, country_of_departure: val});
                                //     StateDataOne(val?.id)
                                // }}
                                       {...{
                                           value:
                                               mode !== "add"
                                                   ? data?.countries?.find((opt) => String(opt.id) === String(formData?.country_of_departure)) || null
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
                            <SelectMUI options={stateDataOne?.cities_from || []} variant={'outlined'}
                                       label={'Пункт отправления'}
                                       placeholder={'Пункт отправления'}
                                // value={formData?.point_of_departure || null}
                                // onChange={(val) => setFormData({...formData, point_of_departure: val})}
                                       {...{
                                           value:
                                               mode !== "add"
                                                   ? stateDataOne?.cities_from?.find((opt) => String(opt.id) === String(formData?.point_of_departure)) || null
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
                            <SelectMUI options={data?.countries || []} variant={'outlined'} label={'Страна получателя'}
                                       placeholder={'Страна получателя'}
                                // value={formData?.country_of_destination || null}
                                // onChange={(val) => {
                                //     setFormData({...formData, country_of_destination: val})
                                //     StateDataTwo(val?.id)
                                // }}

                                       {...{
                                           value:
                                               mode !== "add"
                                                   ? data?.countries?.find((opt) => String(opt.id) === String(formData?.country_of_destination)) || null
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
                            <SelectMUI options={stateDataTwo?.cities_to || []} variant={'outlined'}
                                       label={'Пункт назначения'}
                                       placeholder={'Пункт назначения'}
                                // value={formData?.point_of_destination || null}
                                // onChange={(val) => setFormData({...formData, point_of_destination: val})}

                                       {...{
                                           value:
                                               mode !== "add"
                                                   ? stateDataTwo?.cities_to?.find((opt) => String(opt.id) === String(formData?.point_of_destination)) || null
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
                        <div className={"col-span-2 "}>
                            <InputMUI
                                value={formData?.customs_clearance1 ?? ''}
                                onChange={(e) =>
                                    setFormData({...formData, customs_clearance1: e.target.value})
                                }
                                variant={'outlined'} label={'Адрес таможенного оформления(код поста)'}
                            />
                        </div>
                        <div className={"col-span-2 "}>
                            <InputMUI
                                value={formData?.customs_clearance2 ?? ''}
                                onChange={(e) =>
                                    setFormData({...formData, customs_clearance2: e.target.value})
                                }
                                variant={'outlined'} label={'Адрес таможенного оформления(код поста)'}
                            />
                        </div>
                    </div>
                </div>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5'}>
                    <div className={'grid grid-cols-4 gap-4'}>
                        <div className={" col-span-2"}>
                            <InputMUI
                                value={formData?.weight_of_cargo ?? ''}

                                onChange={(e) =>
                                    setFormData({...formData, weight_of_cargo: e.target.value})
                                }
                                variant={'outlined'} label={'Вес перевозимого груза [кг]'}
                            />
                        </div>
                        <div className={"  col-span-2"}>
                            <SelectMUI options={dangerous} variant={'outlined'} label={'Опасный ли груз?'}
                                       placeholder={'Опасный ли груз?'}
                                // value={formData.status_of_cargo}
                                // onChange={(val) => setFormData({...formData, status_of_cargo: val})}
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
                            <MyCalendar
                                value={formData?.act_date}
                                onChange={(val) => setFormData({...formData, act_date: val})}
                            />
                        </div>
                        <div className={"w-full "}>
                            <MyCalendar
                                value={formData?.shipment_date ?? ''} // misol uchun yangi property
                                onChange={(val) => setFormData({...formData, shipment_date: val})}/>
                        </div>
                        <div className={"w-full "}>
                            <MyCalendar value={formData?.unload_date ?? ''} // misol uchun yangi property
                                        onChange={(val) => setFormData({...formData, unload_date: val})}/>
                        </div>
                        <div className={"w-full "}>
                            <InputMUI value={formData?.transportation_time ?? ''}
                                      onChange={(e) =>
                                          setFormData({...formData, transportation_time: e.target.value})
                                      } variant={'outlined'}
                                      label={'Время транспортировки'}
                            />
                        </div>
                        <div className={'grid grid-cols-3 col-span-full    gap-4'}>
                            <div className={""}>
                                <SelectMUI options={typeLoading} variant={'outlined'} label={'Вид погрузки'}
                                           placeholder={'Вид погрузки'}
                                    // value={formData?.type_of_loading || null}
                                    // onChange={(val) => setFormData({...formData, type_of_loading: val})}
                                           {...{
                                               value:
                                                   mode !== "add"
                                                       ? typeLoading.find((opt) => opt.title === formData?.type_of_loading) || null
                                                       : formData?.type_of_loading,
                                           }}
                                           onChange={(val) => {
                                               mode !== "add" ? setFormData({
                                                   ...formData,
                                                   type_of_loading: val.title
                                               }) : setFormData({...formData, type_of_loading: val})
                                           }}

                                />


                            </div>
                            <div className={"  "}>
                                <InputMUI value={formData?.nature_of_cargo ?? ''}
                                          onChange={(e) =>
                                              setFormData({...formData, nature_of_cargo: e.target.value})
                                          }
                                          variant={'outlined'} label={'Наименование перевозимого груза'}
                                />
                            </div>
                            <div className={"  "}>
                                <InputMUI value={formData?.palets ?? ''}
                                          onChange={(e) =>
                                              setFormData({...formData, palets: e.target.value})
                                          }
                                          variant={'outlined'} label={'Количество мест'}
                                />
                            </div>
                        </div>
                        <div className={"col-span-full  "}>
                            <InputMUI value={formData?.special_conditions ?? ''}
                                      onChange={(e) =>
                                          setFormData({...formData, special_conditions: e.target.value})
                                      }
                                      variant={'outlined'} label={'Особые условия'}
                            />
                        </div>
                    </div>
                </div>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5'}>
                    <div className={'grid grid-cols-3 gap-4'}>
                        <div className={" "}>
                            <SelectMUI options={typePayment} variant={'outlined'} label={'Тип оплаты'}
                                       placeholder={'Тип оплаты'}
                                // value={formData?.payment_condition || null}
                                // onChange={(val) => setFormData({...formData, payment_condition: val})}
                                       {...{
                                           value:
                                               mode !== "add"
                                                   ? typePayment.find((opt) => opt.id === formData?.payment_condition) || null
                                                   : formData?.payment_condition,
                                       }}
                                       onChange={(val) => {
                                           mode !== "add" ? setFormData({
                                               ...formData,
                                               payment_condition: val.id
                                           }) : setFormData({...formData, payment_condition: val})
                                       }}
                            />


                        </div>
                        <div className={""}>
                            <InputMUI value={formData?.sender_contact ?? ''}
                                      onChange={(e) =>
                                          setFormData({...formData, sender_contact: e.target.value})
                                      }
                                      variant={'outlined'} label={'Контакты отправителя'}
                            />
                        </div>
                        <div className={""}>
                            <InputMUI value={formData?.receiver_contact ?? ''}
                                      onChange={(e) =>
                                          setFormData({...formData, receiver_contact: e.target.value})
                                      } variant={'outlined'} label={'Контакты получателя (декларант)'}
                            />
                        </div>
                    </div>
                </div>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5'}>
                    <div className={'grid grid-cols-2 gap-4'}>
                        <div className={"flex items-center  "}>
                            <SwitchMUI/>
                            <p className={'font-semibold text-blue  '}>Есть таможенный пункт</p>
                        </div>
                        <div className={'flex items-center justify-end'}>
                            <button onClick={handleAdd} className={'px-3 py-2 bg-blue w-max text-white rounded'}>
                                <i className="fa-solid fa-plus mr-2"></i>Add
                            </button>
                        </div>
                        <div className={'grid grid-cols-3 col-span-full   gap-4'}>
                            <div className={"col-span-2"}>
                                <SelectMUI options={data?.customs} variant={'outlined'} label={'Тип оплаты'}
                                           placeholder={'Тип оплаты'}
                                    // value={formData?.points || null}
                                    // onChange={(val) => setFormData({...formData, points: val})}

                                           {...{
                                               value:
                                                   mode !== "add"
                                                       ? data?.customs.find((opt) => opt.id === formData?.point) || null
                                                       : formData?.point,
                                           }}
                                           onChange={(val) => {
                                               mode !== "add" ? setFormData({
                                                   ...formData,
                                                   point: val.id
                                               }) : setFormData({...formData, point: val})
                                           }}
                                />
                            </div>
                            <div className={" "}>

                                <CurrencyInput value={formData?.point_price ?? ''}
                                               setCarrierCurrency={setItemsPointPrice}
                                               carrierCurrency={ItemsPointPrice}
                                               onChange={(e) => setFormData({...formData, point_price: e.target.value})}
                                               label={'Стоимость груза'}/>
                            </div>
                        </div>
                        {rows?.map((row, index) => (
                            <div key={row.id} className="grid grid-cols-3 col-span-full gap-4">
                                <div className="col-span-2">
                                    <SelectMUI
                                        options={data?.customs || []}
                                        variant="outlined"
                                        label="Тип оплаты"
                                        placeholder="Тип оплаты"
                                        value={row.point || ''}
                                        onChange={(val) => {
                                            const newRows = [...rows];
                                            newRows[index].point = val;
                                            setRows(newRows);
                                        }}
                                    />
                                </div>

                                <div className="flex items-center gap-4 w-full pr-2">
                                    <div className="w-full">
                                        <CurrencyInput
                                            label="Стоимость груза"
                                            value={row.point_price ?? ''} // qiymatni state bilan bog'lash
                                            onChange={(val) => {
                                                const newRows = [...rows];
                                                newRows[index].point_price = val.target.value; // point_price ga yozish
                                                setRows(newRows);
                                                console.log(rows)
                                            }}
                                        />
                                    </div>

                                    <div
                                        onClick={() => handleRemove(row.id)}
                                        className="bg-red-500 cursor-pointer w-[40px] h-[40px] rounded center text-[14px] group"
                                    >
                                        <i className="fa-solid fa-trash text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>

                    <div className={'py-5 w-full flex items-center justify-end gap-4'}>
                        <button
                            onClick={() => {
                                navigate('/orders');
                            }}
                            className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out  hover:text-white hover:bg-blue py-2 px-3"
                        >
                            Close
                        </button>
                        <button onClick={() => {
                            if (mode === 'edit') {
                                EditOrder(id, formData);
                            } else if (mode === 'Add') {
                                addOrders()
                            }
                        }}
                                className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out  hover:text-white hover:bg-blue py-2 px-3"
                        >
                            {loading ? ('Adding...') : ('Add')}
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default OrdersFrom;