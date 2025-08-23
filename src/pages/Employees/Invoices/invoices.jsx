import React, { useEffect, useState } from "react";
import ImzoComponent from "../../../Components/IMZOComponent/ImzoComponent.jsx";
import { useDispatch, useSelector } from "react-redux";
import { openInvoicesModal } from "../../../features/EmployeSModalToggle/employesModalToggle.js";
import axios from "axios";
import {getInvoices, getInvoicesStatus} from "../../../features/Invoices/invoicesThunks.js";
import { useSearchParams } from "react-router-dom";
import {
    EmployeesPagination,
    UserPagination,
    InvoicesPagination,
    Loading,
} from "../../../Components/index.js";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

const Invoices = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [total, setTotal] = useState();
    const [employeesId, setEmployeesId] = useState();
    const [employeesData, setEmployeesData] = useState();
    const { loading, error } = useSelector((state) => state.invoices);

    // localStorage bilan sinxron state
    const [activeRadio, setActiveRadio] = useState(
        Number(localStorage.getItem("statusList")) || 0
    );

    // pageqq ni searchParams orqali olish
    const pageqq = Number(searchParams.get("page")) || 1;

    const fetchInvoices = async () => {
        try {
            const obj = {
                activeRadio,
                pageqq,
            };
            const res = await dispatch(getInvoices(obj));
            setTotal(res.payload);
            setEmployeesData(res.payload.data);

            if (res.payload?.success === false) {
                dispatch(openInvoicesModal());
            }
        } catch (e) {
            console.log("error", e);
        }
    };

    // activeRadio yoki pageqq o'zgarsa fetch qilish
    useEffect(() => {
        fetchInvoices();
    }, [activeRadio, pageqq]);

    // activeRadio o'zgarsa page ni reset qilish (masalan, 1-ga)
    useEffect(() => {
        setSearchParams({
            ...Object.fromEntries(searchParams),
            page: 1, // 0 emas, odatda pagination 1-dan boshlanadi
        });
    }, [activeRadio]);

    function handleSignSuccess({ pkcs7, hex, tin }) {
        console.log("✅ Imzo muvaffaqiyatli", { pkcs7, hex, tin });

        const sendData = {
            data: pkcs7,
            hex: hex,
            tin: tin,
        };

        const token = localStorage.getItem("token");

        axios
            .post("http://192.168.10.77:9090/api/save_pkcs7", sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log("Success:", res.data?.success);
                if (res.data?.success === true) {
                    fetchInvoices()
                }
            })
            .catch((err) => {
                console.error("Error:", err.response?.data || err.message);
            });
    }

    const statusList = [
        { label: "Черновик", value: 0 },
        { label: "Ожидают подписи партнера", value: 1 },
        { label: "Ожидает вашей подписи", value: 2 },
        { label: "Подписан", value: 3 },
        { label: "Отказ от подписи", value: 4 },
        { label: "Удален", value: 5 },
        { label: "Ожидают подписи агента", value: 6 },
        { label: "НЕ ДЕЙСТВИТЕЛЬНЫЙ", value: 40 },
        { label: "Аннулирован ГНК", value: 50 },
    ];

    const [columnsArry, setColumnsArry] = useState([
        { title: "Тип документа", active: true },
        { title: "Дата обновления", active: true },
        { title: "Контрагент", active: true },
        { title: "ИНН", active: true },
        { title: "Номер и дата документа", active: true },
        { title: "Номер и дата договора", active: true },
        { title: "Стоимость поставки", active: true },
        { title: "Сумма НДС", active: true },

    ]);

    const handleRadioChange = (value) => {
        localStorage.setItem("statusList", value);
        setActiveRadio(value);
    };

    return (
        <div className={"bg-bacWhite min-h-[calc(100dvh-70px)]"}>
            <div className={"w-[90%] mx-auto flex items-center py-5 justify-between"}>
                <p className={"text-2xl text-blue font-semibold"}>Invoices</p>
                <button
                    onClick={() => dispatch(openInvoicesModal())}
                    className={
                        "py-2 px-3 bg-blue text-white rounded hover:ring-2 ring-blue outline-none"
                    }
                >
                    E-IMZO’ni qayta yuklash
                </button>
            </div>

            <div className={"w-[90%] mx-auto flex flex-col gap-5 bg-white h-full p-5"}>
                <div>
                    <FormControl>
                        <RadioGroup row>
                            <div className="flex flex-wrap gap-2 text-blue">
                                {statusList.map((item) => (
                                    <button
                                        key={item.value}
                                        onClick={() => handleRadioChange(item.value)}
                                        style={{ position: "relative", overflow: "hidden" }}
                                        className={`border-2 px-3 rounded-lg cursor-pointer text-[14px] ${
                                            activeRadio === item.value ? "bg-gray-200" : ""
                                        }`}
                                    >
                                        <FormControlLabel
                                            value={item.label}
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: "#1D2D5B",
                                                        "&.Mui-checked": { color: "#1D2D5B" },
                                                    }}
                                                    checked={activeRadio === item.value}
                                                />
                                            }
                                            label={item.label}
                                        />
                                        <TouchRipple ref={null} center={false} />
                                    </button>
                                ))}
                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>

                <div>
                    {loading ? (
                        <Loading />
                    ) : (
                        <UserPagination
                            setEmployeesId={setEmployeesId}
                            total={total}
                            data={employeesData}
                            arry={columnsArry}
                            setColumnsArry={setColumnsArry}
                            navigateURL={"invoices"}
                        />
                        // ""
                    )}
                </div>
            </div>

            <ImzoComponent onSignSuccess={handleSignSuccess} />
        </div>
    );
};

export default Invoices;
