import React, {useState} from 'react';
import {
    Button,
    CurrencyInput,
    InputMUI,
    LocationInput,
    MyCalendar,
    SelectMUI,
    SwitchMUI

} from "../../../Components/index.js";
import {useNavigate} from "react-router-dom";
import FileButton from "../../../Components/Buttons/fileButton.jsx";

function AddDrivers() {


    const navigate = useNavigate();


    const [driversPhone, setDriversPhone] = useState([])
    const [driversAddFile, setDriversAddFile] = useState([])
    const handleDriversPhone = () => {
        setDriversPhone([...driversPhone, {id: Date.now(), phone: ""}]);
    }
    const handleDriversPhoneRemove = (id) => {
        setDriversPhone(driversPhone.filter(item => item.id !== id));
    }

    const handleAddFile =()=>{
        setDriversAddFile([...driversAddFile, {id: Date.now(), file: ""}]);
    }
    const handleFileRemove = (id) => {
        setDriversAddFile(driversAddFile.filter(item => item.id !== id));
    }



    //
    // const handleAdd = () => {
    //     setRows([...rows, { id: Date.now(), contact: "", price: "" }]);
    // };
    //
    // const handleRemove = (id) => {
    //     setRows(rows.filter(row => row.id !== id));
    // };


    return (
        <div>
            <div className={'bg-bacWhite w-full min-h-[calc(100dvh-70px)] py-5'}>
                {/*<div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow'}>*/}

                {/*</div>*/}
                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow'}>

                    <div className={'h-[40px] gap-4 relative text-center center  w-full   mb-10'}>
                        <div className={'w-max  absolute top-0 left-0'} onClick={() => navigate(`/users/drivers`)}>
                            <Button icon={<i className="fa-solid fa-arrow-left"></i>} value={'Drivers'}/>
                        </div>
                        <p className={'text-blue font-bold text-xl'}>Haydovchilarni Qo'shish</p>
                    </div>

                    <div className={'flex items-center gap-4'}>
                        <div className={"w-full "}>
                            <InputMUI variant={'outlined'} label={'ФИО'}
                            />
                        </div>
                        <div className={"w-full "}>
                            <div className="flex items-center gap-2">
                                <InputMUI
                                    variant="outlined"
                                    label="Номер телефона"
                                />

                                <button
                                    onClick={handleDriversPhone}
                                    className="px-3 py-2 whitespace-nowrap bg-blue w-max text-white rounded flex items-center"
                                >
                                    <i className="fa-solid fa-plus mr-2"></i>
                                    Add phone
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className={'grid grid-cols-3 gap-4 mt-5'}>
                        {
                            driversPhone.map((driver, index) => {
                                return (
                                    <div key={driver.id} className="w-full relative group py-2 -mt-2 overflow-hidden">
                                        <InputMUI
                                            variant="outlined"
                                            label={`Номер телефона ${index+2}`}
                                        />

                                        <div
                                            onClick={() => handleDriversPhoneRemove(driver.id)}
                                            className="absolute top-1/2 -translate-y-1/2 -right-10
                                                       group-hover:right-1
                                                       transition-all ease-in-out duration-300
                                                       bg-red-500 cursor-pointer w-[33px] h-[33px] rounded
                                                       flex items-center justify-center text-[14px]"
                                                                                >
                                            <i className="fa-solid fa-trash text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>

                <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow mt-5'}>

                    <div className={'grid grid-cols-3 gap-4 '}>
                        <div className={"w-full "}>
                            <InputMUI variant={'outlined'} label={'Марка автомобиля'}
                            />
                        </div>
                        <div className={"w-full "}>
                            <InputMUI variant={'outlined'} label={'Ширина автомобиля (метр)'}
                            />
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI variant={'outlined'} label={'Состояние автомобиля'}
                                       placeholder={'Состояние автомобиля'}/>
                        </div>
                    </div>
                    <div className={'grid grid-cols-3 gap-4 mt-5'}>
                        <div className={"w-full "}>
                            <InputMUI variant={'outlined'} label={'Высота автомобиля (метр)'}
                            />
                        </div>
                        <div className={"w-full "}>
                            <SelectMUI variant={'outlined'} label={'Тип автомобиля'}
                                       placeholder={'Тип автомобиля'}/>
                        </div>
                        <div className={"w-full "}>
                            <InputMUI variant={'outlined'} label={'Номер полу прицепа'}
                            />
                        </div>
                    </div>
                    <div className={'grid grid-cols-3 gap-4 mt-5'}>
                        <div className={"w-full "}>
                            <InputMUI variant={'outlined'} label={'Номер автомобиля'}
                            />
                        </div>
                        <div className={"w-full "}>
                            <InputMUI variant={'outlined'} label={'Вместимость автомобиля (М/куб)'}
                            />
                        </div>
                        <div className={"w-full "}>
                            <InputMUI variant={'outlined'} label={'Длина автомобиля (метр)'}
                            />
                        </div>
                    </div>
                    <div className={'grid grid-cols-3 gap-4 mt-5'}>
                        <div className={"w-full "}>
                            <InputMUI variant={'outlined'} label={'Грузоподъемность автомобиля'}
                            />
                        </div>
                    </div>
                    <div className={'grid grid-cols-6 gap-4 mt-5'}>
                        <div className={"  "}>
                            <FileButton/>
                        </div>
                        {
                            driversAddFile.map((file, index) => {
                                return (
                                    <div key={file.id} className={"  flex center gap-2 relative"}>
                                        <FileButton/>
                                        {/*<div*/}
                                        {/*    onClick={() => handleFileRemove(file.id)}*/}
                                        {/*    className="*/}
                                        {/*               bg-red-500 cursor-pointer w-[30px] h-[30px] rounded*/}
                                        {/*               flex items-center justify-center text-[14px]"*/}
                                        {/*>*/}
                                        {/*    <i className="fa-solid fa-trash text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>*/}
                                        {/*</div>*/}


                                        <div onClick={()=> handleFileRemove(file.id)} className={'absolute -top-1/4 right-1 bg-bacWhite p-0 rounded  '}>
                                            {/*<i className="fa-solid fa-delete-left "></i>*/}
                                            <i className="fa-solid fa-square-xmark text-2xl text-red-500 cursor-pointer w-full h-full m-0"></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <button
                            onClick={handleAddFile}
                            className="px-3 py-2 whitespace-nowrap bg-blue w-max text-white rounded flex items-center"
                        >
                            <i className="fa-solid fa-plus mr-2"></i>
                            Add File
                        </button>
                    </div>


                    <div className={'py-5 w-full flex items-center justify-end gap-4'}>
                        <button
                            onClick={() => navigate(`/users/drivers`)}
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

export default AddDrivers;