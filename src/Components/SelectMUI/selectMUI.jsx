import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Paper from "@mui/material/Paper";

export default function SelectMUI({label, placeholder, variant, value, onChange, options, errorMassage , disabled}) {

    return (
        <Stack spacing={1} sx={{width: "100%"}}>
            <Autocomplete
                // key={options}
                disabled={disabled}
                size="small"
                options={options}
                value={value || null}
                defaultValue={null}
                onChange={(event, newValue) => onChange && onChange(newValue)}
                getOptionLabel={(option) =>
                    option?.title ||
                    option?.company_name ||
                    option?.name ||
                    option?.fio ||
                    option?.label ||
                    option?.value ||
                    ""
                }
                // 🔑 MUI ga "qaysi biri teng" ekanini aniq aytamiz
                isOptionEqualToValue={(option, value) => option.id === value.id}

                // 🔑 Har doim ID unikal bo‘lishi kerak
                renderOption={(props, option) => (
                    <li {...props} key={option.id ?? `${option.title}`}>
                        {
                            option?.title ||
                            option?.company_name ||
                            option?.name ||
                            option?.fio ||
                            option?.label ||
                            option?.value || " "
                        }
                    </li>
                )}
                PaperComponent={(props) => (
                    <Paper

                        {...props}
                        sx={{
                            backgroundColor: "white",
                            color: "black",

                            // 🔥 Dark mode
                            ".dark &": {
                                backgroundColor: "#444444", // dropdown fon
                                color: "white",
                            },
                        }}
                    />
                )}
                renderInput={(params) => (
                    <TextField
                        error={errorMassage}
                        helperText={errorMassage ? errorMassage[0] : ""}
                        {...params}
                        label={label}
                        placeholder={placeholder}
                        variant={variant}
                        sx={{
                            "& .MuiInputBase-root": {
                                backgroundColor: "white",
                                color: "black",
                            },
                            "& label": {
                                color: "#1D2D5B",
                            },
                            "& label.Mui-focused": {
                                color: "#1D2D5B",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#1D2D5B",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#162447",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#1D2D5B",
                                },
                            },

                            // 🔥 Dark mode uchun
                            ".dark &": {
                                "& .MuiInputBase-root": {
                                    backgroundColor: "#444444", // input fon
                                    color: "white",
                                },
                                "& label": {
                                    color: "#9CA3AF",
                                },
                                "& label.Mui-focused": {
                                    color: "white",
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#666666",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#888888",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "white",
                                    },
                                },
                            },
                        }}
                    />
                )}
            />
        </Stack>


    );
}
