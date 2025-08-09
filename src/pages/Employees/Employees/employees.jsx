import React, {useState} from 'react';
import {Input, Pagination, MUITable, EmployeeModal, AddEmployesModal} from "../../../Components/index.js";


function Employees() {
    const [dropdown, setDropdown] = useState(false);
    const [columnsArry, setColumnsArry] = useState([
        {title: "Full name", active: true},
        {title: "Phone number", active: true},
        {title: "Personal phone", active: true},
        {title: "Start date", active: true},
        {title: "End date", active: true}
    ])
    const [addEmployesModalOpen , setAddEmployeesModalOpen] = useState(false);

    const toggleColumns = (index) => {
        const newColumns = [...columnsArry]
        newColumns[index].active = !newColumns[index].active;
        setColumnsArry(newColumns);
    }

    return (
        <div className={''}>
            <div className={'bg-bacWhite flex '}>
                <div className="w-[90%] mx-auto">
                    <div className="flex items-center  py-5 justify-between">
                        <p className={'text-2xl text-blue font-semibold'}>Employes</p>
                        <div className="center gap-4">
                            <button onClick={() => setAddEmployeesModalOpen(!addEmployesModalOpen)}
                                className={'py-2 px-3 bg-blue text-white rounded hover:ring-2 ring-blue outline-none'}>
                                <i className={'fas fa-plus mr-2'}></i>Добавить
                            </button>
                            <div className="  relative    ">
                                <button onMouseLeave={() => {
                                    setDropdown(false)
                                }} onClick={() => setDropdown(!dropdown)}
                                        className={'py-2 px-3 bg-blue text-white rounded hover:ring-2 ring-blue outline-none'}>
                                    <i
                                        className={'fas fa-columns'}></i>Columns
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
                                                onClick={() => toggleColumns(index)}
                                                className="py-2 px-4 cursor-pointer flex items-center    hover:bg-blue hover:text-white  gap-3  ">
                                                <div className="w-[10%]">{item.active &&
                                                    <i className="fa-solid fa-check"></i>}</div>
                                                <p className={'w-[90%] whitespace-nowrap'}>{item.title}</p>
                                            </div>
                                        ))
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                    <MUITable/>

                </div>
                <AddEmployesModal addEmployesModalOpen={addEmployesModalOpen} addEmployesModalClose={() => setAddEmployeesModalOpen(false)} />
            </div>
        </div>
    );
}

export default Employees;