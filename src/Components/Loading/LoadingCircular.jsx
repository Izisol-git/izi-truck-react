import React from 'react';
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";

function LoadingCircular() {
    return (
        <Box sx={{ display: "flex", width: "100%" }}>
            <CircularProgress
                sx={{ marginX: "auto" }}
                size={25}
                color={"inherit"}
            />
        </Box>
    );
}

export default LoadingCircular;