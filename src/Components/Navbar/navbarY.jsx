import React, {useState} from 'react';
import {LanguageDropdown, ProfileDropdown} from "../index.js";
import {SunDim, Moon} from 'lucide-react'
import {useNavigate} from "react-router-dom";


function NavbarY() {

    const navigate = useNavigate();
    const [isSun, setIsSun] = useState(false);
    const [navbarModal, setNavbarModal] = useState(false);
    // const [navIndex, setNavIndex] = useState(localStorage.getItem("navIndex"));
    const navabrArry = [
        {label: 'Bosh sahifa', icon: 'fas fa-home mr-2', navigate: '/home'},
        {label: 'So‘rovlar', icon: 'fas fa-search mr-2', navigate: '/queries'},
        {label: 'Buyurtmalar', icon: 'fas fa-shopping-cart mr-2', navigate: '/orders'},
        {label: 'Yuk mashinalari', icon: 'fas fa-truck mr-2', navigate: '/trucks'},
        {
            label: 'Foydalanuvchilar', icon: 'fas fa-users mr-2', navigate: '/employees', arry: [
                {name: 'Customers', icon: '"fas fa-user-friends mr-2'},
                {name: 'Drivers', icon: 'fas fa-id-card mr-2'},
                {name: 'Employees', icon: 'fas fa-user-tie mr-2'},
                {name: 'Invoices', icon: 'fas fa-user-tie mr-2'},
            ]
        },
        {label: 'Sozlamalar', icon: 'fas fa-cog mr-2', navigate: '/settings'},
    ]
    const sunToggle = () => {
        setIsSun(!isSun);
    }

    return (
        <div className={'border-b h-[70px]  px-8'}>
            <div className=" flex items-center h-full justify-between">
                <div className="center cursor-pointer   gap-2">
                    <p className="w-[32px] h-[32px]  bg-blue text-white center rounded">
                        IZ
                    </p>
                    <p className={'font-bold text-blue'}>Izitruck</p>
                </div>
                <div className="flex  cursor-pointer   h-full">


                    {
                        navabrArry.map((item, index) => (
                            <div onClick={() => {

                                if(!item.arry) {
                                    navigate(item.navigate)
                                    localStorage.setItem("navIndex", item.navigate)
                                }

                                if (item.arry) {
                                    setNavbarModal(!navbarModal);
                                }
                            }}
                                 onMouseLeave={() => setNavbarModal(false)}
                                 key={index}
                                 className={item.navigate === localStorage.getItem("navIndex") ?
                                     "z-[10]  px-4 bg-blue  text-white transition-all duration-300 ease-in-out"
                                     :
                                     "z-[10] text-blue  px-4 hover:bg-blue hover:text-white transition-all duration-1000 ease-in-out"}>
                                <div className={'center h-full w-full'}>
                                    <i className={item.icon}></i>
                                    <p>
                                        {item.label}
                                    </p>
                                    {item.arry && <i className="fa-solid fa-angle-right"></i>}
                                </div>
                                {
                                    item.arry &&
                                    <div
                                        className={`shadow -mx-4 text-blue ${navbarModal ? "max-h-96 " : "max-h-0 "} w-[calc(100% + 32px)]   transition-all duration-500 overflow-hidden bg-white ease-in-out      `}>
                                        <div onClick={()=> {
                                            navigate('/users/customers')
                                            localStorage.setItem("navIndex", item.navigate)
                                        }}
                                            className="py-2 border-b hover:bg-blue hover:text-white px-2 w-full">Customers
                                        </div>
                                        <div  onClick={()=> {
                                            navigate('/users/drivers')
                                            localStorage.setItem("navIndex", item.navigate)
                                        }}
                                            className="py-2 border-b hover:bg-blue hover:text-white px-2 w-full">Drivers
                                        </div>
                                        <div  onClick={()=> {
                                            navigate('/users/employees')
                                            localStorage.setItem("navIndex", item.navigate)
                                        }}
                                            className="py-2 border-b hover:bg-blue hover:text-white px-2 w-full">Employees
                                        </div>
                                        <div  onClick={()=> {
                                            navigate('/users/invoices')
                                            localStorage.setItem("navIndex", item.navigate)
                                        }}
                                            className="py-2 border-b hover:bg-blue hover:text-white px-2 w-full">Invoices
                                        </div>
                                    </div>
                                }

                            </div>

                        ))
                    }


                </div>

                <div className="center  gap-4">
                    <i className="fa-solid fa-bell text-blue text-lg"></i>
                    <LanguageDropdown/>
                    {isSun ?
                        <i onClick={sunToggle} className={'fas fa-moon font-bold cursor-pointer text-blue'}></i> :
                        <i onClick={sunToggle} className={'fas fa-sun font-bold cursor-pointer text-blue'}></i>}
                    <ProfileDropdown/>

                </div>
            </div>
        </div>
    )
        ;
}

export default NavbarY;
