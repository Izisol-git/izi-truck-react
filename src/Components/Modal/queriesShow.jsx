import {Truck, Package, Scale, CheckCircle, Clock} from "lucide-react"
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllSelect, GetQueriesId} from "../../features/Queries/queriesThunks.js";
import {useNavigate} from "react-router-dom";
import {openQueriesShow} from "../../features/EmployeSModalToggle/employesModalToggle.js";


const StatusId = ({id}) => {
    if (id === 2) {
        return (<div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white"/>
            </div>
            <div>
                <div className="text-xs text-red-800 uppercase">СТАТУС</div>
                <div className="font-medium text-red-800">Ожидается</div>
            </div>
        </div>)
    }
    return (
        <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white"/>
            </div>
            <div>
                <div className="text-xs text-gray-600 uppercase">СТАТУС</div>
                <div className="font-medium text-green-800">Доставлен</div>
            </div>
        </div>
    );
}


export default function LogisticsInterface() {

    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [allselect, setAllselect] = useState([]);
    const [data , setData] = useState();

    const isOpen = useSelector((state) => state.employesModal.isOpenQueriesShow);
    const id = useSelector((state) => state.employesModal.queriesId);



    const getQueriesId = async () => {
        try {
            const res = await dispatch(GetQueriesId(id)).unwrap()
            console.log(res);
            setData(res.query);
            setAllselect(res)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if(isOpen)
            getQueriesId()
    } , [id ])






    const typePayment = [
        {value: 'cash', title: "Перечисления"},
        {value: 'enumeration', title: "Нақд"},
        {value: 'combined', title: "Ярим перечисления"},
    ];

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    return (
        <div onClick={()=> {
            dispatch(openQueriesShow())
        }} className={` fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 z-[1099] ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div onClick={(e)=> e.stopPropagation()} className=" w-[90%] mt-10     mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Main content */}
                <div className="p-6 space-y-6">
                    {/* Shipment details grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        {/* Origin */}
                        <div className="space-y-2">
                            <div>
                                <span className="text-gray-600">Страна отправления: </span>
                                <span
                                    className="text-brandBlue-600 font-medium">{data?.from_address[0]?.country?.title}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Область отправления: </span>
                                <span
                                    className="text-brandBlue-600 font-medium">{data?.from_address[0]?.region?.title}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Город отправления: </span>
                                <span
                                    className="text-brandBlue-600 font-medium">{data?.from_address[0]?.city?.title}</span>
                            </div>
                            {/*<div>*/}
                            {/*    <span className="text-gray-600">Адрес таможенного оформления(затаможка): </span>*/}
                            {/*    <span className="text-brandBlue-600 font-medium">на месте</span>*/}
                            {/*</div>*/}
                        </div>

                        {/* Destination */}
                        <div className="space-y-2">
                            <div>
                                <span className="text-gray-600">Страна прибытия: </span>
                                <span
                                    className="text-brandBlue-600 font-medium">{data?.to_address[0]?.country?.title}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Область прибытия: </span>
                                <span
                                    className="text-brandBlue-600 font-medium">{data?.to_address[0]?.region?.title}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Город прибытия: </span>
                                <span
                                    className="text-brandBlue-600 font-medium">{data?.to_address[0]?.city?.title}</span>
                            </div>
                            {/*<div>*/}
                            {/*    <span className="text-gray-600">Адрес таможенного оформления(растаможка): </span>*/}
                            {/*    <span className="text-brandBlue-600 font-medium">{data?.data?.[0]?.from_address[0]?.country?.title}</span>*/}
                            {/*</div>*/}
                        </div>

                        {/* Client info */}
                        <div className="space-y-2">
                            <div>
                                <span className="text-gray-600">Название клиента: </span>
                                <span className="text-brandBlue-600 font-medium">{data?.client?.fio}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">ИНН клиента: </span>
                                <span className="text-brandBlue-600 font-medium">{data?.inn}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Название перевозчика: </span>
                                <span className="text-brandBlue-600 font-medium">{user?.employee?.user?.name}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">ИНН перевозчика: </span>
                                <span className="text-brandBlue-600 font-medium">{user?.employee?.tin}</span>
                            </div>
                        </div>
                    </div>

                    {/* Transport details with icons */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Transport type */}
                        <div className="flex items-center space-x-3 p-4 bg-brandBlue-50 rounded-lg">
                            <div className="w-10 h-10 bg-brandBlue-600 rounded-full flex items-center justify-center">
                                <Truck className="w-5 h-5 text-white"/>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600 uppercase">ТИП ТРАНСПОРТА</div>
                                <div
                                    className="font-medium text-gray-900">
                                    {allselect?.transport_types?.find((opt) => opt.id === data?.transport_type_id)?.name}
                                </div>
                            </div>
                        </div>

                        {/* Volume */}
                        <div className="flex items-center space-x-3 p-4 bg-brandBlue-50 rounded-lg">
                            <div className="w-10 h-10 bg-brandBlue-600 rounded-full flex items-center justify-center">
                                <Package className="w-5 h-5 text-white"/>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600 uppercase">ОБЪЕМ ТРАНСПОРТА</div>
                                <div
                                    className="font-medium text-gray-900">{allselect?.transport_volumes?.find((opt) => opt.id === data?.transport_volume_id)?.value} М3
                                </div>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center space-x-3 p-4 bg-brandBlue-50 rounded-lg">
                            <div className="w-10 h-10 bg-brandBlue-600 rounded-full flex items-center justify-center">
                                <div className="text-white font-bold text-sm">1</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600 uppercase">КОЛИЧЕСТВО МАШИН</div>
                                <div className="font-medium text-gray-900">1 ШТ</div>
                            </div>
                        </div>

                        {/* Weight */}
                        <div className="flex items-center space-x-3 p-4 bg-brandBlue-50 rounded-lg">
                            <div className="w-10 h-10 bg-brandBlue-600 rounded-full flex items-center justify-center">
                                <Scale className="w-5 h-5 text-white"/>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600 uppercase">ВЕС ГРУЗА (КГ)</div>
                                <div className="font-medium text-gray-900">{data?.weight} КГ</div>
                            </div>
                        </div>
                    </div>

                    {/* Status */}


                    <StatusId id={data?.status_id}/>

                    {/* Additional details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div className="space-y-2">
                            <div>
                                <span className="text-gray-600">ID: </span>
                                <span className="font-medium">{data?.id}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Степень опасности: </span>
                                {data?.status_of_cargo === 0 ?
                                    <span
                                        className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">НЕ ОПРЕДЕЛЕН</span> :
                                    <span
                                        className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">{data?.degree_of_danger}</span>}
                            </div>
                            <div>
                                <span className="text-gray-600">Режим: </span>
                                {data?.transport_type_id !== 3 ?
                                    <span
                                        className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium"> 'НЕ ОПРЕДЕЛЕН' </span> :
                                    <span
                                        className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium"> {data?.mode} </span>}
                            </div>

                            {/*<div>*/}
                            {/*    <span className="text-gray-600">Особые условия: </span>*/}
                            {/*    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">НЕ ОПРЕДЕЛЕН</span>*/}
                            {/*</div>*/}


                        </div>
                        <div className="space-y-2">
                            <div>
                                <span className="text-gray-600">Дата погрузки: </span>
                                <span
                                    className="font-medium text-brandBlue-600">{new Date(data?.load_time_from).ddmmyyyy()}</span>
                            </div>


                            <div className="space-y-1">
                                <div>
                                    <span className="text-gray-600">Создано: </span>
                                    <span
                                        className="font-medium text-brandBlue-600">{new Date(data?.created_at).ddmmyyyy()}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Изменено: </span>
                                    <span
                                        className="font-medium text-brandBlue-600">{new Date(data?.updated_at).ddmmyyyy()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <span className="text-gray-600">Тип оплаты: </span>
                                <span
                                    className="font-medium text-brandBlue-600">{typePayment?.find((opt) => opt.value === data?.payment_method)?.title} </span>
                            </div>
                            <div>
                                <span className="text-gray-600">Груз: </span>
                                <span className="font-medium text-brandBlue-600">{data?.title}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Цена клиента: </span>
                                <span
                                    className="font-medium text-brandBlue-600">{data?.client_enumeration_price}</span>
                            </div>

                        </div>
                    </div>

                    {/* Payment and pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div className="space-y-2">

                        </div>
                        <div className="space-y-2 text-right">

                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <Button variant="contained" size="sm" color={'error'}>
                            <i className="fa-solid fa-trash mr-2"></i> Delete
                        </Button>
                        <Button onClick={()=>{
                            navigate(`/queries/edit/${id}`)
                        }} variant="contained" size="sm" color={'warning'}>
                            <i className={'fa-solid fa-pen-to-square mr-2'}></i> Edit
                        </Button>
                        {/*<Button variant="contained" size="sm" className="bg-brandBlue-600 hover:bg-brandBlue-700">*/}
                        {/*    Поднять на верх*/}
                        {/*</Button>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}
