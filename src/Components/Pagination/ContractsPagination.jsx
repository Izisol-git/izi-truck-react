import React from 'react';
import {TableCell, TableRow} from "@mui/material";
import {Loading, ProfileInfoCardDrivers, ProfileInfoClients} from "../index.js";
import {

    EditToggle,
    openModalComments,
    openModalHistory
} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function ContractsPagination({row, key, data, arry, index, setEmployeesId, employeesId, navigateURL}) {

    console.log(row);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <>
            {
                    <TableRow

                        sx={{
                            transition: "all 300ms ease-in-out",
                            "&:hover": {
                                backgroundColor: "#F2F6F9",
                            },
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                            '.dark &': {
                                "& td, & th": {borderColor: "#374151"},
                                "&:hover": {
                                    backgroundColor: "#374151",
                                },
                            }
                        }}
                        key={index}
                    >
                        <TableCell sx={{
                            color: "black",
                            ".dark &": {
                                color: "white",
                            },
                        }}>{row?.id}</TableCell>
                        {arry[0].active && <TableCell sx={{
                            color: "black",
                            ".dark &": {
                                color: "white",
                            },
                        }}>{row?.contract_no}</TableCell>}
                        {arry[1].active && <TableCell sx={{
                            color: "black",
                            ".dark &": {
                                color: "white",
                            },
                        }}>{row.customer}</TableCell>}
                        {/*{arry[].active && <TableCell>{row.phone_number}</TableCell>}*/}
                        {arry[2].active && <TableCell sx={{
                            color: "black",
                            ".dark &": {
                                color: "white",
                            },
                        }}>{row.customer_tin}</TableCell>}
                        {arry[3].active && <TableCell sx={{
                            color: "black",
                            ".dark &": {
                                color: "white",
                            },
                        }}>{row.cust_bank_code}</TableCell>}
                        {arry[4].active && <TableCell sx={{
                            color: "black",
                            ".dark &": {
                                color: "white",
                            },
                        }}>{row.customer_bank_acc}</TableCell>}
                        {/*{arry[3].active && (*/}
                        {/*    <TableCell>{new Date(row.created_at).toISOString().split("T")[0]}</TableCell>*/}
                        {/*)}*/}

                        {arry[5].active && <TableCell sx={{
                            color: "black",
                            ".dark &": {
                                color: "white",
                            },
                        }}>{row.contract_amount || '-'}</TableCell>}
                        {arry[6].active && <TableCell sx={{
                            color: "black",
                            ".dark &": {
                                color: "white",
                            },
                        }}>
                            {new Date(row.created_at).ddmmyyyy() || '0000-00-00'}
                        </TableCell>}
                        {arry[7].active && <TableCell sx={{
                            color: "black",
                            ".dark &": {
                                color: "white",
                            },
                        }}>
                            <div className="flex items-center gap-1 ">
                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    // findId(row.id)
                                    // dispatch(DriversId(row.id))
                                    // dispatch(EditToggle())
                                    navigate(`/contracts/clients/edit/${row.id}`)
                                }}
                                     className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">
                                    <i
                                        className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>
                                </div>
                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    // dispatch(DriversId(row.id))
                                    // navigate(`/contracts/clients/edit/${row.id}`)
                                }}
                                     className="bg-[#5E83D4] w-[30px] h-[30px] rounded center text-[14px] group">
                                    <i className="fa-solid fa-eye   text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                                </div>
                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(openModalHistory())

                                }}
                                     className="bg-[#38CB6E] w-[30px] h-[30px] rounded center text-[14px] group">
                                    <i className="fa-regular fa-clock   text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                                </div>

                                <div onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                     className="bg-red-500 w-[30px] h-[30px] rounded center text-[14px] group  ">
                                    <i className="fa-solid fa-trash  text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                                </div>
                            </div>

                        </TableCell>}

                    </TableRow>


                    }

                </>
                );
            }

            export default ContractsPagination;