import React, {useState} from 'react';
import {TableCell, TableRow} from "@mui/material";
import {
     DriversId,
    EditToggle,
    openModalComments,
    openModalHistory
} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import { ProfileInfoCardDrivers} from "../index.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function DriversPagination({row , index , data , setEmployeesId , arry , navigateURL}) {


    const dispatch = useDispatch();
    const isOpenMOdal = useSelector((state) => state.employesModal.isOpen);

    const [isOpen, setIsOpen] = useState(-1);
    const navigate = useNavigate();
    const findId = (id) => {
        const newData = data.find((employee) => employee.id === id);
        setEmployeesId(newData)
        console.log(newData)
    }


    return (
        <>
            <TableRow
                onClick={() => {
                    isOpen !== row.id - 1 ? setIsOpen(row.id - 1) : setIsOpen(-1)
                }}
                sx={{
                    transition: "all 300ms ease-in-out",
                    "&:hover": {
                        backgroundColor: "#F2F6F9",
                    },
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                    '.dark &':{
                        "& td, & th": {  borderColor: "#374151" },
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
                }}>{row.id}</TableCell>
                {arry[0].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{row.brand}</TableCell>}
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
                }}>{row.phone_number}</TableCell>}
                {arry[3].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{row.number}</TableCell>}
                {arry[4].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{row.trailer_number }</TableCell>}
                {/*{arry[3].active && (*/}
                {/*    <TableCell>{new Date(row.created_at).toISOString().split("T")[0]}</TableCell>*/}
                {/*)}*/}

                {arry[5].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{'<--->'}</TableCell>}
                {arry[6].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>
                    <div className="flex items-center gap-1 ">
                        <div onClick={(e) => {
                            e.stopPropagation();
                            findId(row.id)
                            dispatch(DriversId(row.id))
                            localStorage.setItem('driversId' , row?.id)
                            dispatch(EditToggle())
                            navigate("/users/drivers/edit");
                        }}
                             className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">
                            <i
                                className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>
                        </div>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            dispatch(DriversId(row.id))
                            localStorage.setItem('driversId' , row?.id)
                            navigate(`/users/${navigateURL}/detail/${row.id}`)
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
                        {
                            navigateURL === 'customers' ? <div onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(openModalComments())
                                }}
                                                               className="bg-purple-500 w-[30px] h-[30px] rounded center text-[14px] group  ">
                                    <i className="fa-solid fa-comment-dots text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                                </div>
                                : ""

                        }
                        <div onClick={(e) => {
                            e.stopPropagation();
                        }}
                             className="bg-red-500 w-[30px] h-[30px] rounded center text-[14px] group  ">
                            <i className="fa-solid fa-trash  text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                        </div>
                    </div>
                </TableCell>}

            </TableRow>
            <TableRow>
                <TableCell sx={{padding: 0, overflow: "hidden", background: "#F9FBFD"}} colSpan={8}>
                    <div
                        // onMouseLeave={()=> setIsOpen(-1)}
                        className={isOpen === row.id - 1 ? "    max-h-96 center transition-all duration-300 ease-in-out" : " max-h-0  center  transition-all duration-300 ease-in-out"}>
                        <ProfileInfoCardDrivers data={row}/>
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
}

export default DriversPagination;