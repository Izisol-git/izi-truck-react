import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect} from "react";
import {isArray} from "chart.js/helpers";




export default function TableEmployeesMUI({contracts}) {
    const [data, setData] = React.useState([]);
    console.log(contracts)

        if(!Array.isArray(contracts) ){
            return (
                <TableContainer component={Paper} sx={{width:'100%' , marginLeft:'auto', marginRight:'auto' , marginTop:'20px' ,

                    '.dark &':{
                        bgcolor: '#303030'
                    }

                }}>

                    <Table  aria-label="simple table">
                        <TableHead sx={{
                            bgcolor: '#F2F6F9',
                            '.dark &':{
                                bgcolor: '#374151',
                                color: 'white'
                            }

                        }}>
                            <TableRow>
                                <TableCell sx={{
                                    '.dark &':{
                                        color: 'white'
                                    }
                                }}>ID</TableCell>
                                <TableCell sx={{
                                    '.dark &':{
                                        color: 'white'
                                    }
                                }} >Contract number</TableCell>
                                <TableCell  sx={{
                                    '.dark &':{
                                        color: 'white'
                                    }
                                }}>contractDate</TableCell>
                                <TableCell  sx={{
                                    '.dark &':{
                                        color: 'white'
                                    }
                                }}>company</TableCell>
                                <TableCell sx={{
                                    '.dark &':{
                                        color: 'white'
                                    }
                                }} >INN</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/*{contracts?.map((row, index) => (*/}
                                <TableRow
                                    key={contracts?.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } ,
                                        '.dark &':{
                                            bgcolor: '#303030',
                                        }
                                    }}
                                >
                                    <TableCell sx={{
                                        '.dark &':{
                                            color: 'white'
                                        }
                                    }}  component="th" scope="row">
                                        {contracts?.id }
                                    </TableCell>
                                    <TableCell sx={{
                                        '.dark &':{
                                            color: 'white'
                                        }
                                    }}  component="th" scope="row">
                                        {contracts?.contract_no}
                                    </TableCell>
                                    <TableCell sx={{
                                        '.dark &':{
                                            color: 'white'
                                        }
                                    }}  >{new Date(contracts?.created_at).ddmmyyyy()}</TableCell>
                                    <TableCell sx={{
                                        '.dark &':{
                                            color: 'white'
                                        }
                                    }}  >{contracts?.customer}</TableCell>
                                    <TableCell sx={{
                                        '.dark &':{
                                            color: 'white'
                                        }
                                    }}  >{contracts?.customer_tin}</TableCell>
                                    {/*<TableCell sx={{*/}
                                    {/*    '.dark &':{*/}
                                    {/*        color: 'white'*/}
                                    {/*    }*/}
                                    {/*}} >*/}
                                    {/*    {contracts?.status === true ? <div*/}
                                    {/*        className="w-max py-1 px-3     border border-[#22c55e] text-[#22c55e] rounded-lg">*/}
                                    {/*        Active*/}
                                    {/*    </div> : <div*/}
                                    {/*        className="w-max py-1 px-3 border border-[#eab308] text-[#eab308]   rounded-lg">*/}
                                    {/*        Inactive*/}
                                    {/*    </div>}*/}
                                    {/*</TableCell>*/}
                                </TableRow>
                            {/*))}*/}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }
        if(Array.isArray(contracts)){
            return (
                <TableContainer component={Paper} sx={{width:'100%' , marginLeft:'auto', marginRight:'auto' , marginTop:'20px' ,

                    '.dark &':{
                        bgcolor: '#303030'
                    }

                }}>

                    <Table  aria-label="simple table">
                        <TableHead sx={{
                            bgcolor: '#F2F6F9',
                            '.dark &':{
                                bgcolor: '#374151',
                                color: 'white'
                            }

                        }}>
                            <TableRow>
                                <TableCell sx={{
                                    '.dark &':{
                                        color: 'white'
                                    }
                                }}>ID</TableCell>
                                <TableCell sx={{
                                    '.dark &':{
                                        color: 'white'
                                    }
                                }} >Contract number</TableCell>
                                <TableCell  sx={{
                                    '.dark &':{
                                        color: 'white'
                                    }
                                }}>contractDate</TableCell>
                                <TableCell  sx={{
                                    '.dark &':{
                                        color: 'white'
                                    }
                                }}>company</TableCell>
                                <TableCell sx={{
                                    '.dark &':{
                                        color: 'white'
                                    }
                                }} >INN</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contracts?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } ,
                                        '.dark &':{
                                            bgcolor: '#303030',
                                        }
                                    }}
                                >
                                    <TableCell sx={{
                                        '.dark &':{
                                            color: 'white'
                                        }
                                    }}  component="th" scope="row">
                                        {index+1 }
                                    </TableCell>
                                    <TableCell sx={{
                                        '.dark &':{
                                            color: 'white'
                                        }
                                    }}  component="th" scope="row">
                                        {row?.contract_no}
                                    </TableCell>
                                    <TableCell sx={{
                                        '.dark &':{
                                            color: 'white'
                                        }
                                    }}  >{new Date(row?.created_at).ddmmyyyy()}</TableCell>
                                    <TableCell sx={{
                                        '.dark &':{
                                            color: 'white'
                                        }
                                    }}  >{row?.carrier}</TableCell>
                                    <TableCell sx={{
                                        '.dark &':{
                                            color: 'white'
                                        }
                                    }}  >{row?.carrier_tin}</TableCell>
                                    {/*<TableCell sx={{*/}
                                    {/*    '.dark &':{*/}
                                    {/*        color: 'white'*/}
                                    {/*    }*/}
                                    {/*}} >*/}
                                    {/*    {contracts?.status === true ? <div*/}
                                    {/*        className="w-max py-1 px-3     border border-[#22c55e] text-[#22c55e] rounded-lg">*/}
                                    {/*        Active*/}
                                    {/*    </div> : <div*/}
                                    {/*        className="w-max py-1 px-3 border border-[#eab308] text-[#eab308]   rounded-lg">*/}
                                    {/*        Inactive*/}
                                    {/*    </div>}*/}
                                    {/*</TableCell>*/}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }

        console.log(contracts)



}
