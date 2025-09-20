import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {closeOffersModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {InputMUI} from "../index.js";
import InputFileUpload from "../Buttons/fileButton.jsx";
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import {
    addSuggestions,
    editSuggestions,
    getSuggestionsAdmin,
    getSuggestionsUser
} from "../../features/suggestions/suggestionsThunks.js";
import {useTranslation} from "react-i18next";

function OffersOrders() {
    const {t} = useTranslation();
    const isOpenOffersModal = useSelector(state => state.employesModal.isOpenOffersModal);
    const {addLoadingSuggestions ,suggestionsId} = useSelector((state) => state.suggestions);
    const {addEditToggleOffers} = useSelector((state) => state.employesModal);
    const {offersId} = useSelector((state) => state.employesModal);
     const {user} = useSelector((state) => state.auth);
    // const [getSuggestions, setSuggestions] = useState();
    const [suggestionsData, setSuggestionsData] = useState({
        route: '',
        cargo_name: '',
        cargo_weight: '',
        trailer_spec: '',
        price: ''
    });
    const [status, setStatus] = useState(1); // boshlang'ich qiymat -1

    const handleChange = (event) => {
        setStatus(event.target.checked ? -1 : 1);
    };
    const dispatch = useDispatch();

    useEffect(() => {
        setSuggestionsData({
            route: '',
            cargo_name: '',
            cargo_weight: '',
            trailer_spec: '',
            price: ''
        });
    }, [isOpenOffersModal]);





    useEffect(() => {
        if (suggestionsId) {
            setSuggestionsData(
                {
                    route: suggestionsId?.route,
                    cargo_name: suggestionsId?.cargo_name,
                    cargo_weight: suggestionsId?.cargo_weight,
                    trailer_spec: suggestionsId?.trailer_spec,
                    price: suggestionsId?.price,
                }
            )
        }
    }, [offersId , suggestionsId])

    const editSuggestion = async () => {
        try {
            const res = await dispatch(editSuggestions({offersId, suggestionsData: {...suggestionsData , status : status} })).unwrap();
            if ( user?.user?.roles[0]?.name === "super-admin") {
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
            dispatch(closeOffersModal());

            console.log(res);
        } catch (e) {
            console.error(e);
        }
    }
    const Suggestions = async () => {
        try {
            const res = await dispatch(addSuggestions(suggestionsData)).unwrap();

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
            dispatch(closeOffersModal());
            console.log(res);
        } catch (e) {
            console.error(e);
        }
    }


    useEffect(() => {
        document.body.style.overflow = isOpenOffersModal ? "hidden" : "auto";
    }, [isOpenOffersModal]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 z-[1099] ${isOpenOffersModal ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => dispatch(closeOffersModal())}
            ></div>

            {/* Modal */}
            <div
                className={`fixed top-1/2 left-1/2 w-[30%] max-h-[90vh] bg-white text-gray-900 dark:bg-darkBg dark:text-darkText border border-gray-200 dark:border-gray-700 shadow-2xl rounded overflow-y-auto transform transition-all duration-500 ease-out z-[1100]
                ${isOpenOffersModal ? "opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2" : "opacity-0 scale-90 -translate-x-1/2 -translate-y-1/2 pointer-events-none"}`}
            >
                <div className={"pb-4"}>
                    {/* Header */}
                    <div className={"flex items-center justify-between p-4"}>
                        <p className={"text-blue font-bold"}>{addEditToggleOffers ? t("offersOrders.writeYourOffer") : "Edit"}</p>
                        <div
                            onClick={() => dispatch(closeOffersModal())}
                            className={"w-[30px] center h-[30px] hover:bg-gray-200 dark:hover:bg-gray-700 rounded"}
                        >
                            <i className="fa-solid fa-xmark text-blue"></i>
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className={"px-4 py-2"}>
                        <InputMUI
                            value={suggestionsData.route || ""}
                            onChange={(value) =>
                                setSuggestionsData({...suggestionsData, route: value.target.value})
                            }
                            variant={"outlined"}
                            label={t("offersOrders.route")}
                        />
                    </div>
                    <div className={"px-4 py-2"}>
                        <InputMUI
                            value={suggestionsData.cargo_name || ""}
                            onChange={(value) =>
                                setSuggestionsData({...suggestionsData, cargo_name: value.target.value})
                            }
                            variant={"outlined"}
                            label={t("offersOrders.cargoName")}
                        />
                    </div>
                    <div className={"px-4 py-2"}>
                        <InputMUI
                            type={"number"}
                            value={suggestionsData.cargo_weight || ""}
                            onChange={(value) =>
                                setSuggestionsData({...suggestionsData, cargo_weight: value.target.value})
                            }
                            variant={"outlined"}
                            label={t("offersOrders.cargoWeight")}
                        />
                    </div>
                    <div className={"px-4 py-2"}>
                        <InputMUI
                            value={suggestionsData.trailer_spec || ""}
                            onChange={(value) =>
                                setSuggestionsData({...suggestionsData, trailer_spec: value.target.value})
                            }
                            variant={"outlined"}
                            label={t("offersOrders.trailerSpec")}
                        />
                    </div>
                    <div className={"px-4 py-2"}>
                        <InputMUI
                            value={suggestionsData.price || ""}
                            onChange={(value) =>
                                setSuggestionsData({...suggestionsData, price: value.target.value})
                            }
                            variant={"outlined"}
                            label={t("offersOrders.offerPrice")}
                        />
                    </div>


                  <div className={"px-4 py-2"}>
                      <FormControlLabel
                          control={
                              <Checkbox
                                  checked={status === -1}     // 1 bo‘lsa belgilangan
                                  onChange={handleChange}    // almashganda 1 yoki -1 qiladi
                              />
                          }
                          label={`${t('offersOrders.status')}: ${status === 1 ? t('offersOrders.active') : t('offersOrders.inactive')}`}     // ko‘rsatish uchun
                      />

                  </div>
                    {/* File Upload */}
                    <div className={"px-4 py-2"}>
                        <InputFileUpload/>
                    </div>

                    {/* Footer Buttons */}
                    <div className={"px-4 py-2 flex gap-4"}>
                        <Button
                            sx={{width: "50%"}}
                            variant="outlined"
                            color="error"
                            onClick={() => dispatch(closeOffersModal())}
                        >
                            {t("offersOrders.close")}
                        </Button>
                        <Button
                            sx={{borderColor: "#1D2D5B", width: "50%", color: "#1D2D5B"}}
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                addEditToggleOffers ? Suggestions() : editSuggestion()
                            }}
                        >
                            {addLoadingSuggestions ? t("offersOrders.sending") : t("offersOrders.send")}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OffersOrders;
