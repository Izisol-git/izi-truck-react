import React from 'react';
import {TableCell, TableRow} from "@mui/material";
import {
    DriversId,
    EditToggle,
    openModalComments,
    openModalHistory
} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {ProfileInfoCardDrivers} from "../index.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {readNotifications} from "../../features/Notification/notificationsThunks.js";

function NotificationsPagination({row  ,arry,index,navigateURL}) {
    const  navigate = useNavigate();
    const dispatch = useDispatch();
    const addReadNotification = async (id) => {
        try {
            const res = await dispatch(readNotifications(id));
            console.log(res);
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <TableRow
                // // onClick={() => {
                // //     isOpen !== row.id - 1 ? setIsOpen(row.id - 1) : setIsOpen(-1)
                // }}
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
                }}>{index+1}</TableCell>
                {arry[0].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>
                    <div className={'w-[40px] h-[40px]'}><img src='/profile.png' alt="foto"/></div>
                </TableCell>}
                {arry[1].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{row?.first_name + " " + row?.last_name}</TableCell>}
                {arry[2].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{row?.username}</TableCell>}
                {/*{arry[].active && <TableCell>{row.phone_number}</TableCell>}*/}
                {arry[3].active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>{new Date(row?.created_at).ddmmyyyy()}</TableCell>}
                {/*{arry[4].active && <TableCell sx={{*/}
                {/*    color: "black",*/}
                {/*    ".dark &": {*/}
                {/*        color: "white",*/}
                {/*    },*/}
                {/*}}>*/}
                {/*    {String(row?.is_read) === '0' ?*/}

                {/*    <div onClick={() => {*/}
                {/*        addReadNotification(row?.id);*/}
                {/*    }} className={'w-max py-1 px-2 rounded text-white  bg-red-500 dark:bg-btnBgDark '}>*/}
                {/*        O'qilmagan*/}
                {/*    </div> : <div onClick={() => {*/}
                {/*        addReadNotification(row?.id);*/}
                {/*    }} className={'w-max py-1 px-2 rounded text-white  bg-blue dark:bg-btnBgDark '}>*/}
                {/*        O'qilmagan*/}
                {/*    </div>*/}

                {/*}*/}
                {/*</TableCell>}*/}
                {/*{arry[4].active && <TableCell sx={{*/}
                {/*    color: "black",*/}
                {/*    ".dark &": {*/}
                {/*        color: "white",*/}
                {/*    },*/}
                {/*}}>{row?.Статус }</TableCell>}*/}
                {/*{arry[3].active && (*/}
                {/*    <TableCell>{new Date(row.created_at).toISOString().split("T")[0]}</TableCell>*/}
                {/*)}*/}

                {/*{arry[5].active && <TableCell sx={{*/}
                {/*    color: "black",*/}
                {/*    ".dark &": {*/}
                {/*        color: "white",*/}
                {/*    },*/}
                {/*}}>{'<--->'}</TableCell>}*/}
                {arry[4]?.active && <TableCell sx={{
                    color: "black",
                    ".dark &": {
                        color: "white",
                    },
                }}>
                    <div className="flex items-center gap-1 ">
                        {/*<div onClick={(e) => {*/}
                        {/*    e.stopPropagation();*/}
                        {/*    // findId(row.id)*/}
                        {/*    // dispatch(DriversId(row.id))*/}
                        {/*    // dispatch(EditToggle())*/}
                        {/*    // navigate("/users/drivers/edit");*/}
                        {/*}}*/}
                        {/*     className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">*/}
                        {/*    <i*/}
                        {/*        className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>*/}
                        {/*</div>*/}
                        <button onClick={(e) => {
                            e.stopPropagation();
                            // dispatch(DriversId(row.id))
                            navigate(`/${navigateURL}/view/${row.id}`)
                        }}
                             className="bg-[#5E83D4]   h-[30px] rounded center text-[14px] group px-2 py-2 text-white ">

                            <i className="fa-solid fa-eye mr-2   text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                            view
                        </button>
                        {/*<div onClick={(e) => {*/}
                        {/*    e.stopPropagation();*/}
                        {/*    dispatch(openModalHistory())*/}

                        {/*}}*/}
                        {/*     className="bg-[#38CB6E] w-[30px] h-[30px] rounded center text-[14px] group">*/}
                        {/*    <i className="fa-regular fa-clock   text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>*/}
                        {/*</div>*/}
                        {/*{*/}
                        {/*    navigateURL === 'customers' ? <div onClick={(e) => {*/}
                        {/*            e.stopPropagation();*/}
                        {/*            dispatch(openModalComments())*/}
                        {/*        }}*/}
                        {/*                                       className="bg-purple-500 w-[30px] h-[30px] rounded center text-[14px] group  ">*/}
                        {/*            <i className="fa-solid fa-comment-dots text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>*/}
                        {/*        </div>*/}
                        {/*        : ""*/}

                        {/*}*/}
                        {/*<div onClick={(e) => {*/}
                        {/*    e.stopPropagation();*/}
                        {/*}}*/}
                        {/*     className="bg-red-500 w-[30px] h-[30px] rounded center text-[14px] group  ">*/}
                        {/*    <i className="fa-solid fa-trash  text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>*/}
                        {/*</div>*/}
                    </div>
                </TableCell>}

            </TableRow>
            {/*<TableRow>*/}
            {/*    <TableCell sx={{padding: 0, overflow: "hidden", background: "#F9FBFD"}} colSpan={8}>*/}
            {/*        <div*/}
            {/*            // onMouseLeave={()=> setIsOpen(-1)}*/}
            {/*            className={isOpen === row.id - 1 ? "    max-h-96 center transition-all duration-300 ease-in-out" : " max-h-0  center  transition-all duration-300 ease-in-out"}>*/}
            {/*            <ProfileInfoCardDrivers data={row}/>*/}
            {/*        </div>*/}
            {/*    </TableCell>*/}
            {/*</TableRow>*/}
        </>
    );
}

export default NotificationsPagination;