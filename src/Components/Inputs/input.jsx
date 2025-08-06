import React from 'react';
import {TextField} from "@mui/material";

function Input({value, onChange, placeholder, id, type, autocomplete}) {
    return (
        <>
            <input

                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autocomplete}
                className="w-full px-4 py-2 border-blue border rounded  outline-none ring-[#3E3C6B] focus:ring-[1.5px] "
            />
            {/*<TextField id="outlined-basic" label="Outlined" variant="outlined" />*/}
        </>
    );
}

export default Input;