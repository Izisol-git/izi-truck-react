import * as React from "react";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

const SwitchMUI = () => {
    return (
        <div>
            <Switch
                {...label}
                defaultChecked
                sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#1D2D5B",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#1D2D5B",
                    },
                }}
            />
        </div>
    );
};

export default SwitchMUI;
