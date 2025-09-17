import React, {useRef} from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



function MyCalendar({label , value , onChange ,disabled}) {


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                disabled={disabled}
                label={label}
                value={value ? new Date(value) : null}
                onChange={(val) => onChange(val)}
                slotProps={{
                    textField: {
                        size: "small",
                        fullWidth: true,
                    },
                }}
            />
        </LocalizationProvider>

    );
}

export default MyCalendar;
