import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {CloseNavbarY} from "../../features/EmployeSModalToggle/employesModalToggle.js";

function NavbarY() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {isOpenNavbarY} = useSelector((state) => state.employesModal);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();

    const [navabrArry, setNavabrArry] = useState([
        {label: "navbar.home", icon: "fas fa-home", navigate: "/dashboard"},
        {label: "navbar.queries", icon: "fa-solid fa-question", navigate: "/queries"},
        {label: "navbar.orders", icon: "fas fa-shopping-cart", navigate: "/orders"},
        {
            label: "navbar.settings",
            icon: "fas fa-users",
            navigate: "/users",
            active: false,
            arry: [
                {name: "navbar.customers", icon: "fas fa-user-friends", navigate: "customers"},
                {name: "navbar.drivers", icon: "fas fa-id-card", navigate: "drivers"},
                {name: "navbar.employees", icon: "fas fa-user-tie", navigate: "employees"},
                {name: "navbar.invoices", icon: "fas fa-file-invoice", navigate: "invoices"},
            ],
        },
    ]);

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (dropdownRef.current && !dropdownRef.current.contains(event.target) && window.innerWidth < 1024 ) {
    //             dispatch(CloseNavbarY())
    //          }
    //     };
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => document.removeEventListener("mousedown", handleClickOutside);
    // }, []);

    return (
        <div ref={dropdownRef}
            style={{
                width: isOpenNavbarY ? "16rem" : "0rem"
        }}
            className={`
        h-screen overflow-hidden shadow-lg transition-all duration-300 ease-in-out   fixed lg:static lg:flex
        bg-white text-blue z-[10]
        dark:bg-darkBgTwo dark:text-darkText
      `}
        >
            {/*/!* Logo *!/*/}
            {/*<div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">*/}
            {/*    <h1 className="text-lg font-bold tracking-wide">My Admin</h1>*/}
            {/*</div>*/}

            {/* Nav Items */}
            <div className="flex-1 mt-4">
                {navabrArry.map((item, index) => (
                    <div key={index} className="px-3">
                        <div
                            onClick={() => {
                                if (!item.arry) navigate(item.navigate);
                                if (item.arry) {
                                    setNavabrArry((prev) =>
                                        prev.map((el) =>
                                            el.label === item.label
                                                ? {...el, active: !el.active}
                                                : {...el, active: false}
                                        )
                                    );
                                }
                            }}
                            className={`flex items-center justify-between whitespace-nowrap  px-4 py-2 mt-1 rounded-xl cursor-pointer  transition-all duration-300  dark:hover:bg-navBgHover 
                                ${
                                location.pathname.startsWith(item.navigate)
                                    ? "bg-blue text-white shadow"
                                    : "hover:bg-brandBlue-100  text-blue dark:hover:bg-darkBgHover dark:text-darkText"
                            }`
                            }
                        >
                            <div className="flex items-center space-x-3 text-sm lg:text-base    ">
                                <i className={`${item.icon} w-5`}></i>
                                <span>{t(item.label)}</span>
                            </div>
                            {item.arry && (
                                <i
                                    className={`fa-solid fa-chevron-right transition-transform duration-300 ${
                                        item.active ? "rotate-90" : ""
                                    }`}
                                ></i>
                            )}
                        </div>

                        {/* Dropdown */}
                        {item.arry && (
                            <div
                                className={`overflow-hidden transition-all duration-500   mt-1 ml-2 ${item.active ? "max-h-64" : "max-h-0"}`}
                            >
                                {item.arry.map((sub) => (
                                    <div
                                        key={sub.navigate}
                                        onClick={() => navigate(`${item.navigate}/${sub.navigate}`)}
                                        className={`
                                            ${location.pathname.split('/').filter(Boolean).find((res) => res === sub.navigate) ? 'bg-brandBlue-50 dark:bg-navBgHover ' : ''}  
                                        
                                        flex items-center space-x-2 px-4 py-2 mt-1   rounded-lg cursor-pointer text-sm  whitespace-nowrap   hover:bg-brandBlue-50 text-blue hover:text-blue   dark:text-darkText dark:hover:bg-darkBgHover transition-all  dark:hover:bg-navBgHover  
                                    `}
                                    >
                                        <i className={`${sub.icon} w-4`}></i>
                                        <span>{t(sub.name)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NavbarY;
