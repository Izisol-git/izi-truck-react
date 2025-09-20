import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {TableCell, TableRow} from "@mui/material";
import {
    AddCustomersId,
    ClientsUpdetId,
    EditToggle, openModal,
    openModalComments,
    openModalHistory
} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {ProfileInfoCardDrivers, ProfileInfoClients} from "../index.js";
import {AddClientId} from "../../features/customers/clientsSlice.js";
import {deleteClients, getClients} from "../../features/customers/clientsThunks.js";

function CustomersPagination({row, index, data, setEmployeesId, arry, navigateURL, employeesId , search }) {
    const {clients} = useSelector((state) => state.customers);

    const dispatch = useDispatch();
    const isOpenMOdal = useSelector((state) => state.employesModal.isOpen);

    const [isOpen, setIsOpen] = useState(-1);
    const navigate = useNavigate();
    const [clientId, setClientId] = useState(null);
    const findId = (id) => {
        const newData = data.find((employee) => employee.id === id);
        setEmployeesId(newData)
        console.log(newData)
    }

    const deleteClient = async (id) => {
        try {
            const result = await dispatch(deleteClients(id));

            try {
                try {
                    const result = await dispatch(getClients({page: 1, search})).unwrap()
                } catch (error) {
                    console.log(error);
                }
            }catch (e) {
                console.error(e);
            }
        }catch (error) {
            console.log(error);
        }
    }

    console.log(row)

    return (
        <>
            <TableRow
                onClick={() => {
                    isOpen !== row.id - 1 ? setIsOpen(row.id - 1) : setIsOpen(-1)
                }}

                sx={{
                    // border: "1px solid #E5E7EB", // butun rowga border
                    // barcha cell border rangini o'zgartiradi
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
                }}>{clients.per_page * (clients.current_page-1) + index+1}</TableCell>
                {arry[0].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{row.company_name}</TableCell>}
                {arry[1].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{row.fio}</TableCell>}
                {/*{arry[].active && <TableCell>{row.phone_number}</TableCell>}*/}
                {arry[2].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{new Date(row.created_at).ddmmyyyy()}</TableCell>}
                {arry[3].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{row.phone_number}</TableCell>}
                {/*{arry[4].active && <TableCell sx={{*/}
                {/*    color: "black",*/}
                {/*    ".dark &": {*/}
                {/*        color: "white",*/}
                {/*    },*/}
                {/*}}>{'<--->' }</TableCell>}*/}
                {/*{arry[3].active && (*/}
                {/*    <TableCell>{new Date(row.created_at).toISOString().split("T")[0]}</TableCell>*/}
                {/*)}*/}

                {/*{arry[5].active && <TableCell sx={{*/}
                {/*    color: "black",*/}
                {/*    ".dark &": {*/}
                {/*        color: "white",*/}
                {/*    },*/}
                {/*}}>{'<--->'}</TableCell>}*/}
                {arry[4].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>
                    <div className="flex items-center gap-1 ">
                        <div onClick={(e) => {
                            e.stopPropagation();
                            // setEmployeesId(row.id)
                            // console.log(row.id);
                            // findId(row.id)
                            dispatch(AddClientId(row))
                            dispatch(openModal())
                            dispatch(EditToggle())
                            dispatch(ClientsUpdetId(row.id))
                        }}
                             className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">
                            <i
                                className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>
                        </div>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/users/${navigateURL}/detail/${row.id}`)
                            dispatch(AddClientId(row))
                        }}
                             className="bg-[#5E83D4] w-[30px] h-[30px] rounded center text-[14px] group">
                            <i className="fa-solid fa-eye   text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                        </div>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            dispatch(openModalHistory())
                            dispatch(AddClientId(row))
                        }}
                             className="bg-[#38CB6E] w-[30px] h-[30px] rounded center text-[14px] group">
                            <i className="fa-regular fa-clock   text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                        </div>

                        {/*<div onClick={(e) => {*/}
                        {/*    e.stopPropagation();*/}
                        {/*    dispatch(openModalComments())*/}
                        {/*}}*/}
                        {/*     className="bg-purple-500 w-[30px] h-[30px] rounded center text-[14px] group  ">*/}
                        {/*    <i className="fa-solid fa-comment-dots text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>*/}
                        {/*</div>*/}


                        <div onClick={(e) => {
                            e.stopPropagation();
                            deleteClient(row?.id)
                        }}
                             className="bg-red-500 w-[30px] h-[30px] rounded center text-[14px] group  ">
                            <i className="fa-solid fa-trash  text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                        </div>
                    </div>
                </TableCell>}

            </TableRow>
            <TableRow>
                <TableCell sx={{padding: 0, overflow: "hidden", background: "#F9FBFD", border: '0px solid red'}}
                           colSpan={8}>
                    <div
                        // onMouseLeave={()=> setIsOpen(-1)}
                        className={isOpen === row.id - 1 ? "    max-h-96 center transition-all duration-300 ease-in-out" : " max-h-0  center  transition-all duration-300 ease-in-out"}>
                        {/*<ProfileInfoCardDrivers data={row}/>*/}
                        <ProfileInfoClients data={row}/>
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
}

export default CustomersPagination;