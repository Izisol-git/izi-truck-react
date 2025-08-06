import React from 'react';
import {Input} from "../../../Components/index.js";


function Employees() {
    return (
        <div>
            <div className="w-[90%] mx-auto h-[calc(100dvh-70px)]  ">
                <div className="flex items-center  py-5 justify-between">
                    <p className={'text-2xl text-blue font-semibold'}>Employes</p>
                    <div className={'w-1/4 relative'}>
                        <Input type={'search'} placeholder={'Search...'}  />
                        <i className="fa-solid fa-magnifying-glass text-blue font-bold absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"></i>
                    </div>
                    <button className={'py-2 px-3 bg-[#5A66F1] text-white rounded hover:ring-2 ring-blue outline-none'}><i className={'fas fa-plus mr-2'}></i>Добавить</button>

                </div>

            </div>
        </div>
    );
}

export default Employees;