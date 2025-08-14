import React, { useState } from "react";
import {
    TextField,
    MenuItem,
    InputAdornment,
    Select,
    Box
} from "@mui/material";

export default function CurrencyInput({label}) {
    const [currency, setCurrency] = useState("USD");
    const [amount, setAmount] = useState("");

    const currencies = [
        { code: "USD", label: "USD" },
        { code: "UZS", label: "UZS" },
        { code: "EUR", label: "EUR" },
    ];

    return (
        <Box sx={{ maxWidth: "100%" }}>
            <TextField
                size="small"
                label={label}
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
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
