import React, {useState} from "react";


import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    TablePagination,
    TextField,
} from "@mui/material";
import {EmployeeModal} from "../index.js";

// Demo ma'lumotlar
const createData = (id, name, status1, phone, personalPhone, startdata, enddata) => {
    return {id, name, status1, phone, personalPhone, startdata, enddata};
};

const names = [
    "Ali", "Vali", "Sami", "John", "Akmal", "Bobur", "Doniyor",
    "Xasan", "Anvar", "Sarvar", "Jamshid", "Elyor"
];

const initialRows = Array.from({length: 100}, (_, i) => {
    const name = names[i % names.length]; // takrorlanadigan ism


    const status1 = (i % 2 === 0 ? true : false);
    const phone = (i + 1000000) * 2;
    const personalPhone = (i + 2000000) * 2;
    const startdata = "13.03.2013";
    const enddata = "28.08.2018";
    return createData(i + 1, name, status1, phone, personalPhone, startdata, enddata);
});
const MUITable = () => {
    const [rows, setRows] = useState(initialRows);
    const [orderDirection, setOrderDirection] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterText, setFilterText] = useState("");
    const [tableIndex, setTableIndex] = useState(-1);


    const handleSortRequest = (property) => {
        const isAsc = orderBy === property && orderDirection === "asc";
        setOrderDirection(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
        setPage(0);
    };

    // Filtering
    const filteredRows = rows.filter((row) =>
        row.name.toLowerCase().includes(filterText.toLowerCase())
    );

    // Sorting
    const sortedRows = filteredRows.sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];

        if (aValue < bValue) return orderDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return orderDirection === "asc" ? 1 : -1;
        return 0;
    });

    // Pagination
    const paginatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Paper sx={{width: "100%", p: 2}}>
            <div className=" flex items-center justify-between">
                <TextField
                    label="Qidirish (Ism bo‘yicha)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={filterText}
                    onChange={handleFilterChange}
                    sx={{
                        width: "40%",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "#1D2D5B",

                                height: "55px",


                            },
                            "&:hover fieldset": {
                                borderColor: "#1D2D5B",

                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#1D2D5B",
                            },
                            "& input": {
                                color: "#1D2D5B",
                            },
                            // Label rangi (normal va focus holatida)
                        },
                        "& .MuiInputLabel-root": {
                            color: "#1D2D5B",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#1D2D5B",
                        },
                    }}

                />
                <TablePagination
                    component="div"
                    count={filteredRows.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Har sahifada:"
                    sx={{
                        width: "max-content",
                    }}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    SelectProps={{
                        sx: {
                            width: "60px", // kenglik
                            fontSize: "14px", // matn o'lchami
                            color: "#1e40af", // matn rangi
                            backgroundColor: "#f0f9ff", // fon rangi
                            borderRadius: "8px", // burchaklar
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "blue", // border rangi
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {},
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "green",
                            },
                            "& .MuiSelect-select": {
                                padding: "10px",
                            },
                        },
                    }}
                />

            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{
                            backgroundColor: "#F9FBFD",

                        }}>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "id"}
                                    direction={orderBy === "id" ? orderDirection : "asc"}
                                    onClick={() => handleSortRequest("id")}
                                >
                                    ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "name"}
                                    direction={orderBy === "name" ? orderDirection : "asc"}
                                    onClick={() => handleSortRequest("name")}
                                >
                                    Ism
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "age"}
                                    direction={orderBy === "age" ? orderDirection : "asc"}
                                    onClick={() => handleSortRequest("status")}
                                >
                                    Status
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "age"}
                                    direction={orderBy === "age" ? orderDirection : "asc"}
                                    onClick={() => handleSortRequest("phone")}
                                >
                                    phone
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "age"}
                                    direction={orderBy === "age" ? orderDirection : "asc"}
                                    onClick={() => handleSortRequest("personalPhone")}
                                >
                                    personalPhone
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "age"}
                                    direction={orderBy === "age" ? orderDirection : "asc"}
                                    onClick={() => handleSortRequest("startdata")}
                                >
                                    startdata
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "age"}
                                    direction={orderBy === "age" ? orderDirection : "asc"}
                                    onClick={() => handleSortRequest("enddata")}
                                >
                                    enddata
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "age"}
                                    direction={orderBy === "age" ? orderDirection : "asc"}
                                    onClick={() => handleSortRequest("age")}
                                >
                                    Yosh
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                        <TableBody>
                        {paginatedRows.map((row, index) => (
                            < >
                                <TableRow
                                    onClick={() => row.id !== tableIndex ? setTableIndex(row.id) : setTableIndex(-1)}
                                    sx={{
                                        transition: "all 300ms ease-in-out",
                                        "&:hover": {
                                            backgroundColor: "#F2F6F9",
                                        },
                                        cursor: "pointer",
                                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
                                    }}
                                    key={row.id}>
                                    <TableCell>{row.id}  </TableCell>

                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>
                                        {
                                            row.status1 ?
                                                <div
                                                    className="w-max py-1 px-3     border border-[#22c55e] text-[#22c55e] rounded-lg">
                                                    Active
                                                </div> : <div
                                                    className="w-max py-1 px-3 border border-[#eab308] text-[#eab308]   rounded-lg">
                                                    Inactive
                                                </div>
                                        }


                                    </TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.personalPhone}</TableCell>
                                    <TableCell>{row.startdata}</TableCell>
                                    <TableCell>{row.enddata}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 ">
                                            <div
                                                className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">
                                                <i
                                                    className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>
                                            </div>
                                            <div
                                                className="bg-[#5E83D4] w-[30px] h-[30px] rounded center text-[14px] group">
                                                <i className="fa-solid fa-eye   text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                                            </div>
                                            <div
                                                className="bg-[#38CB6E] w-[30px] h-[30px] rounded center text-[14px] group">
                                                <i className="fa-regular fa-clock   text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                                            </div>
                                            <div
                                                className="bg-red-500 w-[30px] h-[30px] rounded center text-[14px] group  ">
                                                <i className="fa-solid fa-trash  text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                                            </div>


                                        </div>
                                    </TableCell>
                                </TableRow>
                                <div
                                    className={`w-[1250%] ${tableIndex === row.id ? ' max-h-56' : 'max-h-0'}          bg-gray-50  overflow-hidden   transition-all duration-500 ease-in-out      `}>

                                    <EmployeeModal/>

                                </div>
                            </ >
                        ))}
                        {paginatedRows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                Maʼlumot topilmadi
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>


        </Paper>
    );
};

export default MUITable;
