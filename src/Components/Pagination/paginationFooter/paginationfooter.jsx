import { useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationFooter =({total , onClick  , search})=> {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const handleChange = (event, value) => {
        setSearchParams({ page: value });
        onClick(value , search);
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
                    ".dark & .MuiPaginationItem-root":{
                        background: "#303030",
                        color: "white",
                        border: "none",
                    },
                    ".dark & .Mui-selected":{
                        background: "#2B4764",
                    }
                }}
            />
        </Stack>
    );
}

export default PaginationFooter;
