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
import {AddEmployesModal, PaginationFooter, ProfileInfoCard} from "../index.js";
import {useDispatch, useSelector} from "react-redux";
import {
   EditToggle,
    openModal,
    openModalComments,
    openModalHistory
} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {useNavigate} from "react-router-dom";

const EmployeesPagination = ({arry , navigateURL , data , total , setEmployeesId}) => {
    const dispatch = useDispatch();
    const isOpenMOdal = useSelector((state) => state.employesModal.isOpen);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isOpen, setIsOpen] = useState(-1);
    const navigate = useNavigate();


    const findId = (id) => {
        const newData = data.find((employee) => employee.id === id);
        setEmployeesId(newData)

    }

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
                                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
                                        }}
                                        key={index}
                                    >
                                        <TableCell>{row.id}</TableCell>
                                        {arry[0].active && <TableCell>{row.user.name}</TableCell>}
                                        {arry[1].active && <TableCell>{row.phone_number}</TableCell>}
                                        {/*{arry[].active && <TableCell>{row.phone_number}</TableCell>}*/}
                                        {arry[2].active && <TableCell>{row.tin}</TableCell>}
                                        {arry[3].active && (
                                            <TableCell>{new Date(row.created_at).toISOString().split("T")[0]}</TableCell>
                                        )}

                                        {arry[4].active && <TableCell>
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
                                         {arry[5].active && <TableCell>
                                            <div className="flex items-center gap-1 ">
                                                <div onClick={(e) => {
                                                    e.stopPropagation();
                                                    dispatch(openModal())
                                                    findId(row.id)
                                                    dispatch(EditToggle())
                                                }}
                                                     className=" bg-yellow-500 w-[30px] h-[30px] rounded center text-[14px] group">
                                                    <i
                                                        className="fa-solid fa-pen-to-square   text-white group-hover:scale-125 transition-all duration-300 ease-in-out "></i>
                                                </div>
                                                <div onClick={(e)=> {
                                                    e.stopPropagation();
                                                    navigate(`/users/${navigateURL}/detail/${row.id}`)
                                                }}
                                                    className="bg-[#5E83D4] w-[30px] h-[30px] rounded center text-[14px] group">
                                                    <i className="fa-solid fa-eye   text-white group-hover:scale-125 transition-all duration-300 ease-in-out"></i>
                                                </div>
                                                <div onClick={(e)=> {
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
                                    <TableRow >
                                        <TableCell sx={{padding:0 , overflow:"hidden" , background:"#F9FBFD"}} colSpan={8}>
                                            <div
                                                // onMouseLeave={()=> setIsOpen(-1)}
                                                className={isOpen === row.id-1 ? "    max-h-96 center transition-all duration-300 ease-in-out" : " max-h-0  center  transition-all duration-300 ease-in-out"}>
                                                <ProfileInfoCard data={row} />
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                < />


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

export default EmployeesPagination;
