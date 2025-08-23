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
import {
    AddEmployesModal,
    CustomersPagination,
    DriversPagination,
    EmployeesPagination, InvoicesPagination,
    PaginationFooter,
    ProfileInfoCard
} from "../index.js";
import {useDispatch, useSelector} from "react-redux";
import {
    EditToggle,
    openModal,
    openModalComments,
    openModalHistory
} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {useNavigate} from "react-router-dom";

const UserPagination = ({arry , navigateURL , data , total , setEmployeesId, employeesId}) => {







    return (
        <>
            <Paper sx={{width: "100%", p: 2}}>
                <div className=" flex items-center justify-between">
                    <TextField
                        label="Qidirish (Ism bo‘yicha)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        // value={filterText}
                        // onChange={handleFilterChange}
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


                    <div className="flex items-center ">
                        <img className={'w-8 h-8 cursor-pointer'} src="../../../public/xls.png" alt="excel"/>
                    </div>

                </div>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{
                                backgroundColor: "#F9FBFD",

                            }}>
                                <TableCell>
                                    <TableSortLabel
                                        // active={orderBy === "id"}
                                        // direction={orderBy === "id" ? orderDirection : "asc"}
                                        // onClick={() => handleSortRequest("id")}
                                    >
                                        ID
                                    </TableSortLabel>
                                </TableCell>


                                {
                                    arry.map((row, index) => (
                                        row.active && (
                                            <TableCell key={index}>

                                                <TableSortLabel

                                                    // active={index === 0 ? orderBy === "id" : orderBy === row.title}
                                                    // direction={orderBy === row.title ? orderDirection : "asc"}
                                                    // onClick={() => handleSortRequest(row.title)}
                                                >
                                                    {row.title}
                                                </TableSortLabel>
                                            </TableCell>
                                        )
                                    ))
                                }


                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data && data.map((row, index) => (
                                navigateURL === "employees" ? (
                                    <EmployeesPagination
                                        key={index}
                                        navigateURL={navigateURL}
                                        arry={arry}
                                        row={row}
                                        index={index}
                                        data={data}
                                        setEmployeesId={setEmployeesId}
                                        employeesId={employeesId}

                                    />
                                ) : navigateURL === "drivers" ? (
                                    <DriversPagination
                                        key={index}
                                        navigateURL={navigateURL}
                                        arry={arry}
                                        row={row}
                                        index={index}
                                        data={data}
                                        setEmployeesId={setEmployeesId}
                                        employeesId={employeesId}

                                    />
                                ) : navigateURL === "customers" ? (
                                    <CustomersPagination
                                        key={index}
                                        navigateURL={navigateURL}
                                        arry={arry}
                                        row={row}
                                        index={index}
                                        data={data}
                                        setEmployeesId={setEmployeesId}
                                        employeesId={employeesId}

                                    />
                                ) : (
                                    <InvoicesPagination
                                        key={index}
                                        navigateURL={navigateURL}
                                        arry={arry}
                                        row={row}
                                        index={index}
                                        data={data}
                                        setEmployeesId={setEmployeesId}
                                        employeesId={employeesId}

                                    />
                                )
                            ))}

                            {data && data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        Maʼlumot topilmadi
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className={'py-4 flex items-center justify-end px-4'}>
                    <PaginationFooter total={total} />
                </div>


            </Paper>


            <AddEmployesModal/>

        </>
    );
};

export default UserPagination;
