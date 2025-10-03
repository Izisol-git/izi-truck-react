import React, {useEffect, useRef, useState} from 'react';
import {SelectMUI, InputMUI, ButtonMUI, RadioGroup, MyCalendar, LoadingCircular} from "../index.js";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {addEmployee, getEmployees, updateEmployee} from "../../features/Employees/employeeThunks.js";
import {addClient, editClient, getClients, getClientsSelect} from "../../features/customers/clientsThunks.js";
import {useTranslation} from "react-i18next";
import useNotify from "../../hooks/UseNotify/useNotify.jsx";

function AddEmployesModal({h1, inputModalArray = [], id , search=''}) {
    const [inputVariant, setInputVariant] = useState("outlined");
    const {loadingAddEmployee} = useSelector((state) => state.employees);
    const {loadingClient} = useSelector((state) => state.customers);
    const {loadingAddDrivers} = useSelector((state) => state.drivers);
    const addEditToggle = useSelector((state) => state.employesModal.addEditToggle);
    const dispatch = useDispatch();
    const ref = useRef();
    const isOpen = useSelector((state) => state.employesModal.isOpen);
    const [options, setOptions] = useState();
    const {user} = useSelector((state) => state.auth);
    const [errors, setErrors] = useState();
    const {employeesId} = useSelector((state) => state.employees);
    const {clientsId} = useSelector((state) => state.customers);
    const {showMessage} = useNotify()
    const {t} = useTranslation();
    const [inputModal, setInputModal] = useState(
        inputModalArray.reduce((acc, item) => {
            acc[item.post] = item.value;
            return acc;
        }, {})
    );

    const getSelect = async () => {
        try {
            const res = await dispatch(getClientsSelect()).unwrap()
            const newArray = res.contracts.map(({customer, id}) => ({title: customer, id}));
            if (h1 === 'Customers') {
                setOptions(newArray);
            }
            console.log(newArray);
        } catch (err) {
            console.error(err);
        }
    }

    const getEmployeesId =  () => {
            setInputModal({
                name: employeesId?.user?.name,
                email: employeesId?.user?.email,
                password: "",
                tin: employeesId?.tin,
                phone_number: employeesId?.phone_number,
                tg_user_id: employeesId?.tg_user_id,
                tg_nick_name: employeesId?.tg_nick_name,
                code: employeesId?.code,
                avatar: '',
                type: employeesId?.type,
            });
    };
    const getCustomersId =  () => {
            setInputModal({
                company_name: clientsId?.company_name,
                contract_no: clientsId?.contract?.contract_no,
                fio: clientsId?.fio,
                phone_number: clientsId?.phone_number,
                director_position: clientsId?.contract?.director_position,
                director: clientsId?.contract?.director,
                director_add: clientsId?.contract?.director_add,
                customer: clientsId?.contract?.customer,
                cust_bank_code: clientsId?.contract?.cust_bank_code,
                customer_bank_acc: clientsId?.contract?.customer_bank_acc,
                customer_bank: clientsId?.contract?.customer_bank,
                customer_tin: clientsId?.contract?.customer_tin,
                customer_address: clientsId?.contract?.customer_address,
                customer_vat: clientsId?.contract?.customer_vat,
                acc_tel: clientsId?.contract?.acc_tel,
                treaty_code: clientsId?.contract?.treaty_code,
                customer_oked: clientsId?.contract?.customer_oked,
                created_at: clientsId?.contract?.created_at,

            });
    };

    useEffect(() => {
        if ((employeesId || id) && addEditToggle === false && h1 === 'Employees') {
            getEmployeesId()
        }
    }, [employeesId, id, isOpen])

    useEffect(() => {
        if (addEditToggle === false && h1 === 'Customers' && (clientsId || id) ) {
            getCustomersId()
        }
    },  [clientsId , isOpen])

    useEffect(() => {
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



    useEffect(() => {
        // clearEmployeesModal();
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const AddEmployees = async () => {
        if (h1 === 'Customers') {
            const obj = {
                ...inputModal,
            }
            try {
                const res = await dispatch(addClient(obj)).unwrap();
                showMessage(t('CustomersSnackbar.success.create'))
                clearEmployeesModal();
                dispatch(closeModal());

                try {
                    try {
                        const result = await dispatch(getClients({page: 1, search})).unwrap()
                    } catch (error) {
                        console.log(error);
                    }
                }catch (e) {
                    console.error(e);
                }

            } catch (error) {
                console.error("Xatolik:", error);
                setErrors(error.errors);
                showMessage(t('CustomersSnackbar.error.create') , 'error')
            }
        }

        if (h1 === 'Employees') {
            try {
                await dispatch(addEmployee(inputModal)).unwrap();
                showMessage(t('EmployeesSnackbar.success.create'))
                clearEmployeesModal();
                dispatch(closeModal());
                try {
                    const result = await dispatch(getEmployees({page: 1, search})).unwrap()
                    console.log(result.data)
                } catch (err) {
                    console.log(err)
                }
            } catch (error) {
                console.error("Xatolik:", error);
                setErrors(error.errors);
                showMessage(t('EmployeesSnackbar.error.create') , 'error')
            }
        }
    };


    const PutEmployees = async () => {
        if (h1 === 'Employees') {
            try {
                await dispatch(updateEmployee({id: id ? id : employeesId?.id, employeeData: inputModal})).unwrap();
                showMessage(t('CustomersSnackbar.success.edit'))
                clearEmployeesModal();
                dispatch(closeModal());
                try {
                    const result = await dispatch(getEmployees({page: 1, search})).unwrap()
                    console.log(result.data)
                } catch (err) {
                    console.log(err)
                }
            } catch (error) {
                console.error("Xatolik:", error);
                setErrors(error.errors);
                showMessage(t('CustomersSnackbar.error.edit') , 'error')
            }
        }

        if (h1 === 'Customers') {
            console.log(inputModal)
            try {
                await dispatch(editClient({id: id ? id : clientsId?.id, clientData: inputModal})).unwrap();
                showMessage(t('CustomersSnackbar.success.edit'))
                clearEmployeesModal();
                dispatch(closeModal());
                try {
                    try {
                        const result = await dispatch(getClients({page: 1, search})).unwrap()
                    } catch (error) {
                        console.log(error);
                    }
                }catch (e) {
                    console.error(e);
                }
            } catch (error) {
                console.error("Xatolik:", error);
                setErrors(error.errors);
                showMessage(t('CustomersSnackbar.error.edit') , 'error')
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
        setErrors({})
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                ref.current &&
                ref.current.contains(event.target)
            ) {
                clearEmployeesModal();
                dispatch(closeModal());
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const title = () => {
        if (h1 === "Customers") {
            return (addEditToggle ? t('clients.createClients') : t('clients.editClients'));
        }
        if (h1 === "Employees") {
            return (addEditToggle ? t('employees.createEmployees') : t('employees.editEmployees'));
        }
    }

    return (

        <>
            <div ref={ref} className={`fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 z-10 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>


            </div>
            <div
                className={`${isOpen ? "w-[700px] opacity-1" : "w-0 opacity-0"}   fixed overflow-scroll  scrollbar-hide top-0 right-0 bottom-0 h-[100dvh] bg-white shadow-2xl z-10   transition-all duration-300 ease-in-out   flex flex-col justify-between items-start dark:bg-darkBgTwo dark:shadow-none `}>
                <div className={'w-full px-6 '}>
                    <div
                        className={"flex items-center justify-between border-b     border-blue p-4 dark:border-darkText"}>
                        <p className={'text-blue font-bold text-lg dark:text-darkText'}> {title()}</p>
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
                                item.type === "select" ?
                                    item.superAdmin ?
                                        user?.user?.roles[0]?.name !== 'super-admin'
                                            ?
                                            ''
                                            :
                                            (
                                                <div key={index} className="w-full">
                                                    <SelectMUI
                                                        errorMassage={errors?.[item.post]}
                                                        options={options || []}
                                                        variant={inputVariant}
                                                        addEditToggle={addEditToggle}
                                                        label={t(`${item?.label}`)}
                                                        placeholder={t(`${item?.label}`)}
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
                                            )
                                        :
                                        (
                                            <div key={index} className="w-full">
                                                <SelectMUI
                                                    errorMassage={errors?.[item.post]}
                                                    options={options || []}
                                                    variant={inputVariant}
                                                    addEditToggle={addEditToggle}
                                                    label={t(`${item?.label}`)}
                                                    placeholder={t(`${item?.label}`)}
                                                    value={
                                                        !addEditToggle
                                                            // ? inputModal.type
                                                            ? options?.find(opt => String(opt.id) === String(inputModal?.customer_id)) || null
                                                            // : null
                                                            : inputModal?.customer_id || null
                                                    }

                                                    onChange={(newValue) =>
                                                        addEditToggle ? setInputModal({
                                                                ...inputModal,
                                                                customer_id: newValue ?? null
                                                            })
                                                            :
                                                            setInputModal({
                                                                ...inputModal,
                                                                customer_id: newValue.id ?? null
                                                            })
                                                    }
                                                />
                                            </div>
                                        )
                                    : item.type === "text" || item.type === "password" || item.type === 'email' ? (
                                            <div key={index} className="w-[50%] flex px-2">
                                                <InputMUI
                                                    errorMassage={errors?.[item.post]}
                                                    onChange={(e) => inputvalue(e, item.post)}
                                                    variant={inputVariant}
                                                    label={t(`${item?.label}`)}
                                                    value={inputModal[item.post] ?? ""}
                                                />
                                            </div>
                                        )
                                        :
                                        item.type === "date" ? (
                                                <MyCalendar
                                                    label={t(`${item?.label}`)}
                                                    value={inputModal[item.post]}
                                                    onChange={(val) => setInputModal({...inputModal, created_at: val})}
                                                />
                                            )
                                            : ""

                            ))
                        }


                    </div>
                </div>
                <div className={" w-full px-6 flex items-center justify-end gap-x-6 mb-5 mt-5 "}>
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
                        {(loadingClient || loadingAddEmployee)  ?   <LoadingCircular/> : t('clients.send')}
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
                                clearEmployeesModal()
                                dispatch(closeModal())
                            }}
                            variant="outlined" color="error">
                        {t('clients.close')}
                    </Button>


                </div>
            </div>

        </>
    )

}

export default AddEmployesModal;