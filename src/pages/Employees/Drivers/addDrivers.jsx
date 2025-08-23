import React, {useEffect, useState} from "react";
import {
    Button,
    InputMUI,
    SelectMUI
} from "../../../Components/index.js";
import {useNavigate} from "react-router-dom";
import FileButton from "../../../Components/Buttons/fileButton.jsx";
import {addDriver, getDrivers} from "../../../features/Drivers/driversThunks.js";
import {addEmployee} from "../../../features/Employees/employeeThunks.js";
import {closeModal} from "../../../features/EmployeSModalToggle/employesModalToggle.js";
import {useDispatch, useSelector} from "react-redux";

function AddDrivers() {
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

    // dinamik telefon raqamlar
    const [driversPhone, setDriversPhone] = useState([{id: Date.now(), phone: ""}]);
    const loading = useSelector((state) => state.drivers.loadingAddDrivers);
    const addEditToggleDrivers = useSelector((state) => state.employesModal.addEditToggleDrivers);

    const EditDriversArry = useSelector((state) => state.employesModal.editDriversArry);










    //
    // useEffect(() => {
    //     console.log(EditDriversArry)
    //     if(!addEditToggleDrivers){
    //         setFullName(EditDriversArry?.fio);
    //         setCarBrand(EditDriversArry?.brand);
    //         setCarNumber(EditDriversArry?.number);
    //         setCarWidth(EditDriversArry?.width);
    //         setCarHeight(EditDriversArry?.height);
    //         setCarLength(EditDriversArry?.length);
    //         setCarCapacity(EditDriversArry?.capacity);
    //         setCarLoad(EditDriversArry?.carrying);
    //         setTrailerNumber(EditDriversArry?.trailer_number);
    //         setDriversPhone(EditDriversArry?.phone_number ); // boshlang‘ich qiymat
    //         setCarCondition(EditDriversArry?.condition);
    //         setCarType(EditDriversArry?.type);
    //     }
    // },[] )





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
        {title: 122, year: 1994},
        {title: 3434, year: 1972},
        {title: 5665, year: 2008},
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
        setDriversPhone([{ phone: "" }]); // boshlang‘ich qiymat
        setCarCondition(null);
        setCarType(null);
    };

    // submit qilish
    const handleSubmit = async () => {
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
            condition: carCondition.title, // integer yuborish kerak
            type: carType.title,           // integer yuborish kerak
        };

        dispatch(addDriver(driverData))
            .unwrap()
            .then(() => {
                resetForm()
                navigate("/users/drivers");
            })
            .catch((err) => {
                console.error(err);

            });

        console.log("Driver data:", driverData);
    };


    return (
        <div className="bg-bacWhite w-full min-h-[calc(100dvh-70px)] py-5">
            <div className="w-[90%] bg-white px-4 mx-auto py-5 rounded-md shadow">
                {/* Header */}
                <div className="h-[40px] gap-4 relative text-center center w-full mb-10">
                    <div
                        className="w-max absolute top-0 left-0"
                        onClick={() => navigate(`/users/drivers`)}
                    >
                        <Button
                            icon={<i className="fa-solid fa-arrow-left"></i>}
                            value={"Drivers"}
                        />
                    </div>
                    <p className="text-blue font-bold text-xl">Haydovchilarni Qo'shish</p>
                </div>

                {/* FIO + telefon */}
                <div className="flex items-center gap-4">
                    <div className="w-full">
                        <InputMUI
                            variant="outlined"
                            label="ФИО"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <div className="flex items-center gap-2">
                            <InputMUI
                                variant="outlined"
                                label="Номер телефона"
                                value={driversPhone[0]?.phone}
                                onChange={(e) => handlePhoneChange(driversPhone[0].id, e.target.value)}
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

                {/* Qo‘shimcha telefon raqamlari */}
                <div className="grid grid-cols-3 gap-4 mt-5">
                    {driversPhone.slice(1).map((driver, index) => (
                        <div
                            key={driver.id}
                            className="w-full relative group py-2 -mt-2 overflow-hidden"
                        >
                            <InputMUI
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
            <div className="w-[90%] bg-white px-4 mx-auto py-5 rounded-md shadow mt-5">
                <div className="grid grid-cols-3 gap-4">
                    <InputMUI
                        variant="outlined"
                        label="Марка автомобиля"
                        value={carBrand}
                        onChange={(e) => setCarBrand(e.target.value)}
                    />
                    <InputMUI
                        variant="outlined"
                        label="Ширина автомобиля (метр)"
                        value={carWidth}
                        onChange={(e) => setCarWidth(e.target.value)}
                    />
                    <SelectMUI
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
                        variant="outlined"
                        label="Высота автомобиля (метр)"
                        value={carHeight}
                        onChange={(e) => setCarHeight(e.target.value)}
                    />
                    <SelectMUI
                        variant="outlined"
                        label="Тип автомобиля"
                        value={carType}
                        onChange={setCarType}
                        placeholder="Тип автомобиля"
                        options={top100Films}
                    />
                    <InputMUI
                        variant="outlined"
                        label="Номер полу прицепа"
                        value={trailerNumber}
                        onChange={(e) => setTrailerNumber(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5">
                    <InputMUI
                        variant="outlined"
                        label="Номер автомобиля"
                        value={carNumber}
                        onChange={(e) => setCarNumber(e.target.value)}
                    />
                    <InputMUI
                        variant="outlined"
                        label="Вместимость автомобиля (М/куб)"
                        value={carCapacity}
                        onChange={(e) => setCarCapacity(e.target.value)}
                    />
                    <InputMUI
                        variant="outlined"
                        label="Длина автомобиля (метр)"
                        value={carLength}
                        onChange={(e) => setCarLength(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5">
                    <InputMUI
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
                        className="px-3 py-2 whitespace-nowrap bg-blue w-max text-white rounded flex items-center"
                    >
                        <i className="fa-solid fa-plus mr-2"></i>
                        Add File
                    </button>
                </div>

                {/* Action buttons */}
                <div className="py-5 w-full flex items-center justify-end gap-4">
                    <button
                        onClick={() => navigate(`/users/drivers`)}
                        className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out hover:text-white hover:bg-blue py-2 px-3"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out hover:text-white hover:bg-blue py-2 px-3"
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

export default AddDrivers;
