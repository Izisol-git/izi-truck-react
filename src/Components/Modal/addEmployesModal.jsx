import React, {useEffect, useState} from 'react';

import {SelectMUI, InputMUI, ButtonMUI, RadioGroup} from "../index.js";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";

function AddEmployesModal({h1, inputModalArray=[]}) {
    const [inputVariant, setInputVariant] = useState("outlined");


    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.employesModal.isOpen);


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);




    // if(arry) return null
    return (
        <div>
            <div
                // onMouseLeave={()=> dispatch(closeModal())}
                className={`${isOpen ? "w-1/3 opacity-1" : "w-0 opacity-0"}  fixed overflow-scroll  scrollbar-hide top-0 right-0 bottom-0 h-[100dvh] bg-white shadow-2xl z-10   transition-all duration-300 ease-in-out   flex flex-col justify-between items-start `}>
                <div className={'w-full px-6'}>
                    <div className={"flex items-center justify-between border-b    border-blue p-4"}>
                        <p className={'text-blue font-bold text-lg'}>Add {h1}</p>
                        <div onClick={() => dispatch(closeModal())}
                             className={'w-[30px] h-[30px] cursor-pointer hover:bg-gray-100 rounded center'}>
                            <i className={'fas fa-times text-blue '}></i>
                        </div>
                    </div>
                    <div className={"pt-6  items-center justify-between flex flex-wrap gap-y-4"}>
                        {

                            inputModalArray.map((item, index) => (
                                item.type === "select" ?
                                    <div  key={index} className={"w-full "}>
                                        <SelectMUI variant={inputVariant} label={item.label}
                                                   placeholder={item.label}/>
                                    </div>
                                    :
                                    <div key={index} className={"w-[50%] flex px-2   "}>
                                        <InputMUI variant={inputVariant} label={item.label}
                                                  value={item.value}/>
                                    </div>
                            ))
                        }


                        {/*<div className={"w-full   flex items-center justify-between gap-x-6"}>*/}
                        {/*    <InputMUI variant={inputVariant} label={'Full name'} value={""}/>*/}
                        {/*    <InputMUI variant={inputVariant} label={'Phone'} value={"+9989"}/>*/}
                        {/*</div>*/}


                        {/*<div className={"flex items-center gap-x-6  "}>*/}
                        {/*    <InputMUI variant={inputVariant} label={'Email'} value={""} type={"email"}/>*/}
                        {/*    <InputMUI variant={inputVariant} label={'Password'} type={"password"}/>*/}
                        {/*</div>*/}
                        {/*<div className={"col-span-12"}>*/}
                        {/*    <SelectMUI variant={inputVariant} label={'Status'} placeholder={'Status'}/>*/}
                        {/*</div>*/}
                        {/*<div className={"col-span-12"}>*/}
                        {/*    <InputMUI variant={inputVariant} label={'INN'}/>*/}
                        {/*</div>*/}

                        {/*<ButtonMUI obj={{background: "#1D2D5B", width: "50%"}} title={'send'} variant={'contained'}/>*/}

                        {/*<ButtonMUI obj={{background: "red", width: "50%"}} title={'Close'} variant={'contained'}/>*/}


                    </div>

                    <div className={"py-6 flex flex-col gap-y-6 "}>

                        <RadioGroup onchange={setInputVariant}/>
                    </div>
                </div>


                <div className={" w-full px-6 flex items-center justify-end gap-x-6 mb-6 "}>


                    <Button sx={{
                        borderColor: "#1D2D5B", width: "50%", color: "#1D2D5B"
                    }} variant="outlined" color="primary">
                        Send
                    </Button>
                    <Button sx={{
                        width: "50%"
                    }} variant="outlined" color="error">
                        Close
                    </Button>


                </div>
            </div>

        </div>

    )

}

export default AddEmployesModal;