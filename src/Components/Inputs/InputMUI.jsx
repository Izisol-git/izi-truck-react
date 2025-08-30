import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputMUI({variant, label, value, type, onChange , defaultValue , errorMassage}) {
    return (
        <Box
            component="form"
            sx={{ width: "100%" }}
            noValidate
            autoComplete="off"
        >
            <TextField
                onChange={onChange}
                sx={{
                    width: "100%",


                    // 🔥 Dark mode
                    ".dark &": {
                        "& .MuiInputBase-root": {
                            backgroundColor: "#444444", // dark fon
                            color: "white", // text oq
                        },
                        "& label": {
                            color: "#9CA3AF", // kulrang label
                        },
                        "& label.Mui-focused": {
                            color: "white", // fokusda oq bo‘ladi
                        },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "#374151", // gray-700
                            },
                            "&:hover fieldset": {
                                borderColor: "#4B5563", // gray-600
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "white",
                            },
                        },
                    },
                }}
                autoComplete={type === "password" ? "new-password" : ""}
                type={type}
                size="small"
                label={label}
                variant={variant}
                value={value}
                defaultValue={defaultValue}
                error={errorMassage}
                helperText={errorMassage ? errorMassage[0] : ""}
            />
        </Box>

    );
}
