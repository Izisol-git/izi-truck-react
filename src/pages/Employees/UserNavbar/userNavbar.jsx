import React, {useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AddToggle, AddToggleDrivers} from "../../../features/EmployeSModalToggle/employesModalToggle.js";
import {useTranslation} from "react-i18next";

const UserNavbar = ({value, columnsArry, setColumnsArry, openModal}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const isOpen = useSelector((state) => state.employesModal.isOpen);
    const [dropdown, setDropdown] = useState(false);
    const changeColumnsArry = (index) => {
        const newArray = [...columnsArry]
        newArray[index].active = !newArray[index].active;
        setColumnsArry(newArray);
        console.log(newArray);
    }

    const title =()=>{
        if(value === "Customers" ){
            return (t('clients.clients'))
        }
        if(value === "Drivers" ){
            return (t('drivers.drivers'))
        }
        if(value === "Employees" ){
            return (t('employees.employees'))
        }
    }



    return (
        <div className="flex items-center  py-5 justify-between">
            <p className={'text-2xl text-blue font-semibold dark:text-darkText'}>{title()}</p>
            <div className="center gap-4">
                {
                    value === 'Notifications' ? '' :
                        <button onClick={() => {
                            value === 'Drivers' ? navigate('/users/drivers/create') : ''
                            openModal ? openModal() : dispatch(AddToggleDrivers())
                            dispatch(AddToggle())
                            value === 'Contracts' ? navigate('/contracts/clients/create') : ''
                        }}
                                className={'py-2 px-3 bg-[#38CB6E] text-white rounded hover:ring-2 ring-[#38CB6E] outline-none'}>
                            <i className={'fas fa-plus mr-2'}></i>{t('clients.add')}
                        </button>
                }
                <div className="relative">
                    <button onMouseLeave={() => {
                        setDropdown(false)
                    }} onClick={() => setDropdown(!dropdown)}
                            className={'py-2 px-3 bg-blue text-white rounded hover:ring-2 ring-blue outline-none dark:bg-btnBgDark dark:ring-btnBgDark'}>
                        <i
                            className={'fas fa-columns mr-2'}></i>{t('clients.columns')}
                    </button>

                    <div onMouseEnter={() => {
                        setDropdown(true)
                    }} onMouseLeave={() => {
                        setDropdown(false)
                    }}
                         className={`shadow absolute right-0 max-w-96 mt-2     text-blue ${dropdown ? "max-h-96 " : "max-h-0 "} w-[calc(100% + 32px)] z-[10000000] transition-all duration-500 overflow-hidden bg-white ease-in-out`}>

                        {
                            columnsArry.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => {

                                        changeColumnsArry(index)
                                    }}
                                    className="py-2 px-4 cursor-pointer flex items-center    hover:bg-blue hover:text-white  gap-3 dark:hover:bg-btnBgDark dark:bg-darkBgTwo dark:text-darkText  ">
                                    <div className="w-[10%] ">{item.active &&
                                        <i className="fa-solid fa-check"></i>}
                                    </div>
                                    <p className={'w-[90%] whitespace-nowrap'}>{item.key ? t(`${item.key}`) : item.title}</p>
                                </div>
                            ))
                        }


                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserNavbar;