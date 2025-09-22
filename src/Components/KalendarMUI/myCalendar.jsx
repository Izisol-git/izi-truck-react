import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

function MyCalendar({ label, value, onChange, disabled, disablePortal = false, errorMessage }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                disablePortal={disablePortal}
                disabled={disabled}
                label={label}
                value={value ? new Date(value) : null}
                onChange={onChange}
                slotProps={{
                    textField: {
                        size: "small",
                        fullWidth: true,
                        error: !!errorMessage,
                        helperText: errorMessage || "",
                    },
                }}
            />
        </LocalizationProvider>
    );
}

export default MyCalendar;
