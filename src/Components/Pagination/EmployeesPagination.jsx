import React, {useState} from "react";

import {
    TableCell,
    TableRow,
} from "@mui/material";
import { ProfileInfoCard} from "../index.js";
import {useDispatch, useSelector} from "react-redux";
import {
    EditToggle,
    openModal,
    openModalComments,
    openModalHistory
} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {useNavigate} from "react-router-dom";
import {AddEmployeeId} from "../../features/Employees/employeeSlice.js";
import {deleteEmployee, getEmployees} from "../../features/Employees/employeeThunks.js";
import {useTranslation} from "react-i18next";
import useNotify from "../../hooks/UseNotify/useNotify.jsx";

const EmployeesPagination = ({row , index , data , setEmployeesId , arry , navigateURL , dataIndex , search}) => {


    const dispatch = useDispatch();
    const isOpenMOdal = useSelector((state) => state.employesModal.isOpen);
    const {employees} = useSelector((state) => state.employees);
    const [isOpen, setIsOpen] = useState(-1);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {showMessage} = useNotify()


    const deleteEmployees = async (id) => {
        try {
            const res = await dispatch(deleteEmployee(id)).unwrap()
            showMessage(t('EmployeesSnackbar.success.delete'));
            try {
                const result = await dispatch(getEmployees({page: 1, search: search})).unwrap()
                console.log(result.data)
            } catch (err) {
                console.log(err)
            }
        }
        catch (error) {
            console.log(error);
            showMessage(t('EmployeesSnackbar.error.delete') , 'error');
        }
    }


    return (
        <>
            <TableRow
                onClick={() => {
                    isOpen !== row.id-1  ? setIsOpen(row.id-1) : setIsOpen(-1)
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
                <TableCell  sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{employees.per_page * (employees.current_page-1) + index+1}</TableCell>
                {arry[0].active && <TableCell  sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{row.user.name}</TableCell>}
                {arry[1].active && <TableCell  sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{row.phone_number}</TableCell>}
                {/*{arry[].active && <TableCell>{row.phone_number}</TableCell>}*/}
                {arry[2].active && <TableCell  sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{row.tin}</TableCell>}
                {arry[3].active && (
                    <TableCell  sx={{
                        color: "black",
                        ".dark &": {
                            color: "white",
                        },
                    }}>{new Date(row.created_at).toISOString().split("T")[0]}</TableCell>
                )}

                {arry[4].active && <TableCell  sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>
                    {
                        row.status === "1" ?
                            <div
                                className="w-max py-1 px-3     border border-[#22c55e] text-[#22c55e] rounded-lg">
                                Active
                            </div> : <div
                                className="w-max py-1 px-3 border border-[#eab308] text-[#eab308]   rounded-lg">
                                Inactive
                            </div>
                    }


                </TableCell>}
                {arry[5].active && <TableCell  sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>
                    <div className="flex items-center gap-1 ">
                        <div onClick={(e) => {
                            e.stopPropagation();
                            dispatch(openModal())
                            dispatch(AddEmployeeId(row))
                            dispatch(EditToggle())
                        }}
                             className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">
                            <i
                                className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>
                        </div>
                        <div onClick={(e)=> {
                            e.stopPropagation();
                            navigate(`/users/${navigateURL}/detail/${row.id}`)
                            dispatch(AddEmployeeId(row))
                        }}
                             className="bg-[#5E83D4] w-[30px] h-[30px] rounded center text-[14px] group">
                            <i className="fa-solid fa-eye   text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                        </div>
                        <div onClick={(e)=> {
                            e.stopPropagation();
                            dispatch(openModalHistory())
                            dispatch(AddEmployeeId(row))

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
                            deleteEmployees(row?.id)
                        }}
                             className="bg-red-500 w-[30px] h-[30px] rounded center text-[14px] group  ">
                            <i className="fa-solid fa-trash  text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                        </div>
                    </div>
                </TableCell>}

            </TableRow>
            <TableRow >
                <TableCell sx={{padding:0 , overflow:"hidden" , background:"#F9FBFD"}} colSpan={8}>
                    <div
                        // onMouseLeave={()=> setIsOpen(-1)}
                        className={isOpen === row.id-1 ? "    max-h-96 center transition-all duration-300 ease-in-out" : " max-h-0  center  transition-all duration-300 ease-in-out"}>
                        <ProfileInfoCard data={row} />
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
};

export default EmployeesPagination;
