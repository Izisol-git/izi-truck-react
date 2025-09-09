import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addDriver, driversGetId, editDriver} from "../../features/Drivers/driversThunks.js";
import {Button, InputMUI, SelectMUI} from "../index.js";
import FileButton from "../Buttons/fileButton.jsx";

function DriversFrom({mode}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // oddiy inputlar uchun state
    const [fullName, setFullName] = useState("");
    const [carBrand, setCarBrand] = useState("");
    const [carWidth, setCarWidth] = useState("");
    const [carHeight, setCarHeight] = useState("");
    const [carLength, setCarLength] = useState("");
    const [carCapacity, setCarCapacity] = useState("");
    const [carLoad, setCarLoad] = useState("");
    const [carNumber, setCarNumber] = useState("");
    const [trailerNumber, setTrailerNumber] = useState("");
    const [carCondition, setCarCondition] = useState("");
    const [carType, setCarType] = useState("");
    const [carTypeArray, setCarTypeArray] = useState();
    const [error, setError] = useState();
    const [EditDriversArry, setEditDriversArry] = useState();
    // dinamik telefon raqamlar
    const [driversPhone, setDriversPhone] = useState([{id: Date.now(), phone: ""}]);
    const loading = useSelector((state) => state.drivers.loadingAddDrivers);
    const addEditToggleDrivers = useSelector((state) => state.employesModal.addEditToggleDrivers);
    // const EditDriversArry = useSelector((state) => state.employesModal.editDriversArry);



    const DriversId = async (id) => {
        const res = await dispatch(driversGetId(id))
        setEditDriversArry(res.payload.driver)
        console.log(res)
    }
    useEffect(() => {
        if(mode === "edit") {
            DriversId(localStorage.getItem('driversId'))
        }
    }, [])

    // Edit sahifaga kirganda inputlarni to‘ldirish
    useEffect(() => {
        if (EditDriversArry) {
            setFullName(EditDriversArry?.fio || "");
            setCarBrand(EditDriversArry?.brand || "");
            setCarNumber(EditDriversArry?.number || "");
            setCarWidth(EditDriversArry?.width || "");
            setCarHeight(EditDriversArry?.height || "");
            setCarLength(EditDriversArry?.length || "");
            setCarCapacity(EditDriversArry?.capacity || "");
            setCarLoad(EditDriversArry?.carrying || "");
            setTrailerNumber(EditDriversArry?.trailer_number || "");

            // Select qiymatlarni o'rnatish
            setCarCondition(
                top100Films.find((opt) => String(opt.id) === String(EditDriversArry?.condition)) || null
            );
            setCarType(
                carTypeArray?.find((opt) => String(opt.id) === String(EditDriversArry?.type)) || null
            );
            // Telefon raqamlarni o‘rnatish
            if (Array.isArray(EditDriversArry?.phone_number)) {
                setDriversPhone(
                    EditDriversArry?.phone_number.map((p, index) => ({
                        id: Date.now() + index,
                        phone: p,
                    }))
                );
            } else {
                setDriversPhone([{id: Date.now(), phone: ""}]);
            }
        }
    }, [EditDriversArry]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "https://backend.izitruck.uz/api/drivers/create",
                    {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                console.log(res.data); // data shu yerda
                setCarTypeArray(res.data.transport_types);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);



    const handleDriversPhone = () => {
        setDriversPhone([...driversPhone, {id: Date.now(), phone: ""}]);
    };
    const handleDriversPhoneRemove = (id) => {
        setDriversPhone(driversPhone.filter((item) => item.id !== id));
    };
    const handlePhoneChange = (id, value) => {
        setDriversPhone(
            driversPhone.map((item) =>
                item.id === id ? {...item, phone: value} : item
            )
        );
    };
    const top100Films = [
        {title: 'Новый', id: 1},
        {title: 'Хороший', id: 2},
        {title: 'Удовлетворительно', id: 3},
    ];

    // dinamik fayllar
    const [driversAddFile, setDriversAddFile] = useState([]);
    const handleAddFile = () => {
        setDriversAddFile([...driversAddFile, {id: Date.now(), file: ""}]);
    };
    const handleFileRemove = (id) => {
        setDriversAddFile(driversAddFile.filter((item) => item.id !== id));
    };
    const resetForm = () => {
        setFullName("");
        setCarBrand("");
        setCarNumber("");
        setCarWidth("");
        setCarHeight("");
        setCarLength("");
        setCarCapacity("");
        setCarLoad("");
        setTrailerNumber("");
        setDriversPhone([{phone: ""}]); // boshlang‘ich qiymat
        setCarCondition(null);
        setCarType(null);
    };

    // submit qilish
    const AddhandleSubmit = async () => {
        const driverData = {
            fio: fullName,
            phone_number: driversPhone.map((item) => item.phone), // faqat phone yuboramiz
            brand: carBrand,
            width: carWidth,
            height: carHeight,
            length: carLength,
            capacity: carCapacity,
            carrying: carLoad,
            number: carNumber,
            trailer_number: trailerNumber,
            condition: carCondition.id, // integer yuborish kerak
            type: carType.id,           // integer yuborish kerak
        };

        dispatch(addDriver(driverData))
            .unwrap()
            .then(() => {
                resetForm()
                navigate("/users/drivers");
            })
            .catch((err) => {
                console.error(err);
                setError(err.errors)
            });

        console.log("Driver data:", driverData);
    };



    // Submit
    const EdithandleSubmit = async () => {
        const driverData = {
            fio: fullName,
            phone_number: driversPhone.map((item) => item.phone),
            brand: carBrand,
            width: carWidth,
            height: carHeight,
            length: carLength,
            capacity: carCapacity,
            carrying: carLoad,
            number: carNumber,
            trailer_number: trailerNumber,
            condition: carCondition?.id,
            type: carType?.id,
        };
        dispatch(editDriver({id: localStorage.getItem('driversId'), driverData: driverData}))
            .unwrap()
            .then(() => {
                resetForm();
                navigate("/users/drivers");
            })
            .catch((err) => {
                console.error(err);
            });

        console.log("Driver data:", driverData);
    };

    return (
        <div className="bg-bacWhite w-full min-h-[calc(100dvh-70px)] py-5 dark:bg-darkBg">
            <div className="w-[90%] bg-white px-4 mx-auto py-5 rounded-md shadow dark:bg-darkBgTwo">
                {/* Header */}
                <div className="h-[40px] gap-4 relative text-center center w-full mb-10">
                    <div
                        className="w-max absolute top-0 left-0"
                        onClick={() => navigate(`/users/drivers`)}
                    >
                        <Button
                            color={'dark:bg-btnBgDark'}
                            icon={<i className="fa-solid fa-arrow-left"></i>}
                            value={"Drivers"}
                        />
                    </div>
                    <p className="text-blue font-bold text-xl dark:text-darkText">{
                        mode === 'add' ? " Haydovchilarni Qo'shish" : "Haydovchilarni Tahrirlash"
                    }</p>
                </div>

                {/* FIO + telefon */}
                <div className="flex items-center gap-4">
                    <div className="w-full">
                        <InputMUI
                            errorMassage={error?.fio}
                            variant="outlined"
                            label="ФИО"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <div className="flex items-center gap-2">
                            <InputMUI
                                errorMassage={error?.['phone_number.0']}
                                variant="outlined"
                                label="Номер телефона"
                                value={driversPhone[0]?.phone}
                                onChange={(e) => handlePhoneChange(driversPhone[0].id, e.target.value)}
                            />

                            <button
                                onClick={handleDriversPhone}
                                className="px-3 py-2 whitespace-nowrap bg-blue w-max text-white rounded flex items-center dark:bg-btnBgDark"
                            >
                                <i className="fa-solid fa-plus mr-2"></i>
                                Add phone
                            </button>
                        </div>
                    </div>
                </div>

                {/* Qo‘shimcha telefon raqamlari */}
                <div className="grid grid-cols-3 gap-4 mt-5">
                    {driversPhone.slice(1).map((driver, index) => (
                        <div
                            key={driver.id}
                            className="w-full relative group py-2 -mt-2 overflow-hidden"
                        >
                            <InputMUI
                                errorMassage={error?.[`phone_number.${index}`]}
                                variant="outlined"
                                label={`Номер телефона ${index + 2}`}
                                value={driver.phone}
                                onChange={(e) => handlePhoneChange(driver.id, e.target.value)}
                            />
                            <div
                                onClick={() => handleDriversPhoneRemove(driver.id)}
                                className="absolute top-1/2 -translate-y-1/2 -right-10
                           group-hover:right-1 transition-all ease-in-out duration-300
                           bg-red-500 cursor-pointer w-[33px] h-[33px] rounded
                           flex items-center justify-center text-[14px]"
                            >
                                <i className="fa-solid fa-trash text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Car info */}
            <div className="w-[90%] bg-white px-4 mx-auto py-5 rounded-md shadow mt-5 dark:bg-darkBgTwo">
                <div className="grid grid-cols-3 gap-4">
                    <InputMUI
                        errorMassage={error?.brand}
                        variant="outlined"
                        label="Марка автомобиля"
                        value={carBrand}
                        onChange={(e) => setCarBrand(e.target.value)}
                    />
                    <InputMUI
                        errorMassage={error?.width}
                        variant="outlined"
                        label="Ширина автомобиля (метр)"
                        value={carWidth}
                        onChange={(e) => setCarWidth(e.target.value)}
                    />
                    <SelectMUI
                        errorMassage={error?.condition}
                        variant="outlined"
                        label="Состояние автомобиля"
                        value={carCondition}
                        onChange={setCarCondition}
                        placeholder="Состояние автомобиля"
                        options={top100Films}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5">
                    <InputMUI
                        errorMassage={error?.height}
                        variant="outlined"
                        label="Высота автомобиля (метр)"
                        value={carHeight}
                        onChange={(e) => setCarHeight(e.target.value)}
                    />
                    <SelectMUI
                        errorMassage={error?.type}
                        variant="outlined"
                        label="Тип автомобиля"
                        value={carType}
                        onChange={setCarType}
                        placeholder="Тип автомобиля"
                        options={carTypeArray || []}
                    />
                    <InputMUI
                        errorMassage={error?.trailer_number}
                        variant="outlined"
                        label="Номер полу прицепа"
                        value={trailerNumber}
                        onChange={(e) => setTrailerNumber(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5">
                    <InputMUI
                        errorMassage={error?.number}
                        variant="outlined"
                        label="Номер автомобиля"
                        value={carNumber}
                        onChange={(e) => setCarNumber(e.target.value)}
                    />
                    <InputMUI
                        errorMassage={error?.capacity}
                        variant="outlined"
                        label="Вместимость автомобиля (М/куб)"
                        value={carCapacity}
                        onChange={(e) => setCarCapacity(e.target.value)}
                    />
                    <InputMUI
                        errorMassage={error?.length}
                        variant="outlined"
                        label="Длина автомобиля (метр)"
                        value={carLength}
                        onChange={(e) => setCarLength(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5">
                    <InputMUI
                        errorMassage={error?.carrying}
                        variant="outlined"
                        label="Грузоподъемность автомобиля"
                        value={carLoad}
                        onChange={(e) => setCarLoad(e.target.value)}
                    />
                </div>

                {/* Fayllar */}
                <div className="grid grid-cols-6 gap-4 mt-5">
                    <FileButton/>
                    {driversAddFile.map((file) => (
                        <div key={file.id} className="flex center gap-2 relative">
                            <FileButton/>
                            <div
                                onClick={() => handleFileRemove(file.id)}
                                className="absolute -top-1/4 right-1 bg-bacWhite p-0 rounded"
                            >
                                <i className="fa-solid fa-square-xmark text-2xl text-red-500 cursor-pointer"></i>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={handleAddFile}
                        className="px-3 py-2 whitespace-nowrap bg-blue w-max text-white rounded flex items-center dark:bg-btnBgDark "
                    >
                        <i className="fa-solid fa-plus mr-2"></i>
                        Add File
                    </button>
                </div>

                {/* Action buttons */}
                <div className="py-5 w-full flex items-center justify-end gap-4">
                    <button
                        onClick={() => navigate(`/users/drivers`)}
                        className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out hover:text-white hover:bg-blue py-2 px-3 dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText"
                    >
                        Close
                    </button>
                    <button
                        onClick={()=>{
                            mode === 'add' ? AddhandleSubmit() : EdithandleSubmit();
                        }}
                        className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out hover:text-white hover:bg-blue py-2 px-3 dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText"
                    >
                        {
                            !loading ? "Add" : "Adding...."
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DriversFrom;