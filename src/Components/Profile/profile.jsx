import React, {useState, useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../features/Auth/authSlice.js";
import {useNavigate} from "react-router-dom";
import {User, BarChart3, HelpCircle, Settings, Star, Moon, LogOut} from "lucide-react"
import Switch from "@mui/material/Switch";

const ProfileDropdown = ({sunToggle}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    const dispatch = useDispatch();
    const [darkMode, setDarkMode] = useState(Number(localStorage.getItem("dark")) || false);

    const handleDarkModeToggle = (event) => {
        setDarkMode(event.target.checked)
        console.log(event.target.checked)
        localStorage.setItem("dark", String(darkMode));
        sunToggle()
    }

    const toggleDropdown = () => setOpen(!open);

    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate();

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

    const menuItems = [
        { icon: "fa-solid fa-user-tie", label: "View Profile", hasAction: false },
        { icon: "fa-regular fa-circle-question", label: "Help Center", hasAction: false },
        { icon: "fa-solid fa-gear", label: "Account Settings", hasAction: false },

        // 🔑 Faqat super-admin uchun
        ...(user?.user?.roles[0]?.name === "super-admin"
            ? [
                {
                    icon: "fa-regular fa-comment",
                    label: "Chats",
                    hasAction: false,
                    func: () => {
                        navigate("notifications");
                    },
                },
            ]
            : []),

        {
            icon: "fa-regular fa-moon",
            label: "Dark Mode",
            hasAction: true,
            func: () => {
                sunToggle();
                setDarkMode((prev) => !prev);
            },
        },
        {
            icon: "fa-solid fa-arrow-right-from-bracket",
            label: "Log Out",
            hasAction: false,
            func: () => {
                dispatch(logout());
                navigate("/login");
            },
        },
    ];



    return (

        <>

            <div className=" relative inline-block text-left z-10 " ref={dropdownRef}>
                {/*<button*/}
                {/*    */}
                {/*    className=" w-full h-full   rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none"*/}
                {/*>*/}
                {/*    <i className="fa-solid fa-user-tie"></i>*/}
                {/*</button>*/}

                <div onClick={toggleDropdown} className="flex items-center gap-4    ">
                    <button className="w-12 h-12 rounded-full overflow-hidden">
                        <img src="../../../public/profile.png" alt="Kasper Carlsen"
                             className="w-full h-full object-cover"/>
                    </button>

                </div>


                <div
                    className={` absolute  right-0 top-[65px] w-80 bg-white rounded shadow-lg   font-sans ${open ? 'max-h-96  border-2' : 'max-h-0 border-0 '} overflow-hidden transition-all duration-300    ease-in-out dark:bg-darkBgTwo dark:border-0 `}>
                    {/* Profile Header */}
                    <div onClick={toggleDropdown} className="flex items-center gap-4    px-4 py-2  ">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img src="../../../public/profile.png" alt="Kasper Carlsen"
                                 className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 ">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{
                                    user?.user?.name
                                }</h3>
                                {/*<span*/}
                                {/*    className="bg-black text-white text-xs font-bold px-2 py-1 rounded">PRO</span>*/}
                            </div>
                            <p className="text-gray-600 text-sm dark:text-white">{
                                user?.user?.roles[0]?.name
                            }</p>
                        </div>

                    </div>


                    {/* Menu Items */}
                    <div className="space-y-1  p-2 ">
                        {menuItems.map((item, index) => (
                            <div
                                onClick={item?.func }
                                key={index}
                                className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue    cursor-pointer transition-colors dark:hover:bg-navBgHover"
                            >
                                <div className="flex items-center gap-3 text-blue dark:text-darkText group-hover:text-white">
                                    {/*<item.icon className="w-5 h-5 text-gray-700"/>*/}
                                    {/*<i className="fa-solid fa-user-tie"></i>*/}
                                    <i className={ `${item.icon} dark:text-white`}></i>

                                    <span className=" font-medium">{item.label}</span>
                                </div>
                                {item.hasAction && (
                                    <Switch
                                        checked={darkMode}
                                        onChange={handleDarkModeToggle}
                                        size="small"
                                        sx={{
                                            "& .MuiSwitch-switchBase.Mui-checked": {
                                                color: "#1D2D5B",
                                            },
                                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                                backgroundColor: "#1D2D5B",
                                            },
                                            '.dark & .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':{
                                                color: "#9aa0b1",
                                                backgroundColor: "#9aa0b1",

                                            } ,
                                            '.dark & .MuiSwitch-switchBase.Mui-checked  ':{
                                                color: "#fff",
                                                backgroundColor: "#7d7d80",

                                            }
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>

    );
};

export default ProfileDropdown;
