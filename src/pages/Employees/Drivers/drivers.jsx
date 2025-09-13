import React, {useEffect, useState} from 'react';
import {
    AddEmployesModal,
    Timeline,
    EmployeesPagination,
    UserPagination,
    CommentModal,
    Loading
} from "../../../Components/index.js";
import {inputModalArray} from '../../../Data/driversData.js'

import {UserNavbar} from "../../index.js";
import {openModal} from "../../../features/EmployeSModalToggle/employesModalToggle.js";
import {useDispatch, useSelector} from "react-redux";
import {getEmployees} from "../../../features/Employees/employeeThunks.js";
import {useSearchParams} from "react-router-dom";
import {driversGetId, getDrivers} from "../../../features/Drivers/driversThunks.js";
import ExcelModal from "../../../Components/Modal/excelModal.jsx";
import select from "daisyui/components/select/index.js";

function Drivers() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;
    const [total, setTotal] = useState();
    // const [driversId, setDrversId] = useState();
    const [searchDriver, setSearchDriver] = useState('');
    const [driversData, setDriversData] = useState();
    const [data, setData] = useState();
    const id = useSelector((state) => state.employesModal.driversId);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [dataIndex , setDataIndex] = useState(0);
    const [columnsArry, setColumnsArry] = useState([
        {title: "Имя", active: true},
        {title: "Телефон", active: true},
        {title: "Номер автомобиля", active: true},
        {title: "Номер полу прицепа", active: true},
        {title: "Action", active: true},
    ])

    const exportValues = [
        { id: "fio", value: "ФИО водителя" },
        { id: "phone_number", value: "Телефон" },
        { id: "number", value: "Гос. номер" },
        { id: "trailer_number", value: "Номер прицепа" },
        { id: "brand", value: "Марка" },
        { id: "length", value: "Длина (м)" },
        { id: "width", value: "Ширина (м)" },
        { id: "height", value: "Высота (м)" },
        { id: "capacity", value: "Вместимость" },
        { id: "carrying", value: "Грузоподъемность (т)" },
        { id: "condition", value: "Состояние" },
        { id: "type", value: "Тип ТС" },
        { id: "created_by", value: "Кто добавил водителя" },
        { id: "created_at", value: "Дата добавления" }
    ];


    const DriversId = async ()=> {
        try {
            const res = await dispatch(driversGetId(id)).unwrap()
            setData(res.driver)
            console.log(res)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        if(id !== null){
            DriversId()
        }
    } , [id])


    const driverData = async () => {
       try {
           const res = await dispatch(getDrivers({page: pageqq, search: searchDriver , selectedKeys :  selectedKeys  })).unwrap()
           setDriversData(res.data.data);
           setTotal(res.data)
           setDataIndex({
               current_page: res.data.current_page ,
               per_page:res.data.per_page,
           })
           console.log(res);
       }catch (error){
           console.log(error)
       }
    };

    useEffect(() => {
        driverData();
    }, [pageqq, dispatch, searchDriver]);

    return (
        <div>
            <div className={'bg-bacWhite flex  dark:bg-darkBg min-h-[calc(100dvh-70px)]'}>
                <div className="w-[90%] mx-auto">
                    <UserNavbar value={'Drivers'} columnsArry={columnsArry}
                                setColumnsArry={setColumnsArry}/>
                        <UserPagination dataIndex={dataIndex} setSearch={setSearchDriver}   total={total}
                                    data={driversData} arry={columnsArry} setColumnsArry={setColumnsArry}
                                    navigateURL={'drivers'}  />
                    <Timeline data={data} />
                </div>
            </div>

            <ExcelModal page={pageqq} search={searchDriver}  setSelectedKeys={setSelectedKeys} selectedKeys={selectedKeys}  data={exportValues} mode={'driver'} />

        </div>);
}

export default Drivers;