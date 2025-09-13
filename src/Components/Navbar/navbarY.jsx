import React, {useState, useEffect} from 'react';
import {LanguageDropdown, NotificationsModal, ProfileDropdown} from "../index.js";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {openInvoicesModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Pusher from "pusher-js";
import axios from "axios";
import {getNotifications} from "../../features/Notification/notificationsThunks.js";
import {addNotification} from "../../features/Notification/notificationSlice.js";
import {useTranslation} from "react-i18next";

function NavbarY() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useSelector((state) => state.auth);
    const [isSun, setIsSun] = useState(
        localStorage.getItem("dark") === "true" // stringni boolean ga aylantiryapti
    );
    const [notifications, setNotifications] = useState([]);
    const [counter, setCounter] = useState(0);
    Pusher.logToConsole = true;
    const {t} = useTranslation();

    const count = async () => {
        try {
            const  res = await dispatch(getNotifications()).unwrap();
            // console.log(res)
            setCounter(res.count);
            setNotifications(res.messages);
        }catch(err){
            console.log(err);
        }
    }
    //
    // useEffect(()=>{
    //
    // } , [])


    useEffect(() => {
        count()

        const token = localStorage.getItem("token");
        // console.log(token);

        // Pusher client
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
            cluster: import.meta.env.VITE_PUSHER_CLUSTER,
            authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        });

        // Kanalga ulanish
        const channel = pusher.subscribe("private-xabar");

        // Laravel default event nomi
        channel.bind("App\\Events\\MessageEvent", (data) => {
            console.log("✅ Xabar keldi:", data);
            setNotifications((prev) => [data, ...prev]);
            console.log(notifications);
        });

        // Cleanup
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, []);



    const [navabrArry, setNavabrArry] = useState([
        { label: "navbar.home", icon: "fas fa-home mr-2", navigate: "/dashboard" },
        { label: "navbar.queries", icon: "fa-solid fa-question mr-2", navigate: "/queries" },
        { label: "navbar.orders", icon: "fas fa-shopping-cart mr-2", navigate: "/orders" },
        {
            label: "navbar.settings",
            icon: "fas fa-users mr-2",
            navigate: "/users",
            active: false,
            arry: [
                { name: "navbar.customers", icon: "fas fa-user-friends mr-2", navigate: "customers" },
                { name: "navbar.drivers", icon: "fas fa-id-card mr-2", navigate: "drivers" },
                { name: "navbar.employees", icon: "fas fa-user-tie mr-2", navigate: "employees" },
                { name: "navbar.invoices", icon: "fas fa-user-tie mr-2", navigate: "invoices" }
            ]
        },
        {
            label: "navbar.contracts",
            icon: "fa-solid fa-file-signature mr-2",
            navigate: "/contracts",
            active: false,
            arry: [
                { name: "navbar.clientContracts", icon: "fas fa-user-friends mr-2", navigate: "clients" }
            ]
        }
    ]);


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
                                                ? {...el, active: true}
                                                : {...el, active: false}
                                        )
                                    );
                                }
                            }}
                            onMouseLeave={() => {
                                if (item.arry) {
                                    setNavabrArry(prev =>
                                        prev.map(el =>
                                            el.label === item.label
                                                ? {...el, active: false}
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
                                <p>{t(item.label)}</p>
                                {item.arry &&
                                    <i className={`fa-solid fa-angle-right transition-all duration-300  ${item.active ? 'transition-transform rotate-90 ' : ''}`}></i>}
                            </div>

                            {/* Dropdown */}
                            {item.arry && (
                                <div
                                    className={`shadow -mx-4 text-blue dark:text-white ${item.active ? "max-h-96" : "max-h-0"} w-[calc(100%+32px)] transition-all duration-500 overflow-hidden bg-white dark:bg-[#212121] ease-in-out`}
                                >
                                    {
                                        item.arry.map((items) => (
                                            <React.Fragment key={items.navigate}>
                                                <div
                                                    onClick={() => navigate(`${item.navigate}/${items.navigate}`)}
                                                    className="py-2 border-b hover:bg-blue hover:text-white px-2 w-full dark:hover:bg-navBgHover dark:border-navBgHover"
                                                >
                                                    {t(items.name)}
                                                </div>
                                            </React.Fragment>
                                        ))

                                    }
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right actions */}
                <div className="center gap-6">
                    {
                        user?.user?.roles[0]?.name === 'super-admin' ? <NotificationsModal count={count} notifications={notifications} /> :''
                    }

                    <LanguageDropdown/>
                    {/*{isSun === false ? (*/}
                    {/*    <i onClick={sunToggle}*/}
                    {/*       className={'fas fa-moon font-bold cursor-pointer text-blue dark:text-white'}></i>*/}
                    {/*) : (*/}
                    {/*    <i onClick={sunToggle}*/}
                    {/*       className={'fas fa-sun font-bold cursor-pointer text-blue dark:text-white'}></i>*/}
                    {/*)}*/}
                    <ProfileDropdown   sunToggle={sunToggle}/>
                </div>
            </div>
        </div>
    );
}

export default NavbarY;
