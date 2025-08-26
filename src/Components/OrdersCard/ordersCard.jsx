import React , {useState} from "react";
import {changeDbOrders, openModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {SkeletonMUI} from "../index.js";
import ActData from "../Modal/actData.jsx";

const statusStyles = {
    new: "bg-cyan-100 text-cyan-700",
    in_progress: "bg-amber-100 text-amber-700",
    done: "bg-emerald-100 text-emerald-700",
    canceled: "bg-rose-100 text-rose-700",
};

function LabeledRow({label, value}) {
    return (
        <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-gray-500 font-medium select-none">
                {label}
            </p>
            <p className="mt-1 text-sm text-gray-900 truncate">{value || "-"}</p>
        </div>
    );
}

const OrderCard = ({order, onEdit, onDelete, onActDate, key}) => {
    const badgeClass = statusStyles[order.status] || "bg-gray-100 text-gray-700";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading} = useSelector((state) => state.orders);
    const [open, setOpen] = useState(false);
    const [formAct, setFormAct] =  useState({
        act_date: "",
    });
    // console.log(order);


    return (

        <div className={' mx-auto py-5 flex flex-col gap-y-5'}>
            {
                loading ? <SkeletonMUI/> : <div

                    onDoubleClick={() => {
                        navigate(`/orders/${order?.id}`)
                        dispatch(changeDbOrders(order?.source))
                    }}
                    className="w-full rounded-lg   border-gray-200 bg-white p-5 shadow-sm">
                    {/* Top bar */}
                    <div className="flex items-center   justify-between  gap-3">
                        <div className={"flex gap-10   items-center  text-xs text-gray-600"}>
                            <div>
                                <div className="text-[11px] text-gray-500">SALES</div>
                                <div className="font-semibold text-gray-900 text-sm leading-5">
                                    {order?.sales}
                                </div>
                            </div>
                            <div>
                                <div className="text-[11px] text-gray-500">OPERATION</div>
                                <div className="font-semibold text-gray-900 text-sm leading-5">
                                    {order?.operation}
                                </div>
                            </div>
                        </div>
                        {
                            order?.source === "mysql" ?
                                <div className="  flex gap-2 text-sm">
                                    <div onClick={() => {
                                        navigate(`/orders/edit/${order?.id}`);
                                    }}
                                         className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">
                                        <i
                                            className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>
                                    </div>
                                    <button
                                        onClick={() => {
                                            // onActDate
                                            setOpen(true)
                                        }}
                                        className="  rounded   bg-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600"
                                    >
                                        Дата акта
                                    </button>
                                </div> : ""
                        }

                    </div>

                    {/* Grid content */}
                    <div className="mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-8 gap-y-4">
                        <LabeledRow label="Клиент" value={order?.client_fio}/>
                        <LabeledRow label="POL - city" value={order?.country_of_destination}/>
                        <LabeledRow label="ETD" value={new Date(order?.updated_at).toLocaleDateString("ru-RU")}/>
                        <LabeledRow label="ID" value={order?.id}/>
                        <LabeledRow label="POD - city" value={order?.country_of_departure}/>
                        <LabeledRow label="Дата создание заказа"
                                    value={new Date(order?.created_at).toLocaleDateString("ru-RU")}/>

                        <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-wide text-gray-500 font-medium select-none">
                                Статус
                            </p>
                            <span
                                className={`mt-1 inline-flex items-center px-2 py-1 text-[11px] font-semibold rounded-full ${badgeClass}`}
                            >
            {order?.status === "new"
                ? "Новый заказ"
                : order?.status === "in_progress"
                    ? "В работе"
                    : order?.status === "done"
                        ? "Завершён"
                        : order?.status === "canceled"
                            ? "Отменён"
                            : order?.status}
          </span>
                        </div>

                        <LabeledRow label="Дата акта" value={order?.actDate}/>
                        <LabeledRow label="Возмещение" value={order?.fraxt_price_transfer}/>
                        <LabeledRow label="Вознаграждение" value={order?.carrier_price_transfer}/>
                        <LabeledRow label="ФРАХТ" value={order?.freight}/>
                        <LabeledRow label="Страховая премия" value={order?.insurance}/>
                        <LabeledRow label="Перевозчик" value={order?.carrier}/>
                        <LabeledRow label="Номер автомобиля" value={order?.driver_number}/>
                        <LabeledRow label="Номер полуприцепа" value={order?.driver_trailer}/>
                        <LabeledRow label="Наименование груза" value={order?.weight_of_cargo}/>
                        <LabeledRow label="НДС" value={order?.vat}/>
                        <LabeledRow label="Простой перевозчика" value={order?.carrierIdle}/>
                        <LabeledRow label="ИНН клиента" value={order?.clientInn}/>
                        <LabeledRow label="Простой клиента" value={order?.clientIdle}/>
                        <LabeledRow label="ИНН перевозчика" value={order?.carrierInn}/>
                        <LabeledRow label="Режим" value={order?.mode}/>
                        <LabeledRow label="Тип услуги" value={order?.type_of_loading}/>
                        <LabeledRow label="Тип перевозки" value={order?.transportType}/>
                    </div>

                    {/* Footer actions */}

                </div>
            }

            <ActData id={order?.id} open={open} setOpen={setOpen} form={formAct} setForm={setFormAct}/>

        </div>

    );
}

export default OrderCard



