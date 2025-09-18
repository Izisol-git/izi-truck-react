import React, {useEffect, useState} from "react";


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
    AddEmployesModal, ChatsPagination, ContractsPagination,
    CustomersPagination,
    DriversPagination,
    EmployeesPagination, InvoicesPagination, Loading, NotificationsPagination,
    PaginationFooter,
    ProfileInfoCard
} from "../index.js";
import {useDispatch, useSelector} from "react-redux";
import {searchContracts} from "../../features/Contracts/contractThunks.js";
import {openExcelModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {current} from "@reduxjs/toolkit";
import {useTranslation} from "react-i18next";

const UserPagination = ({arry, navigateURL, data, total, setEmployeesId, employeesId, setSearch, dataIndex}) => {


    const dispatch = useDispatch();
    // const [searchData, setSearchData] = useState();
    // console.log(searchData);
    const loadingContracts = useSelector((state) => state.contracts.loading)
    const loadingCustomers = useSelector((state) => state.customers.loading)
    const loadingDrivers = useSelector((state) => state.drivers.loading)
    const loadingEmployees = useSelector((state) => state.drivers.loading)
    const {i18n, t} = useTranslation();
    const currentLang = i18n.language;


    // useEffect(() => {
    //     if (navigateURL === 'clients') {
    //         loading = loadingContracts
    //     }
    // })
    // const search = async () => {
    //     try {
    //         const res = await dispatch(searchContracts(searchData));
    //         console.log(res.payload.data);
    //         setData(res.payload.data)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    //
    // useEffect(()=> {
    //     search()
    // } , [searchData])
    // console.log(data)

    return (
        <>
            <Paper sx={{
                width: "100%", p: 2,
                '.dark &': {
                    backgroundColor: '#303030',
                }
            }}>
                <div className=" flex items-center justify-between">
                    <TextField
                        label={t('clients.search')}
                        variant="outlined"
                        onChange={(event) => setSearch(event.target.value)}
                        fullWidth
                        size={"small"}
                        margin="normal"
                        sx={{
                            width: "40%", marginBottom: '10px',
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#fff",
                                "& fieldset": {
                                    borderColor: "#1D2D5B",
                                    height: "110%",

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
                            },
                            "& .MuiInputLabel-root": {
                                color: "#1D2D5B",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#1D2D5B",
                            },
                        }}
                        className="
                                dark:[&_.MuiOutlinedInput-root]:bg-[#444444]
                                dark:[&_.MuiOutlinedInput-root_fieldset]:border-white
                                dark:[&_.MuiOutlinedInput-root:hover_fieldset]:border-white
                                dark:[&_.MuiOutlinedInput-root.Mui-focused_fieldset]:border-white
                                dark:[&_.MuiOutlinedInput-root_input]:text-white
                                dark:[&_.MuiInputLabel-root]:text-white
                                dark:[&_.MuiInputLabel-root.Mui-focused]:text-white
                              "
                    />

                    {
                        navigateURL !== "invoices"
                            ?
                            <div className="flex items-center ">
                                <img onClick={() => {
                                    dispatch(openExcelModal())
                                }} className={'w-8 h-8 cursor-pointer'} src="/public/xls.png" alt="excel"/>
                            </div>
                            :
                            ''
                    }


                </div>


                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{
                                backgroundColor: "#F9FBFD",
                                '.dark &': {
                                    backgroundColor: '#374151',
                                },
                                borderColor: '#374151',

                            }}>
                                <TableCell sx={{
                                    color: "black",
                                    ".dark &": {
                                        color: "white",
                                    },
                                }}>
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
                                            <TableCell key={index} sx={{
                                                color: "black",
                                                ".dark &": {
                                                    color: "white",
                                                },
                                            }}>

                                                <TableSortLabel
                                                    // active={index === 0 ? orderBy === "id" : orderBy === row.title}
                                                    // direction={orderBy === row.title ? orderDirection : "asc"}
                                                    // onClick={() => handleSortRequest(row.title)}
                                                >
                                                    {row?.key ? t(`${row.key}`) : row.title}
                                                </TableSortLabel>
                                            </TableCell>
                                        )
                                    ))
                                }


                            </TableRow>
                        </TableHead>

                        {
                            (navigateURL === 'clients' ? loadingContracts : navigateURL === 'customers' ? loadingCustomers : navigateURL === 'drivers' ? loadingDrivers : navigateURL === 'employees' ? loadingEmployees : '') ?
                                <TableRow>
                                    <TableCell colSpan={9}>
                                        <Loading/>
                                    </TableCell>
                                </TableRow> : <TableBody>
                                    {data?.data && data?.data.map((row, index) => (
                                        navigateURL === "employees" ? (
                                            <EmployeesPagination
                                                dataIndex={dataIndex}
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
                                                dataIndex={dataIndex}
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
                                        ) : navigateURL === "clients" ? (
                                            <ContractsPagination
                                                key={index}
                                                navigateURL={navigateURL}
                                                arry={arry}
                                                row={row}
                                                index={index}
                                                data={data}
                                                setEmployeesId={setEmployeesId}
                                                employeesId={employeesId}
                                            />
                                        ) : navigateURL === 'notifications' ? (
                                            <NotificationsPagination
                                                key={index}
                                                navigateURL={navigateURL}
                                                arry={arry}
                                                row={row}
                                                index={index}

                                            />
                                        ) : navigateURL === 'chats' ? (
                                            <ChatsPagination
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
                                            />
                                        )
                                    ))}

                                    {data && data.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={arry.length + 1} align="center">
                                                Maʼlumot topilmadi
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                        }

                    </Table>
                </TableContainer>

                <div className={'py-4 flex items-center justify-end px-4'}>
                    <PaginationFooter total={data}/>
                </div>


            </Paper>


            {/*<AddEmployesModal />*/}

        </>
    );
};

export default UserPagination;
