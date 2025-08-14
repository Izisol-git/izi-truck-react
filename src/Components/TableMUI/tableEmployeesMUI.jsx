import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




export default function TableEmployeesMUI({contracts}) {

    return (
        <TableContainer component={Paper} sx={{width:'100%' , marginLeft:'auto', marginRight:'auto' , marginTop:'20px'  }}>

            <Table  aria-label="simple table">
                <TableHead sx={{bgcolor: '#F2F6F9'}}>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell  >Contract number</TableCell>
                        <TableCell  >contractDate</TableCell>
                        <TableCell  >company</TableCell>
                        <TableCell  >status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contracts.map((row, index) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.contractNumber}
                            </TableCell>
                            <TableCell >{row.contractDate}</TableCell>
                            <TableCell >{row.company}</TableCell>
                            <TableCell>
                                {row.status === true ? <div
                                    className="w-max py-1 px-3     border border-[#22c55e] text-[#22c55e] rounded-lg">
                                    Active
                                </div> : <div
                                    className="w-max py-1 px-3 border border-[#eab308] text-[#eab308]   rounded-lg">
                                    Inactive
                                </div>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
