import React, { useState } from "react";
import { Button, Popover } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

export default function DateRange({setSearch, search}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [range, setRange] = useState([null, null]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div  >
            <Button
                sx={{
                    background: "#1D2D5B",
                    color: "#fff",
                }}
                variant="outlined"
                onClick={handleClick}
            >
                {search?.from && search?.to
                    ? `${dayjs(search.from).format("YYYY-MM-DD")} - ${dayjs(search.to).format("YYYY-MM-DD")}`
                    : "Select Date Range"}
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Calendar
                    selectRange
                    value={[search.from ? search.from.toDate?.() ?? search.from : null, search.to ? search.to.toDate?.() ?? search.to : null]}
                    onChange={(newRange) => {
                        setSearch({
                            from: newRange?.[0] ? dayjs(newRange[0]) : null,
                            to: newRange?.[1] ? dayjs(newRange[1]) : null,
                        });
                        handleClose();
                    }}
                />
            </Popover>
        </div>
    );
}
