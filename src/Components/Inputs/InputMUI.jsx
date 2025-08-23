import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputMUI({variant, label, value, type, onChange , defaultValue}) {
    return (
        <Box
            component="form"
            sx={{width: '100%'}}
            noValidate
            autoComplete="off"
        >
            <TextField onChange={onChange} sx={{width: '100%'}} autoComplete={type === 'password' ? "new-password" : ''}
                       type={type} size={'small'} label={label} variant={variant} value={value} defaultValue={defaultValue}     />
        </Box>
    );
}
