import React, {useEffect, useState} from 'react';
import {closeOffersModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {InputMUI, MyCalendar} from "../index.js";
import InputFileUpload from "../Buttons/fileButton.jsx";
import {Button, TextareaAutosize} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {MapPin, Package, TruckIcon, Weight} from "lucide-react";
import {addSuggestionsReply} from "../../features/suggestions/suggestionsThunks.js";
import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../API/api.js";

function OffersOrdersCarrier({suggestions}) {
    const isOpenOffersModal = useSelector(state => state.employesModal.isOpenOffersModal);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {addLoadingSuggestionsId} = useSelector((state)=>state.suggestions);

    const [suggestionsData, setSuggestionsData] = useState(
        {
            suggestion_id:'',
            carrier_id: '',
            reply_price: '',
            available_vehicles: '',
            estimated_arrival: '',
            responsible_phone: '',
            textura:'',
        }
    );
    const data = {
        direction: suggestions?.route,
        cargoName: suggestions?.cargo_name,
        weight: suggestions?.cargo_weight,
        trailerInfo: suggestions?.trailer_info,
    }

    const addSuggestionsId= async () => {

        const obj = {
            ...suggestionsData,
            suggestion_id: suggestions?.id,
            carrier_id: user?.user?.id
        }

        // setSuggestionsData({...suggestionsData , suggestion_id: suggestions?.id, carrier_id: user?.user?.id });

        try {
            const res = await dispatch(addSuggestionsReply({id : suggestions?.id , data: obj}));
            dispatch(closeOffersModal())
        }catch(err) {
            console.log(err);
        }
    }



    // useEffect(()=>{
    //     getSuggestion()
    // } , [])


    useEffect(() => {
        setSuggestionsData(
            {
                suggestion_id: '',
                carrier_id: '',
                reply_price: '',
                available_vehicles: '',
                estimated_arrival: '',
                responsible_phone: '',
                textura:'',
            }
        )
    } , [isOpenOffersModal])

    useEffect(() => {
        document.body.style.overflow = isOpenOffersModal ? "hidden" : "auto";
    }, [isOpenOffersModal]);
console.log(suggestionsData)

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 z-[1099] ${
                    isOpenOffersModal ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => dispatch(closeOffersModal())}
            ></div>

            <div className={`fixed top-1/2 left-1/2 w-[50%] max-h-[90vh] bg-white dark:bg-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-2xl rounded overflow-y-auto transform transition-all duration-500 ease-out z-[1100]
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
                    <div className={'px-4 py-2'}>
                        <p className={'text-blue font-bold '}>Javobingiz:</p>
                    </div>



                    <div className={' px-4 py-2  flex items-center gap-4'}>
                        <InputMUI
                            type={'number'}
                            value={suggestionsData.reply_price || ''}
                            onChange={(value) => setSuggestionsData({
                                ...suggestionsData,
                                reply_price: value.target.value
                            })}
                            variant={'outlined'} label={"Narxi"}/>
                        <InputMUI
                            type={'number'}
                            value={suggestionsData.available_vehicles || ''}
                            onChange={(value) => setSuggestionsData({...suggestionsData, available_vehicles: value.target.value})}
                            variant={'outlined'} label={"Mavjud mashinalar"}/>
                    </div>

                    <div className={' px-4 py-2  grid grid-cols-2 gap-4'}>
                        <div className={'relative'}>
                            <MyCalendar
                                value={suggestionsData.estimated_arrival }
                                onChange={(val) => setSuggestionsData({...suggestionsData, estimated_arrival: val})}
                            />

                            <p className={'absolute text-[12px] pt-1 px-1 font-medium -top-[14px] left-2 text-[#3B82F6] bg-white'}>Yetib borish sanasi</p>

                        </div>

                        <InputMUI
                            value={suggestionsData.responsible_phone || ''}
                            onChange={(value) => setSuggestionsData({...suggestionsData, responsible_phone: value.target.value})}
                            variant={'outlined'} label={"Masul shahs teleefoni"}/>
                    </div>
                    <div className={' px-4 py-2'}>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Empty"
                            value={suggestionsData?.textura || ""} // kontrolli qilish
                            onChange={(e) =>
                                setSuggestionsData(prev => ({ ...prev, textura: e.target.value }))
                            }
                            minRows={3} // height o'rniga
                            style={{ width: '100%', border: '2px solid #e5e7eb', borderRadius: 4, padding: 10 }}
                        />

                    </div>
                    <div className={' px-4 py-2 flex gap-4'}>

                        <Button sx={{
                            width: "50%"
                        }} variant="outlined" color="error"

                        onClick={()=> dispatch(closeOffersModal())}
                        >
                            Close
                        </Button>
                        <Button sx={{
                            borderColor: "#1D2D5B", width: "50%", color: "#1D2D5B"
                        }} variant="outlined" color="primary"

                        onClick={addSuggestionsId}

                        >
                            { addLoadingSuggestionsId ? 'sending...' :'Send'}
                        </Button>
                    </div>




                </div>

            </div>
        </>
    );
}

export default OffersOrdersCarrier;