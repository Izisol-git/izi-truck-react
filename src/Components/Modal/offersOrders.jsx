import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {closeModalHistory, closeOffersModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {InputMUI} from "../index.js";
import InputFileUpload from "../Buttons/fileButton.jsx";
import {Button} from "@mui/material";

function OffersOrders() {
    const isOpenOffersModal = useSelector(state => state.employesModal.isOpenOffersModal);

    useEffect(() => {
        document.body.style.overflow = isOpenOffersModal ? "hidden" : "auto";
    }, [isOpenOffersModal]);

    const dispatch = useDispatch();
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
                        <p className={'text-blue font-bold '}>Taklifingizni yozing</p>
                        <div onClick={() => dispatch(closeOffersModal())} className={'w-[30px] center h-[30px] hover:bg-gray-200 rounded '}>
                            <i className="fa-solid fa-xmark text-blue"></i>
                        </div>
                    </div>

                    <div className={' px-4 py-2'}>
                        <InputMUI variant={'outlined'} label={'Marshrut'}/>
                    </div>
                    <div className={' px-4 py-2'}>
                        <InputMUI variant={'outlined'} label={'Yuk nomi'}/>
                    </div>
                    <div className={' px-4 py-2'}>
                        <InputMUI variant={'outlined'} label={"Yuk og'irligi"}/>
                    </div>
                    <div className={' px-4 py-2'}>
                        <InputMUI variant={'outlined'} label={"Tirkama xususiyati"}/>
                    </div>
                    <div className={' px-4 py-2'}>
                        <InputMUI variant={'outlined'} label={"Taklif summasi"}/>
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
                        }} variant="outlined" color="primary">
                            Send
                        </Button>
                    </div>




                </div>

            </div>
        </>
    );
}

export default OffersOrders;