import React, { useEffect, useState } from "react";
import ImzoComponent from "../../../Components/IMZOComponent/ImzoComponent.jsx";
import { useDispatch, useSelector } from "react-redux";
import { openInvoicesModal } from "../../../features/EmployeSModalToggle/employesModalToggle.js";
import axios from "axios";
import {EimzoConnection, getInvoices} from "../../../features/Invoices/invoicesThunks.js";
import { useSearchParams } from "react-router-dom";
import {
    UserPagination,
    Loading,
} from "../../../Components/index.js";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTranslation } from "react-i18next";

const Invoices = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [total, setTotal] = useState();
    const [employeesData, setEmployeesData] = useState();
    const { loading } = useSelector((state) => state.invoices);
    console.log(employeesData)

    // localStorage bilan sinxron state
    const [activeRadio, setActiveRadio] = useState(
        Number(localStorage.getItem("statusList")) || 0
    );

    // pageqq ni searchParams orqali olish
    const pageqq = Number(searchParams.get("page")) || 1;

    const fetchInvoices = async () => {
        try {
            const obj = { activeRadio, pageqq };
            const res = await dispatch(getInvoices(obj)).unwrap()
            setTotal(res);
            setEmployeesData(res);
            console.log(res)

        } catch (e) {
            console.log("error", e);
            if (e?.success === false) {
                dispatch(openInvoicesModal());
            }
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
            page: 1,
        });
    }, [activeRadio]);

    async  function handleSignSuccess({ pkcs7, hex, tin }) {
        console.log("✅ Imzo muvaffaqiyatli", { pkcs7, hex, tin });
        const sendData = { data: pkcs7, hex: hex, tin: tin };
         try{
            const res = await dispatch(EimzoConnection(sendData)).unwrap()
            console.log(res)
            if (res?.success === true) {
                fetchInvoices();
            }
        }
        catch(err){
            console.error("Error:", err.response?.data || err.message);
        }
        // axios
        //     .post("https://backend.izitruck.uz/api/save_pkcs7", sendData, {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //             "Content-Type": "application/json",
        //         },
        //     })
        //     .then((res) => {
        //
        //     })
        //     .catch((err) => {
        //
        //     });
    }

    const statusList = [
        { label: "Черновик", key: "invoices.status.draft", value: 0 },
        { label: "Ожидают подписи партнера", key: "invoices.status.partnerSign", value: 1 },
        { label: "Ожидает вашей подписи", key: "invoices.status.yourSign", value: 2 },
        { label: "Подписан", key: "invoices.status.signed", value: 3 },
        { label: "Отказ от подписи", key: "invoices.status.rejected", value: 4 },
        { label: "Удален", key: "invoices.status.deleted", value: 5 },
        { label: "Ожидают подписи агента", key: "invoices.status.agentSign", value: 6 },
        { label: "НЕ ДЕЙСТВИТЕЛЬНЫЙ", key: "invoices.status.invalid", value: 40 },
        { label: "Аннулирован ГНК", key: "invoices.status.cancelledByGNK", value: 50 },
    ];

    const [columnsArry, setColumnsArry] = useState([
        { title: "Тип документа", key: "invoices.documents.type", active: true },
        { title: "Дата обновления", key: "invoices.documents.updateDate", active: true },
        { title: "Контрагент", key: "invoices.documents.contractor", active: true },
        { title: "ИНН", key: "invoices.documents.tin", active: true },
        { title: "Номер и дата документа", key: "invoices.documents.docNumberDate", active: true },
        { title: "Номер и дата договора", key: "invoices.documents.contractNumberDate", active: true },
        { title: "Стоимость поставки", key: "invoices.documents.supplyCost", active: true },
        { title: "Сумма НДС", key: "invoices.documents.vatAmount", active: true },
    ]);

    const handleRadioChange = (value) => {
        localStorage.setItem("statusList", value);
        setActiveRadio(value);
    };

    return (
        <div className={"bg-bacWhite min-h-[calc(100dvh-70px)] dark:bg-darkBg"}>
            <div className={"w-[90%] mx-auto flex items-center py-5 justify-between"}>
                <p className={"text-2xl text-blue font-semibold dark:text-darkText"}>{t('invoices.invoices')}</p>
                <button
                    onClick={() => dispatch(openInvoicesModal())}
                    className={
                        "py-2 px-3 bg-blue text-white rounded hover:ring-2 ring-blue outline-none"
                    }
                >
                    {t("invoices.reloadEimzo")}
                </button>
            </div>

            <div className={"w-[90%] mx-auto flex flex-col gap-5 bg-white h-full p-5 rounded dark:bg-darkBgTwo"}>
                <div>
                    <FormControl>
                        <RadioGroup row>
                            <div className="flex flex-wrap gap-2 text-blue dark:text-darkText">
                                {statusList.map((item) => (
                                    <button
                                        key={item.value}
                                        onClick={() => handleRadioChange(item.value)}
                                        style={{ position: "relative", overflow: "hidden" }}
                                        className={`border-2 px-3 rounded-lg cursor-pointer text-[14px] ${
                                            activeRadio === item.value ? "bg-gray-200 dark:bg-navBgHover" : ""
                                        }`}
                                    >
                                        <FormControlLabel
                                            value={item.value}
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: "#1D2D5B",
                                                        "&.Mui-checked": { color: "#1D2D5B" },
                                                        "@media (prefers-color-scheme: dark)": {
                                                            color: "#fff",
                                                            "&.Mui-checked": { color: "#fff" },
                                                        },
                                                    }}
                                                    checked={activeRadio === item.value}
                                                />
                                            }
                                            label={t(item.key, { defaultValue: item.label })}
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
                            total={total}
                            data={employeesData}
                            arry={columnsArry.map((col) => ({
                                ...col,
                                title: t(col.key, { defaultValue: col.title }),
                            }))}
                            setColumnsArry={setColumnsArry}
                            navigateURL={"invoices"}
                        />
                    )}
                </div>
            </div>

            <ImzoComponent onSignSuccess={handleSignSuccess} />
        </div>
    );
};

export default Invoices;
