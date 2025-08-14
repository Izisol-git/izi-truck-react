import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import { useState, useRef } from "react";

export const InvoicesRadioGroup = ({ statusList }) => {
    const [activeRadio, setActiveRadio] = useState();


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
                            setActiveRadio(index);
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
