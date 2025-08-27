import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    closeExcelModal,

} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {Button, Checkbox, CircularProgress, FormControlLabel} from "@mui/material";
import {exportOrdersExcel} from "../../features/orders/ordersThunks.js";
import Box from "@mui/material/Box";

const  ExcelModal =()=> {

    const dispatch = useDispatch();
    const {isOpenExcelModal} = useSelector((state) => state.employesModal);
    const {exporting} = useSelector((state)=>state.orders)

    const exportValues = [
        {  id: "order_id", value: "ЗАКАЗ НОМЕР" },
        {  id: "order_date", value: "Дата Заказа" },
        {  id: "point_of_departure", value: "Пункт отправления" },
        {  id: "point_of_destination", value: "Пункт назначения" },
        {  id: "country_of_departure", value: "Страна отправления" },
        {  id: "country_of_destination", value: "Страна получателя" },
        {  id: "shipment_type", value: "Тип перевозка" },
        {  id: "transport_value", value: "Объем тс" },
        {  id: "customs_clearance1", value: "Место затоможка" },
        {  id: "weight_of_cargo", value: "Вес груза" },
        {  id: "shipment_date", value: "Дата погрузка" },
        {  id: "nature_of_cargo", value: "Наименование перевозимого груза" },
        {  id: "car_number", value: "Номер автомобиля" },
        {  id: "carp_number", value: "Номер полу прицепа" },
        {  id: "carrier_contract_no", value: "Номер контракта перевозчика" },
        {  id: "carrier_company", value: "Перевозчик" },
        {  id: "carrier_tin", value: "ИНН перевозчика" },
        {  id: "carrier_contract_date", value: "Дата контракта перевозчика" },
        {  id: "act_date", value: "Дата акта" },
        {  id: "carrier_price_transfer", value: "Возмещения в Сумах" },
        {  id: "mode", value: "Режим" },
    ]


    const [selectedKeys, setSelectedKeys] = useState([]);

    const handleCheckboxChange = (id, checked) => {
        if (checked) {
            setSelectedKeys((prev) => [...prev, id]);
        } else {
            setSelectedKeys((prev) => prev.filter((item) => item !== id));
        }
    };

    const handleExport = async () => {
        if (selectedKeys.length > 0) {
            try {
                const res = await  dispatch(exportOrdersExcel(selectedKeys)).unwrap();
                dispatch(closeExcelModal())
            }catch(err) {
                console.log(err);
            }
        }
    };

    console.log(selectedKeys);


    useEffect(() => {
        document.body.style.overflow = isOpenExcelModal ? "hidden" : "auto";
    }, [isOpenExcelModal]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 z-[1099] ${
                    isOpenExcelModal
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={() => dispatch(closeExcelModal())}
            ></div>

            {/* Modal */}
            <div
                className={`fixed top-1/2 left-1/2 w-[50%] max-h-[90vh] 
                bg-white dark:bg-darkBg 
                text-gray-800 dark:text-white 
                border border-gray-200 dark:border-gray-700 
                shadow-2xl rounded overflow-y-auto 
                transform transition-all duration-500 ease-out z-[1100]
                ${
                    isOpenExcelModal
                        ? "opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2"
                        : "opacity-0 scale-90 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                }`}
            >
                {/* Header */}
                <div className={"flex items-center justify-between p-4"}>
                    <p className={"text-blue font-bold text-2xl dark:text-white"}>Export to Excel</p>
                    <div
                        onClick={() => dispatch(closeExcelModal())}
                        className={
                            "w-[30px] center h-[30px] hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer"
                        }
                    >
                        <i className="fa-solid fa-xmark text-blue dark:text-white"></i>
                    </div>
                </div>

                {/* Content */}
                <div className={"p-6 grid grid-cols-3 gap-4"}>
                    {exportValues.map((value, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    checked={selectedKeys.includes(value.id)}
                                    onChange={(e) =>
                                        handleCheckboxChange(value.id, e.target.checked)
                                    }
                                    sx={{
                                        color: "#1D2D5B",
                                        "&.Mui-checked": {
                                            color: "#1D2D5B",
                                        },
                                        // 🔥 Dark mode uchun
                                        ".dark &": {
                                            color: "white",
                                            "&.Mui-checked": {
                                                color: "white",
                                            },
                                        },
                                    }}
                                />
                            }
                            label={value.value}
                            sx={{
                                ".dark &": { color: "white" }, // label text dark mode oq
                            }}
                        />
                    ))}

                    {/* Button */}
                    <div className={"col-span-3 flex items-center justify-center mt-4"}>
                        <button
                            onClick={handleExport}
                            className="relative overflow-hidden mx-auto rounded
                     bg-blue dark:bg-btnBgDark
                     text-white py-2 px-3 w-2/3"
                        >
                            {exporting ? (
                                <Box sx={{ display: "flex", width: "100%" }}>
                                    <CircularProgress
                                        sx={{ marginX: "auto" }}
                                        size={25}
                                        color={"inherit"}
                                    />
                                </Box>
                            ) : (
                                <>
                                    <i className="fa-solid fa-cloud-arrow-down text-white mr-2"></i>
                                    Export
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ExcelModal;