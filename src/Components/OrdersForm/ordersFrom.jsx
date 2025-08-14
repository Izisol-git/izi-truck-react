import React, {useState} from 'react';
import {Button, CurrencyInput, InputMUI, LocationInput, MyCalendar, SelectMUI, SwitchMUI} from "../index.js";
import {useNavigate} from "react-router-dom";

function OrdersFrom() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([

    ]);

    const handleAdd = () => {
        setRows([...rows, { id: Date.now(), contact: "", price: "" }]);
    };

    const handleRemove = (id) => {
        setRows(rows.filter(row => row.id !== id));
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
                        <p className={'text-blue font-bold text-xl'}>Byurtma yaratish</p>
                    </div>

                    <div className={'flex items-center gap-4'}>
                        <div className={"w-full "}>
                            <SelectMUI variant={'outlined'} label={'Operation'}
                                       placeholder={'Operation'}/>
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI variant={'outlined'} label={'Клиент'}
                                       placeholder={'Клиент'}/>
                        </div>
                    </div>
                    <div className={'flex items-center gap-4 mt-5'}>
                        <div className={"w-full "}>
                            <SelectMUI variant={'outlined'} label={'Компания посредник'}
                                       placeholder={'Компания посредник'}/>
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI variant={'outlined'} label={'НДС'}
                                       placeholder={'НДС'}/>
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI variant={'outlined'} label={'Тип услуги'}
                                       placeholder={'Тип услуги'}/>
                        </div>
                    </div>
                </div>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5'}>
                    <div className={'grid grid-cols-3 gap-4'}>

                        <div className={"w-full "}>
                            {/*<p className={'font-semibold text-blue mb-2'}>Стоимость перевозчика</p>*/}
                            <p className={'text-blue  mb-3'}>Перечисление</p>
                            <CurrencyInput label={'Стоимость перевозчика'}/>
                        </div>
                        <div className={"w-full "}>
                            {/*<p className={'font-semibold text-blue mb-2'}>Цена клиента</p>*/}
                            <p className={'text-blue  mb-3'}>Перечисление</p>
                            <CurrencyInput label={'Цена клиента'}/>

                        </div>
                        <div className={"w-full "}>
                            {/*<p className={'font-semibold text-blue mb-2'}>Маржа</p>*/}
                            <p className={'text-blue  mb-3'}>Перечисление</p>
                            <CurrencyInput label={'Маржа'}/>
                        </div>
                    </div>
                    <div className={'grid grid-cols-3 gap-4 mt-5'}>
                        <div className={" "}>
                            <CurrencyInput label={'Стоимость груза'}/>
                        </div>

                    </div>
                </div>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5'}>
                    <div className={'grid grid-cols-3 gap-4'}>
                        <div className={"w-full "}>
                            <SelectMUI variant={'outlined'} label={'Тип перевозки'}
                                       placeholder={'Тип перевозки'}/>
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI variant={'outlined'} label={'Объем транспортного средства'}
                                       placeholder={'Объем транспортного средства'}/>
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI variant={'outlined'} label={'Тип транспортного средства'}
                                       placeholder={'Тип транспортного средства'}/>
                        </div>
                    </div>
                </div>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5'}>
                    <div className={'grid grid-cols-4 gap-4'}>
                        <div className={" col-span-2"}>
                            <LocationInput label={'Локация отправителя'}/>
                        </div>
                        <div className={"  col-span-2"}>
                            <LocationInput label={'Локация получателя'}/>
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI variant={'outlined'} label={'Страна отправителя'}
                                       placeholder={'Страна отправителя'}/>
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI variant={'outlined'} label={'Пункт отправления'}
                                       placeholder={'Пункт отправления'}/>
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI variant={'outlined'} label={'Страна получателя'}
                                       placeholder={'Страна получателя'}/>
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI variant={'outlined'} label={'Пункт назначения'}
                                       placeholder={'Пункт назначения'}/>
                        </div>
                        <div className={"col-span-2 "}>
                            <InputMUI variant={'outlined'} label={'Адрес таможенного оформления(код поста)'}
                            />
                        </div>
                        <div className={"col-span-2 "}>
                            <InputMUI variant={'outlined'} label={'Адрес таможенного оформления(код поста)'}
                            />
                        </div>
                    </div>
                </div>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5'}>
                    <div className={'grid grid-cols-4 gap-4'}>
                        <div className={" col-span-2"}>
                            <InputMUI variant={'outlined'} label={'Вес перевозимого груза [кг]'}
                            />
                        </div>
                        <div className={"  col-span-2"}>
                            <SelectMUI variant={'outlined'} label={'Опасный ли груз?'}
                                       placeholder={'Опасный ли груз?'}/>
                        </div>
                        <div className={"w-full "}>
                            <MyCalendar/>
                        </div>
                        <div className={"w-full "}>
                            <MyCalendar/>
                        </div>
                        <div className={"w-full "}>
                            <MyCalendar/>
                        </div>
                        <div className={"w-full "}>
                            <InputMUI variant={'outlined'} label={'Адрес таможенного оформления(код поста)'}
                            />
                        </div>
                        <div className={'grid grid-cols-3 col-span-full    gap-4'}>
                            <div className={""}>
                                <SelectMUI variant={'outlined'} label={'Вид погрузки'}
                                           placeholder={'Вид погрузки'}/>
                            </div>
                            <div className={"  "}>
                                <InputMUI variant={'outlined'} label={'Наименование перевозимого груза'}
                                />
                            </div>
                            <div className={"  "}>
                                <InputMUI variant={'outlined'} label={'Количество мест'}
                                />
                            </div>
                        </div>
                        <div className={"col-span-full  "}>
                            <InputMUI variant={'outlined'} label={'Особые условия'}
                            />
                        </div>
                    </div>
                </div>
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5'}>
                    <div className={'grid grid-cols-3 gap-4'}>
                        <div className={" "}>
                            <SelectMUI variant={'outlined'} label={'Тип оплаты'}
                                       placeholder={'Тип оплаты'}/>
                        </div>

                        <div className={""}>
                            <InputMUI variant={'outlined'} label={'Контакты отправителя'}
                            />
                        </div>
                        <div className={""}>
                            <InputMUI variant={'outlined'} label={'Контакты получателя (декларант)'}
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
                                <InputMUI variant={'outlined'} label={'Контакты получателя (декларант)'}
                                />
                            </div>
                            <div className={" "}>
                                <CurrencyInput label={'Стоимость груза'}/>
                            </div>
                        </div>

                        {rows.map((row) => (
                            <div key={row.id} className="grid grid-cols-3 col-span-full gap-4">
                                <div className="col-span-2">
                                    <InputMUI variant="outlined" label="Контакты получателя (декларант)"/>
                                </div>
                                <div className="flex items-center gap-4 w-full pr-2">
                                    <div className="w-full">
                                        <CurrencyInput label="Стоимость груза"/>
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
                        <button

                            className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out  hover:text-white hover:bg-blue py-2 px-3"
                        >
                            Add

                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default OrdersFrom;