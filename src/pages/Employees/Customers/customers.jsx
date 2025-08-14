import React, {useState} from 'react';
import {AddEmployesModal, CommentModal, EmployeesPagination, Timeline} from '../../../Components/index.js'
import {openModal} from "../../../features/EmployeSModalToggle/employesModalToggle.js";
import {useDispatch, useSelector} from "react-redux";
import {UserNavbar} from "../../index.js";
import {inputModalArray} from '../../../Data/customersData.js'
import Quill from "quill";

function Customers() {
    const [dropdownCustomers, setDropdownCustomers] = useState(false);
    const [columnsArry, setColumnsArry] = useState([
        {title: "Full name", active: true},
        {title: "Status", active: true},
        {title: "Phone number", active: true},
        {title: "Personal phone", active: true},
        {title: "Start date", active: true},
        {title: "End date", active: true},
        {title: "Action", active: true},

    ])





    const dispatch = useDispatch();


    return (
        <div className={''}>
            <div className={'bg-bacWhite flex '}>
                <div className="w-[90%] mx-auto">
                    <UserNavbar openModal={()=> dispatch(openModal())} value={'Customers'} columnsArry={columnsArry} setColumnsArry={setColumnsArry}/>
                    <EmployeesPagination arry={columnsArry} navigateURL={'customers'}/>
                </div>
                <AddEmployesModal h1={"Customers"}   inputModalArray={inputModalArray} />
                <Timeline/>
                <CommentModal   />

            </div>
        </div>
    );
}

export default Customers;