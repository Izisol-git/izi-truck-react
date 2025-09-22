import React, {useEffect, useState} from 'react';
import {closeOffersModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {InputMUI, LoadingCircular, MyCalendar} from "../index.js";
import InputFileUpload from "../Buttons/fileButton.jsx";
import {Button, TextareaAutosize} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {MapPin, Package, TruckIcon, Weight} from "lucide-react";
import {
    addSuggestionsReply,
    getSuggestionsAdmin,
    getSuggestionsUser
} from "../../features/suggestions/suggestionsThunks.js";
import {useTranslation} from "react-i18next";
import useNotify from "../../hooks/UseNotify/useNotify.jsx";

function OffersOrdersCarrier({mode, indexData}) {
    const {t} = useTranslation();
    const isOpenOffersModal = useSelector(state => state.employesModal.isOpenOffersModal);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {suggestionsId} = useSelector(state => state.suggestions);
    // const { offers } = useSelector(state => state.employesModal);
    const {addLoadingSuggestionsId} = useSelector((state) => state.suggestions);
    const [error, setError] = useState(null);
    const {showMessage} = useNotify()
    const [suggestionsData, setSuggestionsData] = useState({
        suggestion_id: '',
        carrier_id: '',
        reply_price: '',
        available_vehicles: '',
        estimated_arrival: '',
        responsible_phone: '',
        textura: '',
    });

    useEffect(() => {

    } , [isOpenOffersModal])

    const data = {
        direction: suggestionsId?.route,
        cargoName: suggestionsId?.cargo_name,
        weight: suggestionsId?.cargo_weight,
        trailerInfo: suggestionsId?.trailer_info,
    };
    const formatDateForMySQL = (date) => {
        if (!date) return null;

        // Agar date string bo'lsa va T mavjud bo'lsa
        if (typeof date === 'string' && date.includes('T')) {
            return date.split('T')[0];
        }

        // Agar date Date obyekt bo'lsa
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const addSuggestionsId = async () => {
        const obj = {
            ...suggestionsData,
            // suggestion_id: offers?.id,
            estimated_arrival: formatDateForMySQL(suggestionsData?.estimated_arrival),
            carrier_id: user?.user?.id
        };
        try {
            const res = await dispatch(addSuggestionsReply({id: suggestionsId?.id, data: obj})).unwrap()
            showMessage(t('OffersSnackbar.success.send'))
            dispatch(closeOffersModal());
            if (user?.user?.roles[0]?.name === "super-admin") {
                try {
                    const res1 = await dispatch(getSuggestionsAdmin({})).unwrap()
                } catch (err) {
                    console.log(err);
                }
            } else {
                try {
                    const res1 = await dispatch(getSuggestionsUser()).unwrap()
                } catch (err) {
                    console.log(err);
                }
            }

        } catch (err) {
            console.log(err);
            setError(err?.errors)
            showMessage(t('OffersSnackbar.error.send'), 'error')
        }
    };

    useEffect(() => {

        if (mode === 'show') {
            setSuggestionsData((prev) => ({
                ...prev,
                responsible_phone: indexData?.responsible_phone,
                textura: indexData?.note,
                reply_price: indexData?.price,
                available_vehicles: indexData?.available_vehicles,
                estimated_arrival: indexData?.created_at,
            }));

        }

    }, [indexData, isOpenOffersModal])

    useEffect(() => {
        setSuggestionsData({
            suggestion_id: '',
            carrier_id: '',
            reply_price: '',
            available_vehicles: '',
            estimated_arrival: '',
            responsible_phone: '',
            textura: '',
        })
        setError(null);
        document.body.style.overflow = isOpenOffersModal ? "hidden" : "auto";
    }, [isOpenOffersModal]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 z-[1099] ${
                    isOpenOffersModal ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => dispatch(closeOffersModal())}
            ></div>

            {/* Modal */}
            <div
                className={`fixed top-1/2 left-1/2 w-[50%] max-h-[90vh] 
                bg-white text-gray-900 
                dark:bg-darkBg dark:text-darkText 
                border border-gray-200 dark:border-gray-700 
                shadow-2xl rounded overflow-y-auto 
                transform transition-all duration-500 ease-out z-[1100]
                ${
                    isOpenOffersModal
                        ? "opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2"
                        : "opacity-0 scale-90 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                }`}
            >
                <div className="pb-4">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4">
                        <p className="text-blue font-bold dark:text-darkText">{mode === 'show ' ? t("offersOrdersCarrier.title") : t("offersOrdersCarrier.given_suggestion")}</p>
                        <div
                            onClick={() => dispatch(closeOffersModal())}
                            className="w-[30px] center h-[30px] hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        >
                            <i className="fa-solid fa-xmark text-blue"></i>
                        </div>
                    </div>

                    {/* Info section */}
                    <div className="px-4 py-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                            {/* Yo'nalish */}
                            <div className="flex items-start gap-2">
                                <MapPin className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5"/>
                                <div>
                                    <p className="font-semibold text-gray-700 dark:text-darkText">
                                        {t("offersOrdersCarrier.direction")}:
                                    </p>
                                    <p className="text-gray-600 dark:text-darkText/80">{data.direction}</p>
                                </div>
                            </div>

                            {/* Yuk nomi */}
                            <div className="flex items-start gap-2">
                                <Package className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5"/>
                                <div>
                                    <p className="font-semibold text-gray-700 dark:text-darkText">
                                        {t("offersOrdersCarrier.cargoName")}:
                                    </p>
                                    <p className="text-gray-600 dark:text-darkText/80">{data.cargoName}</p>
                                </div>
                            </div>

                            {/* Yuk og'irligi */}
                            <div className="flex items-start gap-2">
                                <Weight className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5"/>
                                <div>
                                    <p className="font-semibold text-gray-700 dark:text-darkText">
                                        {t("offersOrdersCarrier.weight")}:
                                    </p>
                                    <p className="text-gray-600 dark:text-darkText/80">{data.weight} kg</p>
                                </div>
                            </div>

                            {/* Treyler ma'lumoti */}
                            <div className="flex items-start gap-2">
                                <TruckIcon className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5"/>
                                <div>
                                    <p className="font-semibold text-gray-700 dark:text-darkText">
                                        {t("offersOrdersCarrier.trailerInfo")}:
                                    </p>
                                    <p className="text-gray-600 dark:text-darkText/80">{data.trailerInfo}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Response section */}
                    <div className="px-4 py-2">
                        <p className="text-blue font-bold dark:text-darkText">{t("offersOrdersCarrier.response")}:</p>
                    </div>

                    <div className="px-4 py-2 flex items-center gap-4">
                        <InputMUI
                            errorMassage={error?.reply_price}
                            disabled={mode === 'show'}
                            type={"number"}
                            value={suggestionsData?.reply_price || ""}
                            onChange={(value) =>
                                setSuggestionsData({
                                    ...suggestionsData,
                                    reply_price: value.target.value,
                                })
                            }
                            variant={"outlined"}
                            label={t("offersOrdersCarrier.price")}
                        />
                        <InputMUI
                            errorMassage={error?.available_vehicles}
                            disabled={mode === 'show'}
                            type={"number"}
                            value={suggestionsData.available_vehicles || ""}
                            onChange={(value) =>
                                setSuggestionsData({
                                    ...suggestionsData,
                                    available_vehicles: value.target.value,
                                })
                            }
                            variant={"outlined"}
                            label={t("offersOrdersCarrier.availableVehicles")}
                        />
                    </div>

                    <div className="px-4 py-2 grid grid-cols-2 gap-4">
                        <div className="relative">
                            <MyCalendar
                                errorMessage={error?.estimated_arrival}  // <-- errorMassage ni errorMessage ga o'zgartirdik
                                disabled={mode === 'show'}
                                value={suggestionsData.estimated_arrival}
                                onChange={(val) =>
                                    setSuggestionsData({...suggestionsData, estimated_arrival: val})
                                }
                            />
                            <p className="absolute text-[12px] pt-1 px-1 font-medium -top-[14px] left-2 text-[#3B82F6] dark:text-darkText bg-white dark:bg-darkBg">
                                {t("offersOrdersCarrier.estimatedArrival")}
                            </p>
                        </div>


                        <InputMUI
                            errorMassage={error?.responsible_phone}
                            disabled={mode === 'show'}
                            value={suggestionsData.responsible_phone || ""}
                            onChange={(value) =>
                                setSuggestionsData({
                                    ...suggestionsData,
                                    responsible_phone: value.target.value,
                                })
                            }
                            variant={"outlined"}
                            label={t("offersOrdersCarrier.responsiblePhone")}
                        />
                    </div>

                    <div className="px-4 py-2">
                        <TextareaAutosize
                            errorMassage={error?.textura}
                            aria-label="empty textarea"
                            placeholder={t("offersOrdersCarrier.notes")}
                            value={suggestionsData?.textura || ""}
                            onChange={(e) =>
                                setSuggestionsData((prev) => ({...prev, textura: e.target.value}))
                            }
                            minRows={3}
                            style={{
                                width: "100%",
                                border: "2px solid #e5e7eb",
                                borderRadius: 4,
                                padding: 10,
                                backgroundColor: "inherit",
                                color: "inherit",
                            }}
                        />
                    </div>

                    {/* Footer */}
                    {
                        mode !== 'show'
                            ?
                            <div className="px-4 py-2 flex gap-4">
                                <Button
                                    sx={{
                                        width: "50%",
                                        ".dark &": {
                                            backgroundColor: "#2B4764",
                                            color: "#FFFFFF",
                                            border: "none",
                                            '&:hover': {
                                                backgroundColor: "#374151",
                                            },
                                        },
                                    }}
                                    variant="outlined"
                                    color="error"
                                    onClick={() => dispatch(closeOffersModal())}
                                >
                                    {t("offersOrdersCarrier.close")}
                                </Button>
                                <Button
                                    sx={{
                                        borderColor: "#1D2D5B",
                                        width: "50%",
                                        color: "#1D2D5B",
                                        ".dark &": {
                                            backgroundColor: "#2B4764",
                                            color: "#FFFFFF",
                                            '&:hover': {
                                                backgroundColor: "#374151",
                                            },
                                        },
                                    }}
                                    variant="outlined"
                                    color="primary"
                                    onClick={addSuggestionsId}
                                >
                                    {addLoadingSuggestionsId ? <LoadingCircular/> : t("offersOrdersCarrier.send")}
                                </Button>
                            </div>
                            :
                            ""
                    }
                </div>
            </div>
        </>
    );
}

export default OffersOrdersCarrier;
