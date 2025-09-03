import React, {useEffect, useState} from 'react';

import {SelectMUI, InputMUI, ButtonMUI, RadioGroup} from "../index.js";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {addEmployee, EmployeesId, updateEmployee} from "../../features/Employees/employeeThunks.js";
import {addClient, ClientId, editClient, getClientsSelect} from "../../features/customers/clientsThunks.js";

function AddEmployesModal({h1, inputModalArray = [], setEmployeesId}) {
    const [inputVariant, setInputVariant] = useState("outlined");
    const {loadingAddEmployee} = useSelector((state) => state.employees);
    const {loadingClient} = useSelector((state) => state.customers);
    const {loadingAddDrivers} = useSelector((state) => state.drivers);
    // const loading = h1 === "Employees" ? loadingAddEmployee : h1 === "Customers" ? loadingClients : h1 === "Drivers" ? loadingDrivers : false;
    const addEditToggle = useSelector((state) => state.employesModal.addEditToggle);
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.employesModal.isOpen);
    const [selectArry, setSelectArry] = useState();
    const [options, setOptions] = useState();
    const {clientsUpdetId} = useSelector((state) => state.employesModal);
    const {user} = useSelector((state) => state.auth);
    const [errors, setErrors] = useState();
    const {employeesId} = useSelector((state) => state.employesModal);
    const {customersId} = useSelector((state) => state.employesModal);

    const [inputModal, setInputModal] = useState(
        inputModalArray.reduce((acc, item) => {
            acc[item.post] = item.value;
            return acc;
        }, {})
    );

    console.log(employeesId)


    const getSelect = async () => {
        const res = await dispatch(getClientsSelect())
        const newArray = res.payload.contracts.map(({customer, id}) => ({title: customer, id}));
        if (h1 === 'Customers') {
            setOptions(newArray);
        }
        console.log(newArray);
    }


    // const ClientSId = async () => {
    //     const res = await dispatch(ClientId(employeesId))
    //     // setInputModal(res.payload.data)
    //     // setSelectArry(res.payload.data)
    //     console.log(res)
    // }

    const getEmployeesId = async () => {
        try {
            const res = await dispatch(EmployeesId(employeesId)).unwrap();
            console.log(res.data)

            // // inputModalArray bo'yicha res dan mos keladigan qiymatlarni olish
            // const updatedInputModal = inputModalArray.map(item => ({
            //     ...item,
            //     value: res[item.post] || ''  // res[item.post] bo'lmasa bo'sh string
            // }));

            setInputModal({
                name: res?.data?.user?.name,
                email: res?.data?.user?.email,
                password: "",
                tin: res?.data?.tin,
                phone_number: res?.data?.phone_number,
                tg_user_id: res?.data?.tg_user_id,
                tg_nick_name: res?.data?.tg_nick_name,
                code: res?.data?.code,
                avatar: '',
                type: res?.data?.type,
            });
            // console.log(updatedInputModal);
        } catch (error) {
            console.log(error);
        }
    };
    const getCustomersId = async () => {
        try {
            const res = await dispatch(ClientId(customersId)).unwrap();
            console.log(res.data)

            // // inputModalArray bo'yicha res dan mos keladigan qiymatlarni olish
            // const updatedInputModal = inputModalArray.map(item => ({
            //     ...item,
            //     value: res[item.post] || ''  // res[item.post] bo'lmasa bo'sh string
            // }));

            setInputModal({
                company_name: res?.data?.company_name,
                customer_id:res?.data?.customer_id,
                fio:res?.data?.fio,
                phone_number: res?.data?.phone_number
            });
            // console.log(updatedInputModal);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (employeesId && addEditToggle === false && h1 === 'Employees') {
            getEmployeesId()
        }
    }, [employeesId, isOpen])
    useEffect(() => {
        if (customersId && addEditToggle === false && h1 === 'Customers') {
            getCustomersId()
        }
    }, [customersId, isOpen])

    useEffect(() => {
        clearEmployeesModal()
    }, [isOpen])
    // company_name phone_number fio id

    useEffect(() => {
        // if(addEditToggle === true){
        //     setInputModal({})
        // }
        if (h1 === 'Customers') {
            getSelect()
        }
        if (h1 === 'Employees') {
            setOptions([
                {value: 1, name: 'carrier'},
                {value: 2, name: 'client'},
                {value: 3, name: 'admin'}
            ])
        }
    }, [])


    // console.log(employeesId)


    // const updatedValues = employeesId.reduce((acc, item) => {
    //     acc[item.post] = item.value;
    //     return acc;
    // }, {});


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
    useEffect(() => {
        if (employeesId && addEditToggle === false && h1 === "Customers") {
            // const newData = options?.find((customer_id) => customer_id.id === employeesId?.id);
            // console.log(newData);
            setInputModal(prev => ({
                ...prev,
                company_name: employeesId?.company_name,
                phone_number: employeesId?.phone_number,
                customer_id: employeesId?.id,
                fio: employeesId?.fio,
            }));
            console.log(options?.find((customer_id) => customer_id.id === 256)?.title);
            console.log(employeesId?.id);
        }
        if (employeesId && addEditToggle === false && h1 === "Employees") {
            // const newData = options?.find((customer_id) => customer_id.id === employeesId?.id);
            // console.log(newData);
            setInputModal(prev => ({
                ...prev,
                code: employeesId?.code,
                email: employeesId?.user?.email,
                name: employeesId?.user?.name,
                password: employeesId?.password,
                phone_number: employeesId?.phone_number,
                tg_nick_name: employeesId?.tg_nick_name,
                tg_user_id: employeesId?.tg_user_id,
                tin: employeesId?.tin,
            }));
            console.log(options?.find((customer_id) => customer_id.id === 256)?.title);
            console.log(employeesId?.id);
        }
    }, [addEditToggle, employeesId]);


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const AddEmployees = async () => {
        if (h1 === 'Customers') {
            try {
                await dispatch(addClient(inputModal)).unwrap();
                clearEmployeesModal();
                dispatch(closeModal());

            } catch (error) {
                console.error("Xatolik:", error);
                setErrors(error.errors);
            }
        }

        if (h1 === 'Employees') {
            try {
                // dispatch thunk va natijani unwrap qilamiz
                await dispatch(addEmployee(inputModal)).unwrap();
                clearEmployeesModal();
                dispatch(closeModal());
            } catch (error) {
                console.error("Xatolik:", error);
                setErrors(error.errors);
            }
        }
    };


    const PutEmployees = async () => {
        if (h1 === 'Employees') {
            try {
                await dispatch(updateEmployee({id: employeesId, employeeData: inputModal})).unwrap();
                clearEmployeesModal();
                dispatch(closeModal());
                // setEmployeesId(Object.fromEntries(Object.keys(employeesId).map(key => [key, ""])));
                console.log(inputModal)
            } catch (error) {
                console.error("Xatolik:", error);
                console.log({name: addEmployees?.name});
                setErrors(error.errors);
            }
        }

        if (h1 === 'Customers') {
            console.log(inputModal)
            try {
                await dispatch(editClient({id: customersId, clientData: inputModal})).unwrap();
                clearEmployeesModal();
                dispatch(closeModal());
                // setEmployeesId(Object.fromEntries(Object.keys(employeesId).map(key => [key, ""])));
            } catch (error) {
                console.error("Xatolik:", error);
                setErrors(error.errors);
            }
        }
    };
    const inputvalue = (e, key) => {
        const {value} = e.target;
        setInputModal((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const clearEmployeesModal = () => {
        const formData = inputModalArray.reduce((acc, item) => {
            acc[item.post] = item.value;
            return acc;
        }, {});
        setInputModal(formData);
    }

    console.log(user?.user?.roles[0]?.name);

    return (
        <div>
            <div
                // onMouseLeave={()=> dispatch(closeModal())}
                className={`${isOpen ? "w-1/3 opacity-1" : "w-0 opacity-0"}  fixed overflow-scroll  scrollbar-hide top-0 right-0 bottom-0 h-[100dvh] bg-white shadow-2xl z-10   transition-all duration-300 ease-in-out   flex flex-col justify-between items-start dark:bg-darkBgTwo dark:shadow-none `}>
                <div className={'w-full px-6'}>
                    <div
                        className={"flex items-center justify-between border-b    border-blue p-4 dark:border-darkText"}>
                        <p className={'text-blue font-bold text-lg dark:text-darkText'}>{addEditToggle ? "Add" : "Edit"} {h1}</p>
                        <div onClick={() => {
                            clearEmployeesModal()
                            dispatch(closeModal())

                            setInputModal(
                                Object.fromEntries(
                                    Object.keys(inputModal).map(key => [key, ""])
                                )
                            );
                        }}
                             className={'w-[30px] h-[30px] cursor-pointer hover:bg-gray-100 rounded center dark:hover:bg-navBgHover'}>
                            <i className={'fas fa-times text-blue dark:text-darkText'}></i>
                        </div>
                    </div>
                    <div className={"pt-6  items-center justify-between flex flex-wrap gap-y-4"}>
                        {
                            inputModalArray.map((item, index) => (
                                item.type === "select" && user?.user?.roles[0]?.name === 'super-admin' ? (
                                    <div key={index} className="w-full">
                                        <SelectMUI
                                            errorMassage={errors?.[item.post]}
                                            options={options || []}
                                            variant={inputVariant}
                                            addEditToggle={addEditToggle}
                                            label={item?.label}
                                            placeholder={item.label}
                                            value={
                                                addEditToggle
                                                    ? inputModal.type
                                                        ? options?.find(opt => String(opt.value) === String(inputModal.type)) || null
                                                        : null
                                                    : options?.find(opt => String(opt.value) === String(inputModal?.type)) || null
                                            }
                                            onChange={(newValue) =>
                                                setInputModal({...inputModal, type: newValue.value ?? null})
                                            }
                                        />
                                    </div>
                                ) : (
                                    <div key={index} className="w-[50%] flex px-2">
                                        <InputMUI
                                            errorMassage={errors?.[item.post]}
                                            onChange={(e) => inputvalue(e, item.post)}
                                            variant={inputVariant}
                                            label={item.label}
                                            value={inputModal[item.post] ?? ""}
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
                        borderColor: "#1D2D5B", width: "50%", color: "#1D2D5B",
                        '.dark &': {
                            color: 'white',
                            backgroundColor: '#2B4764',
                            borderColor: '#2B4764',
                        }
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
                        {loadingClient || loadingAddEmployee || loadingAddDrivers ? "Sending..." : "send"}
                    </Button>
                    <Button sx={{
                        width: "50%",
                        '.dark &': {
                            color: 'white',
                            backgroundColor: '#d84c4c',
                            borderColor: '#2B4764',
                        }
                    }}
                            onClick={() => {
                                dispatch(closeModal())
                                clearEmployeesModal()
                                // setEmployeesId(Object.fromEntries(Object.keys(employeesId).map(key => [key, ""])));
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