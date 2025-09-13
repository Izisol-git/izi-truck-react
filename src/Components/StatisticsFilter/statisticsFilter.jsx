import React, {useState} from "react";
import {TextField, Button, Box} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const StatisticsFilter = ({onFilter , setSearch}) => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    return (
        <></>
    );
};

export default StatisticsFilter;
