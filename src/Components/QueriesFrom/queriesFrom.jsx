import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    CreateQueries,
    getAllSelect,
    getQueriesAll,
    GetQueriesId,
    updateQueries
} from "../../features/Queries/queriesThunks.js";
import { CurrencyInput, InputMUI, MyCalendar, SelectMUI} from "../index.js";
import {Button, TextareaAutosize} from "@mui/material";
import {useTranslation} from "react-i18next";

function QueriesFrom({mode}) {
    const {id} = useParams();
    const {loading} = useSelector((state) => state.queries);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [currency, setCurrency] = useState('2');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        client_id: "",
        title: "",
        status_of_cargo: "",
        degree_of_danger: "",
        weight: "",
        transport_volume_id: "",
        transport_type_id: "",
        mode: "",
        country_of_departure: "",
        region_of_departure: "",
        city_of_departure: "",
        country_of_destination: "",
        region_of_destination: "",
        city_of_destination: "",
        load_time_from: "",
        client_enumeration_price: "",
        payment_method: "",
        client_enumeration_currency: ""
    });
    const [allSelect, setAllSelect] = useState({});

    const getQueriesSelect = async () => {
        try {
            const res = await dispatch(getAllSelect(
                {params: `?country_of_departure=${formData?.country_of_departure}&region_of_departure=${formData?.region_of_departure}&city_of_departure${formData?.city_of_departure}&country_of_destination=${formData?.country_of_destination}&region_of_destination=${formData?.region_of_destination}&city_of_destination${formData?.city_of_destination}`}
            )).unwrap()
            console.log(res)
            setAllSelect(res)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        document.body.style.overflow = "auto";
    }, []);


    const getQueriesId = async () => {
        try {
            const res = await dispatch(GetQueriesId(id)).unwrap()
            console.log(res.query);
            const obj = {
                client_id: res?.query?.client_id || "",
                title: res?.query?.title || "",
                status_of_cargo: res?.query?.status_of_cargo,
                degree_of_danger: res?.query?.degree_of_danger || "",
                weight: res?.query?.weight || "",
                transport_volume_id: res?.query?.transport_volume_id || "",
                transport_type_id: res?.query?.transport_type_id || "",
                mode: res?.query?.mode || "",
                country_of_departure: res?.query?.from_address[0]?.country?.id || "",
                region_of_departure: res?.query?.from_address[0]?.region?.id || "",
                city_of_departure: res?.query?.from_address[0]?.city?.id || "",
                country_of_destination: res?.query?.to_address[0]?.country?.id || "",
                region_of_destination: res?.query?.to_address[0]?.region?.id || "",
                city_of_destination: res?.query?.to_address[0]?.city?.id || "",
                load_time_from: res?.query?.load_time_from || "",
                client_enumeration_price: res?.query?.client_enumeration_price || "",
                payment_method: res?.query?.payment_method || "",
                client_enumeration_currency: res?.query?.client_enumeration_currency || ""
            }

            console.log(obj)

            try {
                const res2 = await dispatch(getAllSelect(
                    {
                        params: `?country_of_departure=${res?.query?.country_of_departure}&region_of_departure=${res?.query?.region_of_departure}&city_of_departure=${res?.query?.city_of_departure}&country_of_destination=${res?.query?.country_of_destination}&region_of_destination=${res?.query?.region_of_destination}&city_of_destination=${res?.query?.city_of_destination}`
                    }
                )).unwrap()
                console.log(res2)
                setAllSelect(res2)
            } catch (error) {
                console.error(error);
            }
            setFormData(obj);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (mode === 'edit') {
            getQueriesId()
        }
    }, [])


    useEffect(() => {
        getQueriesSelect()
    }, [formData?.country_of_departure, formData?.region_of_departure, formData?.city_of_departure, formData?.country_of_destination, formData?.region_of_destination, formData?.city_of_destination])


    const createQuerie = async () => {
        const obj = {
            ...formData,
            client_enumeration_currency: currency === '1' ? 'usd' : currency === '2' ? 'uzs' : currency === '3' ? 'rub' : currency === '4' ? 'eur' : '',
        }
        try {
            const res = await dispatch(CreateQueries({data: obj})).unwrap()
            // console.log(res)
            try {
                const res2 = await dispatch(getQueriesAll({
                    pageqq: 1, search: {
                        search: "",
                        from: '',
                        to: ''
                    }
                })).unwrap()
                // console.log(res2)
                navigate('/queries')

            } catch (error) {
                console.error(error)
            }
        } catch (error) {
            console.error(error);
            setErrors(error.errors)
        }
    }


    const updateQuerie = async () => {
        console.log(formData)
        try {
            const res = dispatch(updateQueries({id, formData})).unwrap()
            try {
                const res2 = await dispatch(getQueriesAll({
                    pageqq: 1, search: {
                        search: "",
                        from: '',
                        to: ''
                    }
                })).unwrap()
                // console.log(res2)
                navigate('/queries')

            } catch (error) {
                console.error(error)
            }
        } catch (error) {
            console.error(error);
            setErrors(error.errors)
        }
    }


    const data = [
        {}
    ]

    const dangerous = [
        {id: 0, title: "Yo'q"},
        {id: 1, title: "Ha"},
    ];

    const hazardLevel = [
        {id: 1, title: 1},
        {id: 2, title: 2},
        {id: 3, title: 3},
        {id: 4, title: 4},
        {id: 5, title: 5},
        {id: 6, title: 5},
        {id: 7, title: 7},
        {id: 8, title: 8},
        {id: 9, title: 9}
    ]

    const typePayment = [
        {value: 'cash', title: "Перечисления"},
        {value: 'enumeration', title: "Нақд"},
        {value: 'combined', title: "Ярим перечисления"},
    ];


    return (
        <div>
            <div className={'bg-bacWhite w-full min-h-[calc(100dvh-70px)] py-5 dark:bg-darkBg'}>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow dark:bg-darkBgTwo'}>
                    <div className={'h-[40px] gap-4 relative text-center center  w-full   mb-10'}>
                        <div className={'w-max  absolute top-0 left-0'} onClick={() => navigate(`/queries`)}>
                            {/*<Button color={'dark:bg-btnBgDark'} icon={<i className="fa-solid fa-arrow-left"></i>}*/}
                            {/*        value={'Queries'}/>*/}
                            <Button
                                onClick={() => navigate(`/queries`)}
                                sx={{
                                    background : '#1D2D5B',
                                    '.dark &':{
                                        background : '#2B4764',
                                    }
                                }}
                                color={'info'}
                                variant={'contained'}>
                                <i className="fa-solid fa-right-from-bracket mr-2"></i>
                                {t('queriesTranslation.back')}
                            </Button>
                        </div>
                        {/*<p className={'text-blue font-bold text-xl dark:text-darkText'}>Byurtmani Ko'rish</p>*/}
                    </div>
                    <div className={'grid grid-cols-3 gap-4'}>
                        <div className={"w-full"}>
                            <SelectMUI
                                errorMassage={errors?.client_id}
                                value={allSelect?.clients?.find((opt) => opt.id === formData?.client_id)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        client_id: val.id
                                    })
                                }}
                                options={allSelect?.clients || []}
                                variant={'outlined'}
                                label={t('queriesTranslation.client')}
                                placeholder={t('queriesTranslation.client')}
                            />
                        </div>
                        <div className={"w-full"}>
                            <InputMUI
                                errorMassage={errors?.title}
                                value={formData?.title ?? ''}

                                onChange={(e) =>
                                    setFormData({...formData, title: e.target.value})
                                }
                                variant={'outlined'} label={t('queriesTranslation.cargo_name')}
                            />
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI
                                errorMassage={errors?.status_of_cargo}
                                value={dangerous?.find((opt) => opt.id === formData?.status_of_cargo)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        status_of_cargo: val.id
                                    })
                                }}
                                options={dangerous || []}
                                variant={'outlined'}
                                label={t('queriesTranslation.is_dangerous')}
                                placeholder={t('queriesTranslation.is_dangerous')}
                            />
                        </div>
                        {
                            formData?.status_of_cargo === 1 ?
                                <div className={"w-full "}>
                                    <SelectMUI
                                        errorMassage={errors?.degree_of_danger}
                                        value={hazardLevel?.find((opt) => opt.id === formData?.degree_of_danger)}
                                        onChange={(val) => {
                                            setFormData({
                                                ...formData,
                                                degree_of_danger: val.id
                                            })
                                        }}
                                        options={hazardLevel || []}
                                        variant={'outlined'}
                                        label={t('queriesTranslation.hazard_level')}
                                        placeholder={t('queriesTranslation.hazard_level')}
                                    />
                                </div>
                                :
                                null
                        }
                        <div className={" w-full "}>
                            <InputMUI
                                errorMassage={errors?.weight}
                                value={formData?.weight ?? ''}
                                type={'number'}
                                onChange={(e) =>
                                    setFormData({...formData, weight: e.target.value})
                                }
                                variant={'outlined'} label={t('queriesTranslation.cargo_weight')}
                            />
                        </div>
                        <div className={"w-full  "}>
                            <SelectMUI
                                errorMassage={errors?.transport_volume_id}

                                value={allSelect?.transport_volumes?.find((opt) => opt.id === formData?.transport_volume_id)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        transport_volume_id: val.id
                                    })
                                }}
                                options={allSelect?.transport_volumes || []}
                                variant={'outlined'}
                                label={t('queriesTranslation.transport_volume')}
                                placeholder={t('queriesTranslation.transport_volume')}

                            />
                        </div>
                        <div className={"w-full  "}>
                            <SelectMUI
                                errorMassage={errors?.transport_type_id}
                                value={allSelect?.transport_types?.find((opt) => opt.id === formData?.transport_type_id)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        transport_type_id: val.id
                                    })
                                }}
                                options={allSelect?.transport_types || []}
                                variant={'outlined'}
                                label={t('queriesTranslation.transport_type')}
                                placeholder={t('queriesTranslation.transport_type')}

                            />
                        </div>

                        {
                            formData?.transport_type_id === 3 ?
                                <div className={"w-full "}>
                                    <InputMUI
                                        errorMassage={errors?.mode}
                                        value={formData?.mode ?? ''}
                                        onChange={(e) =>
                                            setFormData({...formData, mode: e.target.value})
                                        }
                                        variant={'outlined'} label={t('queriesTranslation.mode')}
                                    />
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow dark:bg-darkBgTwo mt-5'}>

                    <div className={'grid grid-cols-3 gap-4'}>
                        <div className={"w-full  "}>
                            <SelectMUI
                                errorMassage={errors?.country_of_departure}
                                value={
                                    mode === 'add' ?
                                        allSelect?.countries?.find((opt) => opt.id === formData?.country_of_departure)
                                        :
                                        allSelect?.countries?.find((opt) => opt.id === formData?.country_of_departure)
                                }

                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        country_of_departure: val.id
                                    })
                                }}
                                options={allSelect?.countries || []}
                                variant={'outlined'}
                                label={t('queriesTranslation.country_departure')}
                                placeholder={t('queriesTranslation.country_departure')}

                            />
                        </div>
                        <div className={"w-full  "}>
                            <SelectMUI
                                errorMassage={errors?.region_of_departure}
                                value={allSelect?.regions_from?.find((opt) => opt.id === formData?.region_of_departure)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        region_of_departure: val.id
                                    })
                                }}
                                options={allSelect?.regions_from || []}
                                variant={'outlined'}
                                label={t('queriesTranslation.region_departure')}
                                placeholder={t('queriesTranslation.region_departure')}

                            />
                        </div>
                        <div className={"w-full  "}>
                            <SelectMUI
                                errorMassage={errors?.city_of_departure}
                                value={allSelect?.cities_from?.find((opt) => opt.id === formData?.city_of_departure)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        city_of_departure: val.id
                                    })
                                }}
                                options={allSelect?.cities_from || []}
                                variant={'outlined'}
                                label={t('queriesTranslation.city_departure')}
                                placeholder={t('queriesTranslation.city_departure')}

                            />
                        </div>
                        <div className={"w-full  "}>
                            <SelectMUI
                                errorMassage={errors?.country_of_destination}
                                value={allSelect?.countries?.find((opt) => opt.id === formData?.country_of_destination)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        country_of_destination: val.id
                                    })
                                }}
                                options={allSelect?.countries || []}
                                variant={'outlined'}
                                label={t('queriesTranslation.country_destination')}
                                placeholder={t('queriesTranslation.country_destination')}

                            />
                        </div>
                        <div className={"w-full  "}>
                            <SelectMUI
                                errorMassage={errors?.region_of_destination}
                                value={allSelect?.regions_to?.find((opt) => opt.id === formData?.region_of_destination)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        region_of_destination: val.id
                                    })
                                }}
                                options={allSelect?.regions_to || []}
                                variant={'outlined'}
                                label={t('queriesTranslation.region_destination')}
                                placeholder={t('queriesTranslation.region_destination')}

                            />
                        </div>
                        <div className={"w-full  "}>
                            <SelectMUI
                                errorMassage={errors?.city_of_destination}
                                value={allSelect?.cities_to?.find((opt) => opt.id === formData?.city_of_destination)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        city_of_destination: val.id
                                    })
                                }}
                                options={allSelect?.cities_to || []}
                                variant={'outlined'}
                                label={t('queriesTranslation.city_destination')}
                                placeholder={t('queriesTranslation.city_destination')}

                            />
                        </div>
                    </div>
                </div>

                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow dark:bg-darkBgTwo mt-5'}>

                    <div className={'grid grid-cols-3 gap-4'}>
                        <div className={"w-full "}>
                            <div className={'relative'}>
                                <MyCalendar
                                    label={t('queriesTranslation.loading_date')}
                                    errorMassage={errors?.load_time_from}
                                    value={formData?.load_time_from ?? ''} // misol uchun yangi property
                                    onChange={(val) => setFormData({...formData, load_time_from: val})}/>
                                {/*<p className={`absolute text-[12px] pt-1 px-1 font-medium -top-[14px] left-2   ${formData.load_time_from ? 'text-red-500' : 'text-[#3B82F6]'} dark:text-darkText bg-white dark:bg-darkBgTwo`}>*/}
                                {/*    Дата погрузки</p>*/}

                                {/*{*/}
                                {/*    formData.unload_date ?*/}
                                {/*        <p className={'text-[#d32f2f] text-[12px] mt-1 ml-2'}>{formData?.unload_date[0]}</p> : ''*/}
                                {/*}*/}

                            </div>

                        </div>
                        <div className={" w-full "}>

                            <CurrencyInput
                                errorMassage={errors?.client_enumeration_price}
                                value={formData.client_enumeration_price ?? ''}
                                setCurrency={setCurrency}
                                currency={currency}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    client_enumeration_price: e.target.value
                                })} label={t('queriesTranslation.client_price')}/>


                        </div>
                        <div className={"w-full  "}>
                            <SelectMUI
                                errorMassage={errors?.payment_method}
                                value={typePayment.find((opt) => opt.value === formData?.payment_method)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        payment_method: val.value
                                    })
                                }}
                                options={typePayment || []}
                                variant={'outlined'}
                                label={t('queriesTranslation.payment_condition')}
                                placeholder={t('queriesTranslation.payment_condition')}

                            />
                        </div>
                        <div className="w-full col-span-2">
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder={t('queriesTranslation.carrier_additional')}
                                // value={suggestionsData?.notes || ""}
                                // onChange={(e) =>
                                //     setSuggestionsData((prev) => ({...prev, notes: e.target.value}))
                                // }
                                minRows={3}
                                style={{
                                    width: "100%",
                                    border: "2px solid #e5e7eb",
                                    borderRadius: 4,
                                    padding: 10,
                                    backgroundColor: "inherit",
                                    color: "inherit",
                                }}
                            />
                        </div>
                        <div className="w-full flex items-end justify-end gap-4 mb-4    ">
                            <button
                                onClick={() => {
                                    navigate('/queries');
                                }}
                                className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out  hover:text-white hover:bg-blue py-2 px-3 dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText"
                            >
                                {t('queriesTranslation.close')}
                            </button>
                            <button onClick={() => {

                                if (mode === 'add') {
                                    createQuerie()
                                }
                                if (mode === 'edit') {
                                    updateQuerie()
                                }
                            }}
                                    className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out  hover:text-white hover:bg-blue py-2 px-3 dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText"
                            >
                                {mode === 'edit' ? t('queriesTranslation.edit'): t('queriesTranslation.add')}
                            </button>
                        </div>
                    </div>


                </div>


            </div>
        </div>
    );
}

export default QueriesFrom;