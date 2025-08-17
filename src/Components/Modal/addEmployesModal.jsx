import React, {useEffect, useState} from 'react';

import {SelectMUI, InputMUI, ButtonMUI, RadioGroup} from "../index.js";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {closeModal, EditToggle} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {addEmployee, updateEmployee} from "../../features/Employees/employeeThunks.js";
import {components as res} from "daisyui/imports.js";

function AddEmployesModal({h1, inputModalArray = [], data, employeesId}) {
    const [inputVariant, setInputVariant] = useState("outlined");
    const {loadingAddEmployee} = useSelector((state) => state.employees);
    const addEditToggle = useSelector((state) => state.employesModal.addEditToggle);
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.employesModal.isOpen);

    const [employeesIndex, setEmployeesIndex] = useState(
        {
            name: employeesId?.user.name,
            email: employeesId?.user.email,
            password: "password",
            tin: employeesId?.tin,
            phone_number: employeesId?.phone_number,
            tg_user_id: employeesId?.tg_user_id,
            tg_nick_name: employeesId?.tg_nick_name,
            code: employeesId?.code,
            avatar: employeesId?.avatar
        }
    );


    const [addEmployees, setAddEmployees] = useState({
        name: "",
        email: "",
        password: "",
        tin: "",
        phone_number: "",
        tg_user_id: "",
        tg_nick_name: "",
        code: "",
        avatar: ""
    });

    // const showEditValue = ()=>{
    //     setAddEmployees(
    //
    //     )
    // }


    useEffect(() => {
        if (employeesId && addEditToggle === false) {
            setAddEmployees({
                ...employeesId,
                name: employeesId.user?.name || "",
                email: employeesId.user?.email || ""
            });
        } else {
            setAddEmployees({
                name: "",
                email: "",
                password: "",
                tin: "",
                phone_number: "",
                tg_user_id: "",
                tg_nick_name: "",
                code: "",
                avatar: ""
            })
        }
    }, [employeesId, addEditToggle, isOpen]);

    // console.log(employeesId)


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    // console.log(addEmployees)

    const addEmployeesModal = (value, label) => {
        switch (label) {
            case "Full name":
                label = "name";
                break;
            case "Email":
                label = "email";
                break;
            case "Password":
                label = "password";
                break;
            case "INN":
                label = "tin";
                break;
            case "User ID (Telegram)":
                label = "tg_user_id";
                break;
            case "User Nickname (Telegram)":
                label = "tg_nick_name";
                break;
            case "Code":
                label = "code";
                break;
            case "Phone number":
                label = "phone_number";
                break;
        }
        setAddEmployees((prev) => ({
            ...prev,
            [label]: label === "tg_user_id"
                ? (value ? Number(value) : null) // faqat tg_user_id number bo‘lishi kerak
                : value
        }));

        console.log(addEmployees);

    };

    const AddEmployees = async () => {
        try {
            // dispatch thunk va natijani unwrap qilamiz
            await dispatch(addEmployee(addEmployees)).unwrap();
            clearEmployeesModal();
            dispatch(closeModal());
        } catch (error) {
            console.error("Xatolik:", error);
        }
    };

    const PutEmployees = async () => {


        try {
            // dispatch thunk va natijani unwrap qilamiz
            // const obj = {
            //     name: addEmployees?.user.name,
            //     email: addEmployees.email,
            //     password: "",
            //     tin: addEmployees.tin,
            //     phone_number: addEmployees.phone_number,
            //     tg_user_id: addEmployees.tg_user_id,
            //     tg_nick_name: addEmployees.tg_nick_name,
            //     code: addEmployees.code,
            //     avatar: addEmployees.avatar
            // }
            // console.log(obj);
            await dispatch(updateEmployee(1494,)).unwrap();
            clearEmployeesModal();
            dispatch(closeModal());
        } catch (error) {
            console.error("Xatolik:", error);
            console.log({name: addEmployees?.user.name});
        }
    };


    const clearEmployeesModal = () => {
        for (const index in addEmployees) {
            addEmployees[index] = "";
        }

    }


    return (
        <div>
            <div
                // onMouseLeave={()=> dispatch(closeModal())}
                className={`${isOpen ? "w-1/3 opacity-1" : "w-0 opacity-0"}  fixed overflow-scroll  scrollbar-hide top-0 right-0 bottom-0 h-[100dvh] bg-white shadow-2xl z-10   transition-all duration-300 ease-in-out   flex flex-col justify-between items-start `}>
                <div className={'w-full px-6'}>
                    <div className={"flex items-center justify-between border-b    border-blue p-4"}>
                        <p className={'text-blue font-bold text-lg'}>{addEditToggle ? "Add" : "Edit"} {h1}</p>
                        <div onClick={() => {
                            dispatch(closeModal())
                            clearEmployeesModal()
                        }}
                             className={'w-[30px] h-[30px] cursor-pointer hover:bg-gray-100 rounded center'}>
                            <i className={'fas fa-times text-blue '}></i>
                        </div>
                    </div>
                    <div className={"pt-6  items-center justify-between flex flex-wrap gap-y-4"}>
                        {
                            inputModalArray.map((item, index) => (
                                item.type === "select" ? (
                                    <div key={index} className="w-full">
                                        <SelectMUI
                                            variant={inputVariant}
                                            label={item.label}
                                            placeholder={item.label}
                                            value={addEmployees[item.key] || ""} // 🔑 state bilan bog‘lash
                                            onChange={(e) => addEmployeesModal(e.target.value, item.label)}
                                        />
                                    </div>
                                ) : (
                                    <div key={index} className="w-[50%] flex px-2">
                                        <InputMUI
                                            onChange={(e) => addEmployeesModal(e.target.value, item.label)}
                                            variant={inputVariant}
                                            label={item.label}
                                            value={addEmployees[
                                                // label → field name mapping
                                                item.label === "Full name" ? "name" :
                                                    item.label === "Email" ? "email" :
                                                        item.label === "Password" ? "password" :
                                                            item.label === "INN" ? "tin" :
                                                                item.label === "Phone number" ? "phone_number" :
                                                                    item.label === "User ID (Telegram)" ? "tg_user_id" :
                                                                        item.label === "User Nickname (Telegram)" ? "tg_nick_name" :
                                                                            item.label === "Code" ? "code" :
                                                                                ""
                                                ] || ""}   // 🔑 controlled input
                                        />
                                    </div>
                                )
                            ))
                        }


                    </div>

                    <div className={"py-6 flex flex-col gap-y-6 "}>

                        <RadioGroup onchange={setInputVariant}/>
                    </div>
                </div>


                <div className={" w-full px-6 flex items-center justify-end gap-x-6 mb-6 "}>


                    <Button sx={{
                        borderColor: "#1D2D5B", width: "50%", color: "#1D2D5B"
                    }}
                            onClick={addEditToggle ?
                                () => {
                                    AddEmployees()
                                }
                                :
                                () => {
                                    PutEmployees()
                                }}
                            variant="outlined" color="primary">
                        {loadingAddEmployee ? "Sending..." : "send"}
                    </Button>
                    <Button sx={{
                        width: "50%"
                    }}
                            onClick={() => {
                                dispatch(closeModal())
                                clearEmployeesModal()
                            }}
                            variant="outlined" color="error">
                        Close
                    </Button>


                </div>
            </div>

        </div>

    )

}

export default AddEmployesModal;