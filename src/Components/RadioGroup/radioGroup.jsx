import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {useState} from "react";

export default function RowRadioButtonsGroup({onchange}) {
    const [value, setValue] =  useState("outlined"); // boshlang'ich qiymat

    const handleChange = (event) => {
        setValue(event.target.value);

    };
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Input variant</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}                // STATE bilan bog‘ladik
                onChange={(event) => {
                    handleChange(event)
                    onchange(event.target.value)
                    console.log(event.target.value)
                }


                }
            >
                <FormControlLabel value="outlined" control={<Radio />} label="outlined" />
                <FormControlLabel value="standard" control={<Radio />} label="standard" />
                <FormControlLabel value="filled" control={<Radio />} label="filled" />


            </RadioGroup>
        </FormControl>
    );
}
