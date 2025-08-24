import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

export default function SelectMUI({ label, placeholder, variant,  value, onChange, options   }) {

    return (
        <Stack spacing={1} sx={{ width: "100%" }}>
            <Autocomplete
                size="small"
                options={options}
                value={value || null}
                defaultValue={null}
                // isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => onChange && onChange(newValue)}
                getOptionLabel={(option) => option?.title || option?.company_name || option?.name || option?.label || '' || option?.value || '' }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        placeholder={placeholder}
                        variant={variant}
                    />
                )}
            />
        </Stack>
    );
}
