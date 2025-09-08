import React, {useState} from 'react';
import {Button, CurrencyInput, InputMUI, LocationInput, MyCalendar, SelectMUI} from "../../Components/index.js";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {TextareaAutosize} from "@mui/material";

function AddQueries({mode = 'add'}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({});

    const data = [
        {}
    ]

    return (
        <div>
            <div className={'bg-bacWhite w-full min-h-[calc(100dvh-70px)] py-5 dark:bg-darkBg'}>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow dark:bg-darkBgTwo'}>
                    <div className={'h-[40px] gap-4 relative text-center center  w-full   mb-10'}>
                        <div className={'w-max  absolute top-0 left-0'} onClick={() => navigate(`/queries`)}>
                            <Button color={'dark:bg-btnBgDark'} icon={<i className="fa-solid fa-arrow-left"></i>}
                                    value={'Queries'}/>
                        </div>
                        {/*<p className={'text-blue font-bold text-xl dark:text-darkText'}>Byurtmani Ko'rish</p>*/}

                    </div>

                    <div className={'grid grid-cols-2 gap-4'}>
                        <div className={"w-full"}>
                            <SelectMUI

                                value={data?.clients?.find((opt) => opt.id === formData?.client_id)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        client_id: val.id
                                    })
                                }}
                                options={data?.clients || []}
                                variant={'outlined'}
                                label={'Клиент'}
                                placeholder={'Клиент'}
                            />
                        </div>
                        <div className={"w-full"}>
                            <InputMUI
                                // errorMassage={errors?.weight_of_cargo}
                                value={formData?.weight_of_cargo ?? ''}

                                onChange={(e) =>
                                    setFormData({...formData, weight_of_cargo: e.target.value})
                                }
                                variant={'outlined'} label={'Наименование груза'}
                            />
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI
                                value={data?.clients?.find((opt) => opt.id === formData?.client_id)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        client_id: val.id
                                    })
                                }}
                                options={data?.clients || []}
                                variant={'outlined'}
                                label={'Опасный ли груз?'}
                                placeholder={'Опасный ли груз?'}
                            />
                        </div>
                        <div className={" w-full "}>
                            <InputMUI
                                // errorMassage={errors?.weight_of_cargo}
                                value={formData?.weight_of_cargo ?? ''}

                                onChange={(e) =>
                                    setFormData({...formData, weight_of_cargo: e.target.value})
                                }
                                variant={'outlined'} label={'Вес груза (кг)'}
                            />
                        </div>
                        <div className={"w-full  "}>
                            <SelectMUI
                                // errorMassage={errors?.transport_type}

                                value={data?.clients?.find((opt) => opt.id === formData?.client_id)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        client_id: val.id
                                    })
                                }}
                                options={data?.clients || []}
                                variant={'outlined'}
                                label={'Объем транспорта'}
                                placeholder={'Объем транспорта'}

                            />
                        </div>
                        <div className={"w-full  "}>
                            <SelectMUI
                                // errorMassage={errors?.transport_type}
                                value={data?.clients?.find((opt) => opt.id === formData?.client_id)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        client_id: val.id
                                    })
                                }}
                                options={data?.clients || []}
                                variant={'outlined'}
                                label={'Тип транспорта'}
                                placeholder={'Тип транспорта'}

                            />
                        </div>
                        <div className={"w-full  "}>
                            <SelectMUI
                                // errorMassage={errors?.transport_type}
                                value={data?.clients?.find((opt) => opt.id === formData?.client_id)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        client_id: val.id
                                    })
                                }}
                                options={data?.clients || []}
                                variant={'outlined'}
                                label={'Место загрузки'}
                                placeholder={'Место загрузки'}

                            />
                        </div>
                        <div className={"w-full  "}>
                            <SelectMUI
                                // errorMassage={errors?.transport_type}
                                value={data?.clients?.find((opt) => opt.id === formData?.client_id)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        client_id: val.id
                                    })
                                }}
                                options={data?.clients || []}
                                variant={'outlined'}
                                label={'Место разгрузки'}
                                placeholder={'Место разгрузки'}

                            />
                        </div>
                        <div className={"w-full "}>
                            <div className={'relative'}>
                                <MyCalendar
                                    // errorMassage={errors.unload_date}
                                    value={formData?.unload_date ?? ''} // misol uchun yangi property
                                    onChange={(val) => setFormData({...formData, unload_date: val})}/>
                                <p className={`absolute text-[12px] pt-1 px-1 font-medium -top-[14px] left-2   ${formData.unload_date ? 'text-red-500' : 'text-[#3B82F6]'} dark:text-darkText bg-white dark:bg-darkBgTwo`}>
                                    Дата разгрузки</p>

                                {/*{*/}
                                {/*    formData.unload_date ?*/}
                                {/*        <p className={'text-[#d32f2f] text-[12px] mt-1 ml-2'}>{formData?.unload_date[0]}</p> : ''*/}
                                {/*}*/}

                            </div>

                        </div>
                        <div className={" w-full "}>

                            <CurrencyInput
                                // errorMassage={errors.fraxt_price_transfer}
                                value={formData.fraxt_price_transfer ?? ''}
                                // setCarrierCurrency={setFraxtCurrency}
                                // carrierCurrency={fraxtCurrency}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    fraxt_price_transfer: e.target.value
                                })} label={'Цена клиента (Переч-е)'}/>


                        </div>
                        <div className={"w-full  "}>
                            <SelectMUI
                                // errorMassage={errors?.transport_type}
                                value={data?.clients?.find((opt) => opt.id === formData?.client_id)}
                                onChange={(val) => {
                                    setFormData({
                                        ...formData,
                                        client_id: val.id
                                    })
                                }}
                                options={data?.clients || []}
                                variant={'outlined'}
                                label={'Тип оплаты'}
                                placeholder={'Тип оплаты'}

                            />
                        </div>
                        <div className="w-full">
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder="Заметки для оперейшн"
                                // value={suggestionsData?.textura || ""}
                                // onChange={(e) =>
                                //     setSuggestionsData((prev) => ({...prev, textura: e.target.value}))
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


                    </div>


                </div>


                {/*<div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5 dark:bg-darkBgTwo'}>*/}
                {/*    <div className={'grid grid-cols-4 gap-4'}>*/}
                {/*        <div className={" col-span-2"}>*/}
                {/*            <LocationInput*/}
                {/*                value={formData?.location_of_departure || null}*/}
                {/*                onChange={(pos) => setFormData({...formData, location_of_departure: pos.join(',')})}*/}
                {/*                label={'Локация отправителя'}/>*/}
                {/*        </div>*/}
                {/*        <div className={"  col-span-2"}>*/}
                {/*            <LocationInput*/}
                {/*                value={formData?.location_of_destination || null}*/}

                {/*                onChange={(pos) => setFormData({...formData, location_of_destination: pos.join(',')})}*/}
                {/*                label={'Локация получателя'}/>*/}
                {/*        </div>*/}
                {/*        <div className={"w-full "}>*/}
                {/*            <SelectMUI errorMassage={errors?.country_of_departure} options={data?.countries || []}*/}
                {/*                       variant={'outlined'} label={'Страна отправителя'}*/}
                {/*                       placeholder={'Страна отправителя'}*/}

                {/*                       {...{*/}
                {/*                           value:*/}
                {/*                               mode !== "add"*/}
                {/*                                   ? data?.countries?.find((opt) => String(opt.id) === formData?.country_of_departure) || null*/}
                {/*                                   : formData?.country_of_departure,*/}
                {/*                       }}*/}
                {/*                       onChange={(val) => {*/}
                {/*                           if (mode !== "add") {*/}
                {/*                               setFormData({*/}
                {/*                                   ...formData,*/}
                {/*                                   country_of_departure: val?.id,*/}
                {/*                               });*/}
                {/*                           } else {*/}
                {/*                               setFormData({*/}
                {/*                                   ...formData,*/}
                {/*                                   country_of_departure: val,*/}
                {/*                               });*/}
                {/*                           }*/}
                {/*                           StateDataOne(val?.id);*/}

                {/*                       }}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <div className={"w-full "}>*/}
                {/*            <SelectMUI errorMassage={errors?.point_of_departure}*/}
                {/*                       options={stateDataOne?.cities_from || []} variant={'outlined'}*/}
                {/*                       label={'Пункт отправления'}*/}
                {/*                       placeholder={'Пункт отправления'}*/}

                {/*                       {...{*/}
                {/*                           value:*/}
                {/*                               mode !== "add"*/}
                {/*                                   ? stateDataOne?.cities_from?.find((opt) => String(opt.id) === formData?.point_of_departure) || null*/}
                {/*                                   : formData?.point_of_departure,*/}
                {/*                       }}*/}
                {/*                       onChange={(val) => {*/}
                {/*                           if (mode !== "add") {*/}
                {/*                               setFormData({*/}
                {/*                                   ...formData,*/}
                {/*                                   point_of_departure: val?.id,*/}
                {/*                               });*/}
                {/*                           } else {*/}
                {/*                               setFormData({*/}
                {/*                                   ...formData,*/}
                {/*                                   point_of_departure: val,*/}
                {/*                               });*/}
                {/*                           }*/}
                {/*                       }}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <div className={"w-full "}>*/}
                {/*            <SelectMUI errorMassage={errors?.country_of_destination} options={data?.countries || []}*/}
                {/*                       variant={'outlined'} label={'Страна получателя'}*/}
                {/*                       placeholder={'Страна получателя'}*/}

                {/*                       {...{*/}
                {/*                           value:*/}
                {/*                               mode !== "add"*/}
                {/*                                   ? data?.countries?.find((opt) => String(opt.id) === formData?.country_of_destination) || null*/}
                {/*                                   : formData?.country_of_destination,*/}
                {/*                       }}*/}
                {/*                       onChange={(val) => {*/}
                {/*                           if (mode !== "add") {*/}
                {/*                               setFormData({*/}
                {/*                                   ...formData,*/}
                {/*                                   country_of_destination: val?.id,*/}
                {/*                               });*/}
                {/*                           } else {*/}
                {/*                               setFormData({*/}
                {/*                                   ...formData,*/}
                {/*                                   country_of_destination: val,*/}
                {/*                               });*/}
                {/*                           }*/}
                {/*                           StateDataTwo(val?.id)*/}

                {/*                       }}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <div className={"w-full "}>*/}
                {/*            <SelectMUI errorMassage={errors?.point_of_destination}*/}
                {/*                       options={stateDataTwo?.cities_to || []} variant={'outlined'}*/}
                {/*                       label={'Пункт назначения'}*/}
                {/*                       placeholder={'Пункт назначения'}*/}
                {/*                // value={formData?.point_of_destination || null}*/}
                {/*                // onChange={(val) => setFormData({...formData, point_of_destination: val})}*/}

                {/*                       {...{*/}
                {/*                           value:*/}
                {/*                               mode !== "add"*/}
                {/*                                   ? stateDataTwo?.cities_to?.find((opt) => String(opt.id) === formData?.point_of_destination) || null*/}
                {/*                                   : formData?.point_of_destination,*/}
                {/*                       }}*/}
                {/*                       onChange={(val) => {*/}
                {/*                           if (mode !== "add") {*/}
                {/*                               setFormData({*/}
                {/*                                   ...formData,*/}
                {/*                                   point_of_destination: val?.id,*/}
                {/*                               });*/}
                {/*                           } else {*/}
                {/*                               setFormData({*/}
                {/*                                   ...formData,*/}
                {/*                                   point_of_destination: val,*/}
                {/*                               });*/}
                {/*                           }*/}

                {/*                       }}*/}
                {/*            />*/}
                {/*        </div>*/}

                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5 dark:bg-darkBgTwo'}>*/}
                {/*    <div className={'grid grid-cols-4 gap-4'}>*/}
                {/*        <div className={" col-span-2"}>*/}
                {/*            <InputMUI errorMassage={errors?.weight_of_cargo}*/}
                {/*                      value={formData?.weight_of_cargo ?? ''}*/}

                {/*                      onChange={(e) =>*/}
                {/*                          setFormData({...formData, weight_of_cargo: e.target.value})*/}
                {/*                      }*/}
                {/*                      variant={'outlined'} label={'Вес перевозимого груза [кг]'}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <div className={"  col-span-2"}>*/}
                {/*            <SelectMUI errorMassage={errors?.status_of_cargo} options={dangerous} variant={'outlined'}*/}
                {/*                       label={'Опасный ли груз?'}*/}
                {/*                       placeholder={'Опасный ли груз?'}*/}
                {/*                // value={formData.status_of_cargo}*/}
                {/*                // onChange={(val) => setFormData({...formData, status_of_cargo: val})}*/}
                {/*                       {...{*/}
                {/*                           value:*/}
                {/*                               mode !== "add"*/}
                {/*                                   ? dangerous.find((opt) => opt.id === formData?.status_of_cargo) || null*/}
                {/*                                   : formData?.status_of_cargo,*/}
                {/*                       }}*/}
                {/*                       onChange={(val) => {*/}
                {/*                           mode !== "add" ? setFormData({*/}
                {/*                               ...formData,*/}
                {/*                               status_of_cargo: val.id*/}
                {/*                           }) : setFormData({...formData, status_of_cargo: val})*/}
                {/*                       }}*/}
                {/*            />*/}
                {/*        </div>*/}

                {/*        <div className={"w-full "}>*/}
                {/*            <div className={'relative'}>*/}
                {/*                <MyCalendar*/}
                {/*                    errorMassage={errors.shipment_date}*/}
                {/*                    value={formData?.shipment_date ?? ''} // misol uchun yangi property*/}
                {/*                    onChange={(val) => setFormData({...formData, shipment_date: val})}/>*/}
                {/*                <p className={`absolute text-[12px] pt-1 px-1 font-medium -top-[14px] left-2 text-[#3B82F6] ${errors.shipment_date ? 'text-red-500' : 'text-[#3B82F6]'} dark:text-darkText bg-white dark:bg-darkBgTwo`}>*/}
                {/*                    Дата погрузки</p>*/}
                {/*                {*/}
                {/*                    errors.shipment_date ?*/}
                {/*                        <p className={'text-[#d32f2f] text-[12px] mt-1 ml-2'}>{errors.shipment_date[0]}</p> : ''*/}
                {/*                }*/}
                {/*            </div>*/}

                {/*        </div>*/}
                {/*        <div className={"w-full "}>*/}
                {/*            <div className={'relative'}>*/}
                {/*                <MyCalendar*/}
                {/*                    errorMassage={errors.unload_date}*/}
                {/*                    value={formData?.unload_date ?? ''} // misol uchun yangi property*/}
                {/*                    onChange={(val) => setFormData({...formData, unload_date: val})}/>*/}
                {/*                <p className={`absolute text-[12px] pt-1 px-1 font-medium -top-[14px] left-2   ${errors.unload_date ? 'text-red-500' : 'text-[#3B82F6]'} dark:text-darkText bg-white dark:bg-darkBgTwo`}>*/}
                {/*                    Дата разгрузки</p>*/}

                {/*                {*/}
                {/*                    errors.unload_date ?*/}
                {/*                        <p className={'text-[#d32f2f] text-[12px] mt-1 ml-2'}>{errors.unload_date[0]}</p> : ''*/}
                {/*                }*/}

                {/*            </div>*/}

                {/*        </div>*/}
                {/*        <div className={"col-span-2"}>*/}
                {/*            <InputMUI errorMassage={errors?.nature_of_cargo} value={formData?.nature_of_cargo ?? ''}*/}
                {/*                      onChange={(e) =>*/}
                {/*                          setFormData({...formData, nature_of_cargo: e.target.value})*/}
                {/*                      }*/}
                {/*                      variant={'outlined'} label={'Наименование перевозимого груза'}*/}
                {/*            />*/}
                {/*        </div>*/}

                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5 dark:bg-darkBgTwo'}>*/}
                {/*    <div className={'grid grid-cols-3 gap-4'}>*/}
                {/*        <div className={" "}>*/}
                {/*            <SelectMUI errorMassage={errors?.payment_condition} options={typePayment}*/}
                {/*                       variant={'outlined'} label={'Тип оплаты'}*/}
                {/*                       placeholder={'Тип оплаты'}*/}
                {/*                // value={formData?.payment_condition || null}*/}
                {/*                // onChange={(val) => setFormData({...formData, payment_condition: val})}*/}
                {/*                       {...{*/}
                {/*                           value:*/}
                {/*                               mode !== "add"*/}
                {/*                                   ? typePayment.find((opt) => opt.value === Number(formData?.payment_condition)) || null*/}
                {/*                                   : formData?.payment_condition,*/}
                {/*                       }}*/}
                {/*                       onChange={(val) => {*/}
                {/*                           mode !== "add" ? setFormData({*/}
                {/*                               ...formData,*/}
                {/*                               payment_condition: val.value*/}
                {/*                           }) : setFormData({...formData, payment_condition: val})*/}
                {/*                       }}*/}
                {/*            />*/}


                {/*        </div>*/}
                {/*        <div className={""}>*/}
                {/*            <InputMUI errorMassage={errors?.sender_contact} value={formData?.sender_contact ?? ''}*/}
                {/*                      onChange={(e) =>*/}
                {/*                          setFormData({...formData, sender_contact: e.target.value})*/}
                {/*                      }*/}
                {/*                      variant={'outlined'} label={'Контакты отправителя'}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <div className={""}>*/}
                {/*            <InputMUI errorMassage={errors?.receiver_contact} value={formData?.receiver_contact ?? ''}*/}
                {/*                      onChange={(e) =>*/}
                {/*                          setFormData({...formData, receiver_contact: e.target.value})*/}
                {/*                      } variant={'outlined'} label={'Контакты получателя (декларант)'}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*</div>*/}


            </div>
        </div>
    );
}

export default AddQueries;