import React from "react";
import {openModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const statusStyles = {
    new: "bg-cyan-100 text-cyan-700",
    in_progress: "bg-amber-100 text-amber-700",
    done: "bg-emerald-100 text-emerald-700",
    canceled: "bg-rose-100 text-rose-700",
};

function LabeledRow({ label, value }) {
    return (
        <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-gray-500 font-medium select-none">
                {label}
            </p>
            <p className="mt-1 text-sm text-gray-900 truncate">{value || "-"}</p>
        </div>
    );
}

const OrderCard =({ order, onEdit, onDelete, onActDate })=> {
    const badgeClass = statusStyles[order.status] || "bg-gray-100 text-gray-700";
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (

        <div className={' mx-auto py-5 flex flex-col gap-y-5'}>
            <div className="w-full rounded-lg   border-gray-200 bg-white p-5 shadow-sm">
                {/* Top bar */}
                <div className="flex items-center   justify-between  gap-3">
                    <div className={"flex gap-10   items-center  text-xs text-gray-600"}>
                        <div>
                            <div className="text-[11px] text-gray-500">SALES</div>
                            <div className="font-semibold text-gray-900 text-sm leading-5">
                                {order.sales}
                            </div>
                        </div>
                        <div>
                            <div className="text-[11px] text-gray-500">OPERATION</div>
                            <div className="font-semibold text-gray-900 text-sm leading-5">
                                {order.operation}
                            </div>
                        </div>
                    </div>
                    <div className="  flex gap-2 text-sm">

                        <div onClick={()=> {
                            navigate('/orders/edit')
                        }}
                             className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">
                            <i
                                className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>
                        </div>
                        <button
                            onClick={onActDate}
                            className="  rounded   bg-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600"
                        >
                            Дата акта
                        </button>

                    </div>


                </div>

                {/* Grid content */}
                <div className="mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-8 gap-y-4">
                    <LabeledRow label="Клиент" value={order.client}/>
                    <LabeledRow label="POL - city" value={order.polCity}/>
                    <LabeledRow label="ETD" value={order.etd}/>
                    <LabeledRow label="ID" value={order.id}/>
                    <LabeledRow label="POD - city" value={order.podCity}/>
                    <LabeledRow label="Дата создание заказа" value={order.createdAt}/>

                    <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-wide text-gray-500 font-medium select-none">
                            Статус
                        </p>
                        <span
                            className={`mt-1 inline-flex items-center px-2 py-1 text-[11px] font-semibold rounded-full ${badgeClass}`}
                        >
            {order.status === "new"
                ? "Новый заказ"
                : order.status === "in_progress"
                    ? "В работе"
                    : order.status === "done"
                        ? "Завершён"
                        : order.status === "canceled"
                            ? "Отменён"
                            : order.status}
          </span>
                    </div>

                    <LabeledRow label="Дата акта" value={order.actDate}/>
                    <LabeledRow label="Возмещение" value={order.compensation}/>
                    <LabeledRow label="Вознаграждение" value={order.reward}/>
                    <LabeledRow label="ФРАХТ" value={order.freight}/>
                    <LabeledRow label="Страховая премия" value={order.insurance}/>
                    <LabeledRow label="Перевозчик" value={order.carrier}/>
                    <LabeledRow label="Номер автомобиля" value={order.carNumber}/>
                    <LabeledRow label="Номер полуприцепа" value={order.trailerNumber}/>
                    <LabeledRow label="Наименование груза" value={order.cargoName}/>
                    <LabeledRow label="НДС" value={order.vat}/>
                    <LabeledRow label="Простой перевозчика" value={order.carrierIdle}/>
                    <LabeledRow label="ИНН клиента" value={order.clientInn}/>
                    <LabeledRow label="Простой клиента" value={order.clientIdle}/>
                    <LabeledRow label="ИНН перевозчика" value={order.carrierInn}/>
                    <LabeledRow label="Режим" value={order.mode}/>
                    <LabeledRow label="Тип услуги" value={order.serviceType}/>
                    <LabeledRow label="Тип перевозки" value={order.transportType}/>
                </div>

                {/* Footer actions */}

            </div>
            <div className="w-full rounded-lg   border-gray-200 bg-white p-5 shadow-sm">
                {/* Top bar */}
                <div className="flex items-center   justify-between  gap-3">
                    <div className={"flex gap-10   items-center  text-xs text-gray-600"}>
                        <div>
                            <div className="text-[11px] text-gray-500">SALES</div>
                            <div className="font-semibold text-gray-900 text-sm leading-5">
                                {order.sales}
                            </div>
                        </div>
                        <div>
                            <div className="text-[11px] text-gray-500">OPERATION</div>
                            <div className="font-semibold text-gray-900 text-sm leading-5">
                                {order.operation}
                            </div>
                        </div>
                    </div>
                    <div className="  flex gap-2 text-sm">

                        <div onClick={onEdit}
                             className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">
                            <i
                                className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>
                        </div>
                        <button
                            onClick={onActDate}
                            className="  rounded   bg-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600"
                        >
                            Дата акта
                        </button>

                    </div>


                </div>

                {/* Grid content */}
                <div className="mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-8 gap-y-4">
                    <LabeledRow label="Клиент" value={order.client}/>
                    <LabeledRow label="POL - city" value={order.polCity}/>
                    <LabeledRow label="ETD" value={order.etd}/>
                    <LabeledRow label="ID" value={order.id}/>
                    <LabeledRow label="POD - city" value={order.podCity}/>
                    <LabeledRow label="Дата создание заказа" value={order.createdAt}/>

                    <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-wide text-gray-500 font-medium select-none">
                            Статус
                        </p>
                        <span
                            className={`mt-1 inline-flex items-center px-2 py-1 text-[11px] font-semibold rounded-full ${badgeClass}`}
                        >
            {order.status === "new"
                ? "Новый заказ"
                : order.status === "in_progress"
                    ? "В работе"
                    : order.status === "done"
                        ? "Завершён"
                        : order.status === "canceled"
                            ? "Отменён"
                            : order.status}
          </span>
                    </div>

                    <LabeledRow label="Дата акта" value={order.actDate}/>
                    <LabeledRow label="Возмещение" value={order.compensation}/>
                    <LabeledRow label="Вознаграждение" value={order.reward}/>
                    <LabeledRow label="ФРАХТ" value={order.freight}/>
                    <LabeledRow label="Страховая премия" value={order.insurance}/>
                    <LabeledRow label="Перевозчик" value={order.carrier}/>
                    <LabeledRow label="Номер автомобиля" value={order.carNumber}/>
                    <LabeledRow label="Номер полуприцепа" value={order.trailerNumber}/>
                    <LabeledRow label="Наименование груза" value={order.cargoName}/>
                    <LabeledRow label="НДС" value={order.vat}/>
                    <LabeledRow label="Простой перевозчика" value={order.carrierIdle}/>
                    <LabeledRow label="ИНН клиента" value={order.clientInn}/>
                    <LabeledRow label="Простой клиента" value={order.clientIdle}/>
                    <LabeledRow label="ИНН перевозчика" value={order.carrierInn}/>
                    <LabeledRow label="Режим" value={order.mode}/>
                    <LabeledRow label="Тип услуги" value={order.serviceType}/>
                    <LabeledRow label="Тип перевозки" value={order.transportType}/>
                </div>

                {/* Footer actions */}

            </div>
            <div className="w-full rounded-lg   border-gray-200 bg-white p-5 shadow-sm">
                {/* Top bar */}
                <div className="flex items-center   justify-between  gap-3">
                    <div className={"flex gap-10   items-center  text-xs text-gray-600"}>
                        <div>
                            <div className="text-[11px] text-gray-500">SALES</div>
                            <div className="font-semibold text-gray-900 text-sm leading-5">
                                {order.sales}
                            </div>
                        </div>
                        <div>
                            <div className="text-[11px] text-gray-500">OPERATION</div>
                            <div className="font-semibold text-gray-900 text-sm leading-5">
                                {order.operation}
                            </div>
                        </div>
                    </div>
                    <div className="  flex gap-2 text-sm">

                        <div onClick={onEdit}
                             className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">
                            <i
                                className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>
                        </div>
                        <button
                            onClick={onActDate}
                            className="  rounded   bg-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600"
                        >
                            Дата акта
                        </button>

                    </div>


                </div>

                {/* Grid content */}
                <div className="mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-8 gap-y-4">
                    <LabeledRow label="Клиент" value={order.client}/>
                    <LabeledRow label="POL - city" value={order.polCity}/>
                    <LabeledRow label="ETD" value={order.etd}/>
                    <LabeledRow label="ID" value={order.id}/>
                    <LabeledRow label="POD - city" value={order.podCity}/>
                    <LabeledRow label="Дата создание заказа" value={order.createdAt}/>

                    <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-wide text-gray-500 font-medium select-none">
                            Статус
                        </p>
                        <span
                            className={`mt-1 inline-flex items-center px-2 py-1 text-[11px] font-semibold rounded-full ${badgeClass}`}
                        >
            {order.status === "new"
                ? "Новый заказ"
                : order.status === "in_progress"
                    ? "В работе"
                    : order.status === "done"
                        ? "Завершён"
                        : order.status === "canceled"
                            ? "Отменён"
                            : order.status}
          </span>
                    </div>

                    <LabeledRow label="Дата акта" value={order.actDate}/>
                    <LabeledRow label="Возмещение" value={order.compensation}/>
                    <LabeledRow label="Вознаграждение" value={order.reward}/>
                    <LabeledRow label="ФРАХТ" value={order.freight}/>
                    <LabeledRow label="Страховая премия" value={order.insurance}/>
                    <LabeledRow label="Перевозчик" value={order.carrier}/>
                    <LabeledRow label="Номер автомобиля" value={order.carNumber}/>
                    <LabeledRow label="Номер полуприцепа" value={order.trailerNumber}/>
                    <LabeledRow label="Наименование груза" value={order.cargoName}/>
                    <LabeledRow label="НДС" value={order.vat}/>
                    <LabeledRow label="Простой перевозчика" value={order.carrierIdle}/>
                    <LabeledRow label="ИНН клиента" value={order.clientInn}/>
                    <LabeledRow label="Простой клиента" value={order.clientIdle}/>
                    <LabeledRow label="ИНН перевозчика" value={order.carrierInn}/>
                    <LabeledRow label="Режим" value={order.mode}/>
                    <LabeledRow label="Тип услуги" value={order.serviceType}/>
                    <LabeledRow label="Тип перевозки" value={order.transportType}/>
                </div>

                {/* Footer actions */}

            </div>
            <div className="w-full rounded-lg   border-gray-200 bg-white p-5 shadow-sm">
                {/* Top bar */}
                <div className="flex items-center   justify-between  gap-3">
                    <div className={"flex gap-10   items-center  text-xs text-gray-600"}>
                        <div>
                            <div className="text-[11px] text-gray-500">SALES</div>
                            <div className="font-semibold text-gray-900 text-sm leading-5">
                                {order.sales}
                            </div>
                        </div>
                        <div>
                            <div className="text-[11px] text-gray-500">OPERATION</div>
                            <div className="font-semibold text-gray-900 text-sm leading-5">
                                {order.operation}
                            </div>
                        </div>
                    </div>
                    <div className="  flex gap-2 text-sm">

                        <div onClick={onEdit}
                             className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">
                            <i
                                className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>
                        </div>
                        <button
                            onClick={onActDate}
                            className="  rounded   bg-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600"
                        >
                            Дата акта
                        </button>

                    </div>


                </div>

                {/* Grid content */}
                <div className="mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-8 gap-y-4">
                    <LabeledRow label="Клиент" value={order.client}/>
                    <LabeledRow label="POL - city" value={order.polCity}/>
                    <LabeledRow label="ETD" value={order.etd}/>
                    <LabeledRow label="ID" value={order.id}/>
                    <LabeledRow label="POD - city" value={order.podCity}/>
                    <LabeledRow label="Дата создание заказа" value={order.createdAt}/>

                    <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-wide text-gray-500 font-medium select-none">
                            Статус
                        </p>
                        <span
                            className={`mt-1 inline-flex items-center px-2 py-1 text-[11px] font-semibold rounded-full ${badgeClass}`}
                        >
            {order.status === "new"
                ? "Новый заказ"
                : order.status === "in_progress"
                    ? "В работе"
                    : order.status === "done"
                        ? "Завершён"
                        : order.status === "canceled"
                            ? "Отменён"
                            : order.status}
          </span>
                    </div>

                    <LabeledRow label="Дата акта" value={order.actDate}/>
                    <LabeledRow label="Возмещение" value={order.compensation}/>
                    <LabeledRow label="Вознаграждение" value={order.reward}/>
                    <LabeledRow label="ФРАХТ" value={order.freight}/>
                    <LabeledRow label="Страховая премия" value={order.insurance}/>
                    <LabeledRow label="Перевозчик" value={order.carrier}/>
                    <LabeledRow label="Номер автомобиля" value={order.carNumber}/>
                    <LabeledRow label="Номер полуприцепа" value={order.trailerNumber}/>
                    <LabeledRow label="Наименование груза" value={order.cargoName}/>
                    <LabeledRow label="НДС" value={order.vat}/>
                    <LabeledRow label="Простой перевозчика" value={order.carrierIdle}/>
                    <LabeledRow label="ИНН клиента" value={order.clientInn}/>
                    <LabeledRow label="Простой клиента" value={order.clientIdle}/>
                    <LabeledRow label="ИНН перевозчика" value={order.carrierInn}/>
                    <LabeledRow label="Режим" value={order.mode}/>
                    <LabeledRow label="Тип услуги" value={order.serviceType}/>
                    <LabeledRow label="Тип перевозки" value={order.transportType}/>
                </div>

                {/* Footer actions */}

            </div>
            <div className="w-full rounded-lg   border-gray-200 bg-white p-5 shadow-sm">
                {/* Top bar */}
                <div className="flex items-center   justify-between  gap-3">
                    <div className={"flex gap-10   items-center  text-xs text-gray-600"}>
                        <div>
                            <div className="text-[11px] text-gray-500">SALES</div>
                            <div className="font-semibold text-gray-900 text-sm leading-5">
                                {order.sales}
                            </div>
                        </div>
                        <div>
                            <div className="text-[11px] text-gray-500">OPERATION</div>
                            <div className="font-semibold text-gray-900 text-sm leading-5">
                                {order.operation}
                            </div>
                        </div>
                    </div>
                    <div className="  flex gap-2 text-sm">

                        <div onClick={onEdit}
                             className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">
                            <i
                                className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>
                        </div>
                        <button
                            onClick={onActDate}
                            className="  rounded   bg-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600"
                        >
                            Дата акта
                        </button>

                    </div>


                </div>

                {/* Grid content */}
                <div className="mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-8 gap-y-4">
                    <LabeledRow label="Клиент" value={order.client}/>
                    <LabeledRow label="POL - city" value={order.polCity}/>
                    <LabeledRow label="ETD" value={order.etd}/>
                    <LabeledRow label="ID" value={order.id}/>
                    <LabeledRow label="POD - city" value={order.podCity}/>
                    <LabeledRow label="Дата создание заказа" value={order.createdAt}/>

                    <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-wide text-gray-500 font-medium select-none">
                            Статус
                        </p>
                        <span
                            className={`mt-1 inline-flex items-center px-2 py-1 text-[11px] font-semibold rounded-full ${badgeClass}`}
                        >
            {order.status === "new"
                ? "Новый заказ"
                : order.status === "in_progress"
                    ? "В работе"
                    : order.status === "done"
                        ? "Завершён"
                        : order.status === "canceled"
                            ? "Отменён"
                            : order.status}
          </span>
                    </div>

                    <LabeledRow label="Дата акта" value={order.actDate}/>
                    <LabeledRow label="Возмещение" value={order.compensation}/>
                    <LabeledRow label="Вознаграждение" value={order.reward}/>
                    <LabeledRow label="ФРАХТ" value={order.freight}/>
                    <LabeledRow label="Страховая премия" value={order.insurance}/>
                    <LabeledRow label="Перевозчик" value={order.carrier}/>
                    <LabeledRow label="Номер автомобиля" value={order.carNumber}/>
                    <LabeledRow label="Номер полуприцепа" value={order.trailerNumber}/>
                    <LabeledRow label="Наименование груза" value={order.cargoName}/>
                    <LabeledRow label="НДС" value={order.vat}/>
                    <LabeledRow label="Простой перевозчика" value={order.carrierIdle}/>
                    <LabeledRow label="ИНН клиента" value={order.clientInn}/>
                    <LabeledRow label="Простой клиента" value={order.clientIdle}/>
                    <LabeledRow label="ИНН перевозчика" value={order.carrierInn}/>
                    <LabeledRow label="Режим" value={order.mode}/>
                    <LabeledRow label="Тип услуги" value={order.serviceType}/>
                    <LabeledRow label="Тип перевозки" value={order.transportType}/>
                </div>

                {/* Footer actions */}

            </div>
            <div className="w-full rounded-lg   border-gray-200 bg-white p-5 shadow-sm">
                {/* Top bar */}
                <div className="flex items-center   justify-between  gap-3">
                    <div className={"flex gap-10   items-center  text-xs text-gray-600"}>
                        <div>
                            <div className="text-[11px] text-gray-500">SALES</div>
                            <div className="font-semibold text-gray-900 text-sm leading-5">
                                {order.sales}
                            </div>
                        </div>
                        <div>
                            <div className="text-[11px] text-gray-500">OPERATION</div>
                            <div className="font-semibold text-gray-900 text-sm leading-5">
                                {order.operation}
                            </div>
                        </div>
                    </div>
                    <div className="  flex gap-2 text-sm">

                        <div onClick={onEdit}
                             className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">
                            <i
                                className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>
                        </div>
                        <button
                            onClick={onActDate}
                            className="  rounded   bg-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600"
                        >
                            Дата акта
                        </button>

                    </div>


                </div>

                {/* Grid content */}
                <div className="mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-8 gap-y-4">
                    <LabeledRow label="Клиент" value={order.client}/>
                    <LabeledRow label="POL - city" value={order.polCity}/>
                    <LabeledRow label="ETD" value={order.etd}/>
                    <LabeledRow label="ID" value={order.id}/>
                    <LabeledRow label="POD - city" value={order.podCity}/>
                    <LabeledRow label="Дата создание заказа" value={order.createdAt}/>

                    <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-wide text-gray-500 font-medium select-none">
                            Статус
                        </p>
                        <span
                            className={`mt-1 inline-flex items-center px-2 py-1 text-[11px] font-semibold rounded-full ${badgeClass}`}
                        >
            {order.status === "new"
                ? "Новый заказ"
                : order.status === "in_progress"
                    ? "В работе"
                    : order.status === "done"
                        ? "Завершён"
                        : order.status === "canceled"
                            ? "Отменён"
                            : order.status}
          </span>
                    </div>

                    <LabeledRow label="Дата акта" value={order.actDate}/>
                    <LabeledRow label="Возмещение" value={order.compensation}/>
                    <LabeledRow label="Вознаграждение" value={order.reward}/>
                    <LabeledRow label="ФРАХТ" value={order.freight}/>
                    <LabeledRow label="Страховая премия" value={order.insurance}/>
                    <LabeledRow label="Перевозчик" value={order.carrier}/>
                    <LabeledRow label="Номер автомобиля" value={order.carNumber}/>
                    <LabeledRow label="Номер полуприцепа" value={order.trailerNumber}/>
                    <LabeledRow label="Наименование груза" value={order.cargoName}/>
                    <LabeledRow label="НДС" value={order.vat}/>
                    <LabeledRow label="Простой перевозчика" value={order.carrierIdle}/>
                    <LabeledRow label="ИНН клиента" value={order.clientInn}/>
                    <LabeledRow label="Простой клиента" value={order.clientIdle}/>
                    <LabeledRow label="ИНН перевозчика" value={order.carrierInn}/>
                    <LabeledRow label="Режим" value={order.mode}/>
                    <LabeledRow label="Тип услуги" value={order.serviceType}/>
                    <LabeledRow label="Тип перевозки" value={order.transportType}/>
                </div>

                {/* Footer actions */}

            </div>
            <div className="w-full rounded-lg   border-gray-200 bg-white p-5 shadow-sm">
                {/* Top bar */}
                <div className="flex items-center   justify-between  gap-3">
                    <div className={"flex gap-10   items-center  text-xs text-gray-600"}>
                        <div>
                            <div className="text-[11px] text-gray-500">SALES</div>
                            <div className="font-semibold text-gray-900 text-sm leading-5">
                                {order.sales}
                            </div>
                        </div>
                        <div>
                            <div className="text-[11px] text-gray-500">OPERATION</div>
                            <div className="font-semibold text-gray-900 text-sm leading-5">
                                {order.operation}
                            </div>
                        </div>
                    </div>
                    <div className="  flex gap-2 text-sm">

                        <div onClick={onEdit}
                             className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">
                            <i
                                className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>
                        </div>
                        <button
                            onClick={onActDate}
                            className="  rounded   bg-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600"
                        >
                            Дата акта
                        </button>

                    </div>


                </div>

                {/* Grid content */}
                <div className="mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-8 gap-y-4">
                    <LabeledRow label="Клиент" value={order.client}/>
                    <LabeledRow label="POL - city" value={order.polCity}/>
                    <LabeledRow label="ETD" value={order.etd}/>
                    <LabeledRow label="ID" value={order.id}/>
                    <LabeledRow label="POD - city" value={order.podCity}/>
                    <LabeledRow label="Дата создание заказа" value={order.createdAt}/>

                    <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-wide text-gray-500 font-medium select-none">
                            Статус
                        </p>
                        <span
                            className={`mt-1 inline-flex items-center px-2 py-1 text-[11px] font-semibold rounded-full ${badgeClass}`}
                        >
            {order.status === "new"
                ? "Новый заказ"
                : order.status === "in_progress"
                    ? "В работе"
                    : order.status === "done"
                        ? "Завершён"
                        : order.status === "canceled"
                            ? "Отменён"
                            : order.status}
          </span>
                    </div>

                    <LabeledRow label="Дата акта" value={order.actDate}/>
                    <LabeledRow label="Возмещение" value={order.compensation}/>
                    <LabeledRow label="Вознаграждение" value={order.reward}/>
                    <LabeledRow label="ФРАХТ" value={order.freight}/>
                    <LabeledRow label="Страховая премия" value={order.insurance}/>
                    <LabeledRow label="Перевозчик" value={order.carrier}/>
                    <LabeledRow label="Номер автомобиля" value={order.carNumber}/>
                    <LabeledRow label="Номер полуприцепа" value={order.trailerNumber}/>
                    <LabeledRow label="Наименование груза" value={order.cargoName}/>
                    <LabeledRow label="НДС" value={order.vat}/>
                    <LabeledRow label="Простой перевозчика" value={order.carrierIdle}/>
                    <LabeledRow label="ИНН клиента" value={order.clientInn}/>
                    <LabeledRow label="Простой клиента" value={order.clientIdle}/>
                    <LabeledRow label="ИНН перевозчика" value={order.carrierInn}/>
                    <LabeledRow label="Режим" value={order.mode}/>
                    <LabeledRow label="Тип услуги" value={order.serviceType}/>
                    <LabeledRow label="Тип перевозки" value={order.transportType}/>
                </div>

                {/* Footer actions */}

            </div>


        </div>

    );
}

export default OrderCard



