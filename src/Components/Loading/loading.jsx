import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

function Loading() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height='40vh'
        >
            <CircularProgress />
            <Typography
                variant="h6"
                sx={{ mt: 2, color: "text.primary" }}
            >
                Yuklanmoqda...
            </Typography>
        </Box>
    );
}

export default Loading;
