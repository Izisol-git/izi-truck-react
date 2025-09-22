import React, {useState} from 'react';
import {TableCell, TableRow} from "@mui/material";
import {
    EditToggle,
    openModalComments,
    openModalHistory
} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {ProfileInfoCardDrivers} from "../index.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AddDriversId} from "../../features/Drivers/driversSlice.js";
import {deleteDrivers, getDrivers} from "../../features/Drivers/driversThunks.js";
import useNotify from "../../hooks/UseNotify/useNotify.jsx";
import {useTranslation} from "react-i18next";

function DriversPagination({row , index , arry , navigateURL  , search}) {

    const dispatch = useDispatch();
    const {drivers} = useSelector((state) => state.drivers);
    const [isOpen, setIsOpen] = useState(-1);
    const navigate = useNavigate();
    const {showMessage} = useNotify()
    const {t} = useTranslation();

    const deleteDriver = async (id) => {
        try {
            const response = await dispatch(deleteDrivers(id)).unwrap()
            showMessage(t('DriverSnackbar.success.delete') );
            try {
                const res = await dispatch(getDrivers({
                    page: 1,
                    search: search,
                })).unwrap()
            } catch (error) {
                console.log(error)
            }
        }
        catch(err) {
            console.error(err);
            showMessage(t('DriverSnackbar.error.delete') , 'error' );

        }
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
                }}>{drivers.per_page * (drivers.current_page-1) + index+1}</TableCell>
                {arry[0].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{row.fio}</TableCell>}
                {arry[1].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>
                    <div className={'grid grid-cols-2 gap-x-2  w-max'}>
                        {
                            row.phone_number.map((item )=>(
                                <span  >{item}</span>
                            ))
                        }
                    </div>
                </TableCell>}
                {arry[2].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{row.number}</TableCell>}
                {arry[3].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{row.trailer_number }</TableCell>}
                {arry[4].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>
                    <div className="flex items-center gap-1 ">
                        <div onClick={(e) => {
                            e.stopPropagation();
                            dispatch(AddDriversId(row))
                            localStorage.setItem('driversId' , row?.id)
                            dispatch(EditToggle())
                            navigate(`/users/drivers/edit/${row?.id}`);
                        }}
                             className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">
                            <i
                                className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>
                        </div>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            dispatch(AddDriversId(row))
                            localStorage.setItem('driversId' , row?.id)
                            navigate(`/users/${navigateURL}/detail/${row.id}`)
                        }}
                             className="bg-[#5E83D4] w-[30px] h-[30px] rounded center text-[14px] group">
                            <i className="fa-solid fa-eye   text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                        </div>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            dispatch(AddDriversId(row))
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

                            deleteDriver(row?.id)
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
                        className={isOpen === row.id - 1 ? "    max-h-96 center transition-all duration-300 ease-in-out" : " max-h-0  center  transition-all duration-300 ease-in-out"}>
                        <ProfileInfoCardDrivers data={row}/>
                    </div>
                </TableCell>
            </TableRow>

        </>
    );
}

export default DriversPagination;