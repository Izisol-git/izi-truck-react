import React, {useRef} from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



function MyCalendar({label , value , onChange}) {


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={label}
                value={value}
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
