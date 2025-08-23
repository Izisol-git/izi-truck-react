import { useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {useEffect} from "react";
import {getEmployees} from "../../../features/Employees/employeeThunks.js";
import {useDispatch} from "react-redux";

const PaginationFooter =({total})=> {
    const [searchParams, setSearchParams] = useSearchParams();


    // URL ichidan page ni o‘qish, default = 1
    const page = parseInt(searchParams.get("page") || "1", 10);

    const handleChange = (event, value) => {
        setSearchParams({ page: value }); // URL yangilanadi (?page=2)
        localStorage.setItem('EmployeesPge' , value);
    };



    return (
        <Stack spacing={2}>
            <Pagination
                count={total?.last_page}
                page={page}
                onChange={handleChange}
                variant="outlined"
                shape="rounded"
                sx={{
                    "& .MuiPaginationItem-root": {
                        color: "#1D2D5B",
                        borderColor: "#1D2D5B",
                    },
                    "& .Mui-selected": {
                        background: "#1D2D5B",
                        color: "#fff",
                    },
                    "& .MuiPaginationItem-root:hover": {
                        backgroundColor: "rgba(29,45,91,0.1)",
                    },
                }}
            />
        </Stack>
    );
}

export default PaginationFooter;
