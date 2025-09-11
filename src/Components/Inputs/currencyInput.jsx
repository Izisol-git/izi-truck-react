import React, { useState } from "react";
import {
    TextField,
    MenuItem,
    InputAdornment,
    Select,
    Box
} from "@mui/material";

export default function CurrencyInput({ label, onChange, value, currency, setCurrency , disabled ,errorMassage }) {
    const currencies = [
        { code: "1", label: "USD" },
        { code: "2", label: "UZS" },
        { code: "3", label: "RUB" },
        { code: "4", label: "EUR" },
    ];

    return (
        <Box sx={{ maxWidth: "100%" }}>
            <TextField
                error={errorMassage}
                helperText={errorMassage ? errorMassage[0] : ''}
                disabled={disabled}
                size="small"
                label={label}
                type="number"
                fullWidth
                value={value || ""}
                onChange={onChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Select
                                disabled={disabled}
                                value={currency || ""}
                                onChange={(e) => setCurrency(e.target.value)}
                                variant="standard"
                                disableUnderline
                                sx={{
                                    minWidth: 60,
                                    color: "black",


                                    // Dark mode uchun
                                    ".dark &": {
                                        color: "white",
                                        backgroundColor: "#444444",
                                    },
                                }}
                            >
                                {currencies.map((option) => (
                                    <MenuItem
                                        key={option.code}
                                        value={option.code}
                                        sx={{
                                            color: "black",
                                            // padding:'0',

                                            // Dark mode
                                            ".dark &": {
                                                backgroundColor: "#444444",
                                                color: "white",
                                                "&:hover": {
                                                    backgroundColor: "#555555",
                                                },
                                            },
                                        }}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </InputAdornment>
                    ),
                }}
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

                    // Dark mode
                    ".dark &": {
                        "& .MuiInputBase-root": {
                            backgroundColor: "#444444",
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
        </Box>

    );
}
