import React, {useEffect, useRef} from 'react';
import {closeOffersModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {InputMUI} from "../index.js";
import InputFileUpload from "../Buttons/fileButton.jsx";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {useTranslation} from "react-i18next";
import {readNotifications} from "../../features/Notification/notificationsThunks.js";

function NotificationsModal({ count}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setOpen] = React.useState(false);
    const {notifications} = useSelector((state) => state.notification);
    const {t} = useTranslation();
    const dropdownRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    // const addReadNotification = async (id) => {
    //     try {
    //         const res = await dispatch(readNotifications(id));
    //         console.log(res);
    //     }catch(err){
    //         console.log(err);
    //     }
    // }

    return (
        <div ref={dropdownRef}  className="relative ">
            {/* Badge icon */}
            <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
                <Badge badgeContent={notifications?.count} color="info">
                    <NotificationsIcon className="text-gray-700 dark:text-gray-200 transition-colors duration-300"
                        color="action" />
                </Badge>
            </div>

            {/* Dropdown */}
            <div
                className={` overflow-y-scroll absolute right-0 mt-2 bg-white border-gray-200 rounded shadow z-10 dark:bg-darkBgTwo dark:border-darkBgTwo text-blue dark:text-white w-[200px]  transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 border" : "max-h-0 border-0"
                }`}
            >
                {notifications?.messages?.length > 0 ? (
                    notifications?.messages?.map((notification) => (
                        <div
                            onClick={() => {
                                // count()
                                // addReadNotification(notification.id);
                                setOpen((prev) => !prev)
                                navigate(`/notifications/view/${notification.chat_id}`)
                            }}
                            className={`flex  items-center p-2 gap-2  cursor-pointer  text-[11px] justify-start text-gray-500 hover:bg-gray-200 dark:hover:bg-navBgHover`}
                        >
                            <div className={'w-10 h-10 bg-gray-100 rounded-full'}>
                                <img src='/profile.png' alt=""/>
                            </div>
                            <div className={''}>
                                <p>{new Date(notification.created_at).ddmmyyyy()}</p>
                                <p>{notification.first_name + " " + notification.last_name}</p>
                            </div>


                        </div>
                    ))
                ) : (
                    <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                        {t('notifications.noNotifications')}
                    </div>
                )}
            </div>
        </div>
    );
}

export default NotificationsModal;