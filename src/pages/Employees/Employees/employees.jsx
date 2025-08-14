import React, {useState} from 'react';
import {AddEmployesModal, Timeline, EmployeesPagination, CommentModal} from "../../../Components/index.js";
import {inputModalArray} from '../../../Data/employeesData.js'
import {UserNavbar} from "../../index.js";
import {openModal} from "../../../features/EmployeSModalToggle/employesModalToggle.js";
import {useDispatch} from "react-redux";


function Employees() {
    const dispatch = useDispatch();

    const [columnsArry, setColumnsArry] = useState([
        {title: "Full name", active: true},
        {title: "Status", active: true},
        {title: "Phone number", active: true},
        {title: "Personal phone", active: true},
        {title: "Start date", active: true},
        {title: "End date", active: true},
        {title: "Action", active: true},
    ])


    return (
        <div >
            <div className={'bg-bacWhite flex '}>
                <div className="w-[90%] mx-auto">
                    <UserNavbar openModal={()=> dispatch(openModal())} value={'Employees'} columnsArry={columnsArry} setColumnsArry={setColumnsArry}/>
                    <EmployeesPagination arry={columnsArry}  setColumnsArry={setColumnsArry} navigateURL={'employees'}/>
                    <AddEmployesModal  h1={"Employees"}   inputModalArray={inputModalArray}   />
                    <Timeline  />
                </div>
            </div>
        </div>
    );
}

export default Employees;