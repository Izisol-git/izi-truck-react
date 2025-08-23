import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import {useState, useRef, useEffect} from "react";
import {getInvoices, getInvoicesStatus} from "../../features/Invoices/invoicesThunks.js";
import {openInvoicesModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {useDispatch} from "react-redux";

export const InvoicesRadioGroup = ({ statusList  ,setEmployeesData ,setTotal }) => {

    const dispatch = useDispatch();


    useEffect(() => {

        // const fetchInvoices = async () => {
        //     try{
        //
        //         // setTotal(res.payload)
        //         // setEmployeesData(res.payload.data )
        //         // console.log(res )
        //     }
        //     catch(e){
        //         // dispatch(openInvoicesModal())
        //         // console.log(e);
        //     }
        // }
        // fetchInvoices()

    } , [activeRadio])

    return (
        <FormControl>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                <div className="flex flex-wrap gap-2 text-blue ">
                    {statusList && statusList.map((item, index) => {
                        const rippleRef = useRef(null);

                        const handleClick = (event) => {
                            rippleRef.current.start(event);
                            setTimeout(() => {
                                rippleRef.current.stop(event);
                            }, 300);

                            if(index === 7){
                                localStorage.setItem('statusList', 40);
                                setActiveRadio(40);
                            }else if(index === 8){
                                localStorage.setItem('statusList', 50);
                                setActiveRadio(50);
                            }else {
                                localStorage.setItem('statusList', index);
                                setActiveRadio(index);
                            }
                            console.log(localStorage.getItem('statusList'));
                        };

                        return (
                            <button
                                key={index}
                                onClick={handleClick}
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                                className={`border-2 px-3 rounded-lg cursor-pointer text-[14px] ${
                                    activeRadio === index ? "bg-gray-200" : ""
                                } custom-ripple`}
                            >
                                <FormControlLabel
                                    value={item.label}
                                    sx={{fontSize:'14px'}}
                                    control={
                                        <Radio
                                            sx={{

                                                color: "#1D2D5B",
                                                "&.Mui-checked": {
                                                    color: "#1D2D5B",
                                                },
                                            }}
                                            checked={activeRadio === index}
                                        />
                                    }
                                    label={item.label}
                                />
                                <TouchRipple ref={rippleRef} center={false} />
                            </button>
                        );
                    })}
                </div>
            </RadioGroup>
        </FormControl>
    );
};

export default InvoicesRadioGroup;
