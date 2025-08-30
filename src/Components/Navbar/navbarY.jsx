import React, { useState, useEffect } from 'react';
import { LanguageDropdown, ProfileDropdown } from "../index.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openInvoicesModal } from "../../features/EmployeSModalToggle/employesModalToggle.js";

function NavbarY() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSun, setIsSun] = useState(
        localStorage.getItem("dark") === "true" // stringni boolean ga aylantiryapti
    );

    const [navabrArry , setNavabrArry] = useState(
        [
            { label: 'Bosh sahifa', icon: 'fas fa-home mr-2', navigate: '/dashboard' },
            { label: 'Buyurtmalar', icon: 'fas fa-shopping-cart mr-2', navigate: '/orders' },
            {
                label: 'Foydalanuvchilar', icon: 'fas fa-users mr-2', navigate : '/users', active:false,   arry: [
                    { name: 'Customers', icon: '"fas fa-user-friends mr-2' , navigate: 'customers' },
                    { name: 'Drivers', icon: 'fas fa-id-card mr-2' , navigate: 'drivers' },
                    { name: 'Employees', icon: 'fas fa-user-tie mr-2' , navigate: 'employees' },
                    { name: 'Invoices', icon: 'fas fa-user-tie mr-2' , navigate: 'invoices' },
                ]
            },
            { label: 'Contracts', icon: 'fa-solid fa-file-signature mr-2', navigate : '/contracts',active:false, arry: [
                    { name: 'Client Contracts', icon: 'fas fa-user-friends mr-2' , navigate: 'clients' },
                    { name: 'Employees Contracts', icon: 'fas fa-user-tie mr-2' , navigate: 'employees' },
                ] },
            { label: 'Sozlamalar', icon: 'fas fa-cog mr-2', navigate: '/settings' },
        ]
    )

    useEffect(() => {
        const darkMode = localStorage.getItem("dark") === "true"; // string bilan solishtirish
        setIsSun(darkMode);
        if (darkMode) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const sunToggle = () => {
        const newMode = !isSun;
        setIsSun(newMode);

        if (newMode) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
            localStorage.setItem("dark", "true");   // string saqlash
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
            localStorage.setItem("dark", "false");  // string saqlash
        }
    };

    return (
        <div className={'border-b  h-[70px] px-8 bg-white dark:bg-[#212121] dark:text-white dark:border-navBgHover'}>
            <div className="flex items-center h-full justify-between">
                {/* Logo */}
                <div className="center cursor-pointer gap-2">
                    <p className="w-[32px] h-[32px] bg-blue text-white center rounded">
                        IZ
                    </p>
                    <p className={'font-bold text-blue dark:text-white'}>Izitruck</p>
                </div>

                {/* Nav items */}
                <div className="flex cursor-pointer h-full">
                    {navabrArry.map((item, index) => (
                        <div
                            onClick={() => {
                                if (!item.arry) navigate(item.navigate);
                                if (item.arry) {
                                    setNavabrArry(prev =>
                                        prev.map(el =>
                                            el.label === item.label
                                                ? { ...el, active: true }
                                                : { ...el, active: false }
                                        )
                                    );
                                }
                            }}
                            onMouseLeave={() => {
                                if (item.arry) {
                                    setNavabrArry(prev =>
                                        prev.map(el =>
                                            el.label === item.label
                                                ? { ...el, active: false }
                                                : el
                                        )
                                    );
                                }
                            }}
                            key={index}
                            className={
                                location.pathname.startsWith(item.navigate)

                                    ? "z-[10] px-4 bg-blue  dark:bg-navBgHover text-white transition-all duration-300 ease-in-out"
                                    : "z-[10] text-blue dark:text-white px-4 hover:bg-blue dark:hover:bg-navBgHover hover:text-white transition-all duration-1000 ease-in-out"
                            }
                        >
                            <div className={'center h-full w-full'}>
                                <i className={item.icon}></i>
                                <p>{item.label}</p>
                                {item.arry && <i className={`fa-solid fa-angle-right transition-all duration-300  ${item.active ? 'transition-transform rotate-90 ' : ''}`}></i>}
                            </div>

                            {/* Dropdown */}
                            {item.arry && (
                                <div
                                    className={`shadow -mx-4 text-blue dark:text-white ${item.active ? "max-h-96" : "max-h-0"} w-[calc(100%+32px)] transition-all duration-500 overflow-hidden bg-white dark:bg-[#212121] ease-in-out`}
                                >
                                    {
                                        item.arry.map((items, index) => (
                                            <>
                                                <div
                                                    onClick={() => navigate(`${item.navigate}/${items.navigate}`)}
                                                    className="py-2 border-b hover:bg-blue hover:text-white px-2 w-full dark:hover:bg-navBgHover dark:border-navBgHover"
                                                >
                                                    {items.name}
                                                </div>
                                                {/*<div*/}
                                                {/*    onClick={() => navigate('/users/drivers')}*/}
                                                {/*    className="py-2 border-b hover:bg-blue hover:text-white px-2 w-full dark:hover:bg-navBgHover dark:border-navBgHover"*/}
                                                {/*>Drivers*/}
                                                {/*</div>*/}
                                                {/*<div*/}
                                                {/*    onClick={() => navigate('/users/employees')}*/}
                                                {/*    className="py-2 border-b hover:bg-blue hover:text-white px-2 w-full dark:hover:bg-navBgHover dark:border-navBgHover"*/}
                                                {/*>Employees*/}
                                                {/*</div>*/}
                                                {/*<div*/}
                                                {/*    onClick={() => navigate('/invoices')}*/}
                                                {/*    className="py-2 border-b hover:bg-blue hover:text-white px-2 w-full dark:hover:bg-navBgHover dark:border-navBgHover"*/}
                                                {/*>Invoices*/}
                                                {/*</div>*/}
                                            </>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right actions */}
                <div className="center gap-4">
                    <i className="fa-solid fa-bell text-blue dark:text-white text-lg"></i>
                    <LanguageDropdown/>
                    {/*{isSun === false ? (*/}
                    {/*    <i onClick={sunToggle}*/}
                    {/*       className={'fas fa-moon font-bold cursor-pointer text-blue dark:text-white'}></i>*/}
                    {/*) : (*/}
                    {/*    <i onClick={sunToggle}*/}
                    {/*       className={'fas fa-sun font-bold cursor-pointer text-blue dark:text-white'}></i>*/}
                    {/*)}*/}
                    <ProfileDropdown sunToggle={sunToggle}/>
                </div>
            </div>
        </div>
    );
}

export default NavbarY;
