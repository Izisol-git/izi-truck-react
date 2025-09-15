import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addDriver, driversGetId, editDriver} from "../../features/Drivers/driversThunks.js";
import { InputMUI, SelectMUI} from "../index.js";
import FileButton from "../Buttons/fileButton.jsx";
import { useTranslation } from "react-i18next";
import {Button} from "@mui/material";

function DriversFrom({mode}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

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
    const [driversPhone, setDriversPhone] = useState([{id: Date.now(), phone: ""}]);
    const [driversAddFile, setDriversAddFile] = useState([]);
    const loading = useSelector((state) => state.drivers.loadingAddDrivers);

    // edit uchun id olish
    const DriversId = async (id) => {
        const res = await dispatch(driversGetId(id));
        setEditDriversArry(res.payload.driver);
    };
    useEffect(() => {
        if(mode === "edit") {
            DriversId(localStorage.getItem('driversId'));
        }
    }, []);

    // Edit inputlarni to‘ldirish
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
            setCarCondition(
                top100Films.find((opt) => String(opt.id) === String(EditDriversArry?.condition)) || null
            );
            setCarType(
                carTypeArray?.find((opt) => String(opt.id) === String(EditDriversArry?.type)) || null
            );
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

    // transport types olish
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
                setCarTypeArray(res.data.transport_types);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    // telefon dinamik
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
        {title: t("drivers.driversForm.condition.new"), id: 1},
        {title: t("drivers.driversForm.condition.good"), id: 2},
        {title: t("drivers.driversForm.condition.satisfactory"), id: 3},
    ];

    // fayllar
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
        setDriversPhone([{phone: ""}]);
        setCarCondition(null);
        setCarType(null);
    };

    // submit qilish
    const AddhandleSubmit = async () => {
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
            condition: carCondition.id,
            type: carType.id,
        };
        dispatch(addDriver(driverData))
            .unwrap()
            .then(() => {
                resetForm();
                navigate("/users/drivers");
            })
            .catch((err) => setError(err.errors));
    };

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
            .catch((err) => console.error(err));
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
                        <Button  sx={{
                            background: '#1D2D5B',
                            '.dark &': {
                                background: '#2B4764',
                            }
                        }} variant={'contained'}>
                            <i className="fa-solid fa-right-from-bracket mr-2"></i>
                            {t("drivers.driversForm.back")}
                        </Button>
                    </div>
                    <p className="text-blue font-bold text-xl dark:text-darkText">
                        {mode === 'add'
                            ? t("drivers.driversForm.addTitle")
                            : t("drivers.driversForm.editTitle")}
                    </p>
                </div>

                {/* FIO + telefon */}
                <div className="flex items-center gap-4">
                    <div className="w-full">
                        <InputMUI
                            errorMassage={error?.fio}
                            variant="outlined"
                            label={t("drivers.driversForm.fullName")}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <div className="flex items-center gap-2">
                            <InputMUI
                                errorMassage={error?.['phone_number.0']}
                                variant="outlined"
                                label={t("drivers.driversForm.phoneNumber")}
                                value={driversPhone[0]?.phone}
                                onChange={(e) => handlePhoneChange(driversPhone[0].id, e.target.value)}
                            />
                            <button
                                onClick={handleDriversPhone}
                                className="px-3 py-2 whitespace-nowrap bg-blue w-max text-white rounded flex items-center dark:bg-btnBgDark"
                            >
                                <i className="fa-solid fa-plus mr-2"></i>
                                {t("drivers.driversForm.addPhone")}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Qo‘shimcha telefon */}
                <div className="grid grid-cols-3 gap-4 mt-5">
                    {driversPhone.slice(1).map((driver, index) => (
                        <div
                            key={driver.id}
                            className="w-full relative group py-2 -mt-2 overflow-hidden"
                        >
                            <InputMUI
                                errorMassage={error?.[`phone_number.${index}`]}
                                variant="outlined"
                                label={`${t("drivers.driversForm.phoneNumber")} ${index + 2}`}
                                value={driver.phone}
                                onChange={(e) => handlePhoneChange(driver.id, e.target.value)}
                            />
                            <div
                                onClick={() => handleDriversPhoneRemove(driver.id)}
                                className="absolute top-1/2 -translate-y-1/2 -right-10
                           group-hover:right-1 transition-all ease-in-out duration-300
                           bg-red-500 cursor-pointer w-[33px] h-[33px] rounded
                           flex items-center justify-center text-[14px]">
                                <i className="fa-solid fa-trash text-white"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Car info */}
            <div className="w-[90%] bg-white px-4 mx-auto py-5 rounded-md shadow mt-5 dark:bg-darkBgTwo">
                <div className="grid grid-cols-3 gap-4">
                    <InputMUI label={t("drivers.driversForm.brand")} value={carBrand} onChange={(e)=>setCarBrand(e.target.value)} />
                    <InputMUI label={t("drivers.driversForm.width")} value={carWidth} onChange={(e)=>setCarWidth(e.target.value)} />
                    <SelectMUI label={t("drivers.driversForm.condition.label")} value={carCondition} onChange={setCarCondition} options={top100Films} />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5">
                    <InputMUI label={t("drivers.driversForm.height")} value={carHeight} onChange={(e)=>setCarHeight(e.target.value)} />
                    <SelectMUI label={t("drivers.driversForm.type")} value={carType} onChange={setCarType} options={carTypeArray || []} />
                    <InputMUI label={t("drivers.driversForm.trailerNumber")} value={trailerNumber} onChange={(e)=>setTrailerNumber(e.target.value)} />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5">
                    <InputMUI label={t("drivers.driversForm.number")} value={carNumber} onChange={(e)=>setCarNumber(e.target.value)} />
                    <InputMUI label={t("drivers.driversForm.capacity")} value={carCapacity} onChange={(e)=>setCarCapacity(e.target.value)} />
                    <InputMUI label={t("drivers.driversForm.length")} value={carLength} onChange={(e)=>setCarLength(e.target.value)} />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5">
                    <InputMUI label={t("drivers.driversForm.carrying")} value={carLoad} onChange={(e)=>setCarLoad(e.target.value)} />
                </div>

                {/* Fayllar */}
                <div className="grid grid-cols-6 gap-4 mt-5">
                    <FileButton/>
                    {driversAddFile.map((file) => (
                        <div key={file.id} className="flex center gap-2 relative">
                            <FileButton/>
                            <div onClick={() => handleFileRemove(file.id)} className="absolute -top-1/4 right-1">
                                <i className="fa-solid fa-square-xmark text-2xl text-red-500"></i>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={handleAddFile}
                        className="px-3 py-2 whitespace-nowrap bg-blue w-max text-white rounded flex items-center dark:bg-btnBgDark"
                    >
                        <i className="fa-solid fa-plus mr-2"></i>
                        {t("drivers.driversForm.addFile")}
                    </button>
                </div>

                {/* Action buttons */}
                <div className="py-5 w-full flex items-center justify-end gap-4">
                    <Button
                        sx={{
                            background:"#1D2D5B"
                        }}
                        size={'large'} variant={'contained'} onClick={() => navigate(`/users/drivers`)}
                            >
                        {t("drivers.driversForm.close")}
                    </Button>
                    <Button
                        sx={{
                            background:"#1D2D5B"
                        }}
                        size={'large'}  variant={'contained'}  onClick={()=>{ mode === 'add' ? AddhandleSubmit() : EdithandleSubmit();}}
                           >
                        {!loading ? t("drivers.driversForm.addBtn") : t("drivers.driversForm.adding")}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DriversFrom;
