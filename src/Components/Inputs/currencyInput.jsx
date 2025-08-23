import React, { useState } from "react";
import {
    TextField,
    MenuItem,
    InputAdornment,
    Select,
    Box
} from "@mui/material";

export default function CurrencyInput({ label, onChange, value, carrierCurrency, setCarrierCurrency }) {
    const currencies = [
        { code: "1", label: "USD" },
        { code: "2", label: "UZS" },
        { code: "3", label: "RUB" },
        { code: "4", label: "EUR" },
    ];

    return (
        <Box sx={{ maxWidth: "100%" }}>
            <TextField
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
                                value={carrierCurrency || ""}
                                onChange={(e) => setCarrierCurrency(e.target.value)} // faqat code string saqlanadi
                                variant="standard"
                                disableUnderline
                                sx={{ minWidth: 60 }}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.code} value={option.code}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>

                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}
