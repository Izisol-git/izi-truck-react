import React, {useEffect, useState} from 'react';
import {closeOffersModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {InputMUI} from "../index.js";
import InputFileUpload from "../Buttons/fileButton.jsx";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

function OffersOrdersCarrier(props) {
    const isOpenOffersModal = useSelector(state => state.employesModal.isOpenOffersModal);
    const dispatch = useDispatch();

    const [suggestionsData, setSuggestionsData] = useState(
        {
            route: '',
            cargo_name: '',
            cargo_weight: '',
            trailer_spec: '',
            price: ''
        }
    );

    useEffect(() => {
        setSuggestionsData(
            {
                route: '',
                cargo_name: '',
                cargo_weight: '',
                trailer_spec: '',
                price: ''
            }
        )
    } , [isOpenOffersModal])

    useEffect(() => {
        document.body.style.overflow = isOpenOffersModal ? "hidden" : "auto";
    }, [isOpenOffersModal]);


    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 z-[1099] ${
                    isOpenOffersModal ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => dispatch(closeOffersModal())}
            ></div>

            <div className={`fixed top-1/2 left-1/2 w-[30%] max-h-[90vh] bg-white dark:bg-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-2xl rounded overflow-y-auto transform transition-all duration-500 ease-out z-[1100]
                  ${isOpenOffersModal ? "opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2" : "opacity-0 scale-90 -translate-x-1/2 -translate-y-1/2 pointer-events-none"}
                `}>


                <div className={'pb-4'}>
                    <div className={'flex items-center justify-between p-4'}>
                        <p className={'text-blue font-bold '}>Sizga mos taklif bor</p>
                        <div onClick={() => dispatch(closeOffersModal())} className={'w-[30px] center h-[30px] hover:bg-gray-200 rounded '}>
                            <i className="fa-solid fa-xmark text-blue"></i>
                        </div>
                    </div>

                    <div className={'px-4 py-2'}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                            {/* Yo'nalish */}
                            <div className="flex items-start gap-2">
                                <MapPin className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5"/>
                                <div>
                                    <p className="font-semibold text-gray-700">Yo'nalish:</p>
                                    <p className="text-gray-600">{data.direction}</p>
                                </div>
                            </div>

                            {/* Yuk nomi */}
                            <div className="flex items-start gap-2">
                                <Package className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5"/>
                                <div>
                                    <p className="font-semibold text-gray-700">Yuk nomi:</p>
                                    <p className="text-gray-600">{data.cargoName}</p>
                                </div>
                            </div>

                            {/* Yuk og'irligi */}
                            <div className="flex items-start gap-2">
                                <Weight className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5"/>
                                <div>
                                    <p className="font-semibold text-gray-700">Yuk og'irligi:</p>
                                    <p className="text-gray-600">{data.weight} kg</p>
                                </div>
                            </div>

                            {/* Treyler ma'lumoti */}
                            <div className="flex items-start gap-2">
                                <TruckIcon className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5"/>
                                <div>
                                    <p className="font-semibold text-gray-700">Treyler ma'lumoti:</p>
                                    <p className="text-gray-600">{data.trailerInfo}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={' px-4 py-2'}>
                        <InputMUI
                            value={suggestionsData.route || ''}
                            onChange={(value) => setSuggestionsData({...suggestionsData, route: value.target.value})}
                            variant={'outlined'} label={'Marshrut'}/>
                    </div>
                    <div className={' px-4 py-2'}>
                        <InputMUI
                            value={suggestionsData.cargo_name || ''}
                            onChange={(value) => setSuggestionsData({
                                ...suggestionsData,
                                cargo_name: value.target.value
                            })}
                            variant={'outlined'} label={'Yuk nomi'}/>
                    </div>
                    <div className={' px-4 py-2'}>
                        <InputMUI
                            type={'number'}
                            value={suggestionsData.cargo_weight || ''}
                            onChange={(value) => setSuggestionsData({
                                ...suggestionsData,
                                cargo_weight: value.target.value
                            })}
                            variant={'outlined'} label={"Yuk og'irligi"}/>
                    </div>
                    <div className={' px-4 py-2'}>
                        <InputMUI
                            value={suggestionsData.trailer_spec || ''}
                            onChange={(value) => setSuggestionsData({...suggestionsData, trailer_spec: value.target.value})}
                            variant={'outlined'} label={"Tirkama xususiyati"}/>
                    </div>
                    <div className={' px-4 py-2'}>
                        <InputMUI
                            value={suggestionsData.price || ''}
                            onChange={(value) => setSuggestionsData({...suggestionsData, price: value.target.value})}
                            variant={'outlined'} label={"Taklif summasi"}/>
                    </div>
                    <div className={' px-4 py-2'}>
                        <InputFileUpload/>
                    </div>
                    <div className={' px-4 py-2 flex gap-4'}>

                        <Button sx={{
                            width: "50%"
                        }} variant="outlined" color="error">
                            Close
                        </Button>
                        <Button sx={{
                            borderColor: "#1D2D5B", width: "50%", color: "#1D2D5B"
                        }} variant="outlined" color="primary"



                        >
                            Send
                        </Button>
                    </div>




                </div>

            </div>
        </>
    );
}

export default OffersOrdersCarrier;