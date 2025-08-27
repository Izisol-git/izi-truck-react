import React, { useState, useEffect } from 'react';
import { LanguageDropdown, ProfileDropdown } from "../index.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openInvoicesModal } from "../../features/EmployeSModalToggle/employesModalToggle.js";

function NavbarY() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSun, setIsSun] = useState(true);
    const [navbarModal, setNavbarModal] = useState(false);

    const navabrArry = [
        { label: 'Bosh sahifa', icon: 'fas fa-home mr-2', navigate: '/dashboard' },
        { label: 'Buyurtmalar', icon: 'fas fa-shopping-cart mr-2', navigate: '/orders' },
        {
            label: 'Foydalanuvchilar', icon: 'fas fa-users mr-2', navigate: '/employees', arry: [
                { name: 'Customers', icon: '"fas fa-user-friends mr-2' },
                { name: 'Drivers', icon: 'fas fa-id-card mr-2' },
                { name: 'Employees', icon: 'fas fa-user-tie mr-2' },
                { name: 'Invoices', icon: 'fas fa-user-tie mr-2' },
            ]
        },
        { label: 'Sozlamalar', icon: 'fas fa-cog mr-2', navigate: '/settings' },
    ]

    const sunToggle = () => {
        setIsSun(!isSun);
        if (isSun) {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    }

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
                                if (item.arry) setNavbarModal(!navbarModal);
                            }}
                            onMouseLeave={() => setNavbarModal(false)}
                            key={index}
                            className={
                                location.pathname.startsWith(item.navigate)
                                || (item.arry && location.pathname.startsWith('/users/employees'))
                                || (item.arry && location.pathname.startsWith('/users/customers'))
                                || (item.arry && location.pathname.startsWith('/users/drivers'))
                                || (item.arry && location.pathname === '/invoices')
                                    ? "z-[10] px-4 bg-blue  dark:bg-navBgHover text-white transition-all duration-300 ease-in-out"
                                    : "z-[10] text-blue dark:text-white px-4 hover:bg-blue dark:hover:bg-navBgHover hover:text-white transition-all duration-1000 ease-in-out"
                            }
                        >
                            <div className={'center h-full w-full'}>
                                <i className={item.icon}></i>
                                <p>{item.label}</p>
                                {item.arry && <i className="fa-solid fa-angle-right"></i>}
                            </div>

                            {/* Dropdown */}
                            {item.arry && (
                                <div
                                    className={`shadow -mx-4 text-blue dark:text-white ${navbarModal ? "max-h-96" : "max-h-0"} w-[calc(100%+32px)] transition-all duration-500 overflow-hidden bg-white dark:bg-[#212121] ease-in-out`}
                                >
                                    <div
                                        onClick={() => navigate('/users/customers')}
                                        className="py-2 border-b hover:bg-blue hover:text-white px-2 w-full dark:hover:bg-navBgHover dark:border-navBgHover"
                                    >Customers</div>
                                    <div
                                        onClick={() => navigate('/users/drivers')}
                                        className="py-2 border-b hover:bg-blue hover:text-white px-2 w-full dark:hover:bg-navBgHover dark:border-navBgHover"
                                    >Drivers</div>
                                    <div
                                        onClick={() => navigate('/users/employees')}
                                        className="py-2 border-b hover:bg-blue hover:text-white px-2 w-full dark:hover:bg-navBgHover dark:border-navBgHover"
                                    >Employees</div>
                                    <div
                                        onClick={() => navigate('/invoices')}
                                        className="py-2 border-b hover:bg-blue hover:text-white px-2 w-full dark:hover:bg-navBgHover dark:border-navBgHover"
                                    >Invoices</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right actions */}
                <div className="center gap-4">
                    <i className="fa-solid fa-bell text-blue dark:text-white text-lg"></i>
                    <LanguageDropdown />
                    {isSun ? (
                        <i onClick={sunToggle} className={'fas fa-moon font-bold cursor-pointer text-blue dark:text-white'}></i>
                    ) : (
                        <i onClick={sunToggle} className={'fas fa-sun font-bold cursor-pointer text-blue dark:text-white'}></i>
                    )}
                    <ProfileDropdown />
                </div>
            </div>
        </div>
    );
}

export default NavbarY;
