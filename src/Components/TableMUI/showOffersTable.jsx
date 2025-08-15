import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ShowOffers} from "../../pages/index.js";

function createData(Offer , OfferLabel, Carrier, Price, AvailableTransports, ArrivalTime, Telephone, Note, DateOfReply) {
    return {
        Offer, OfferLabel,  Carrier, Price, AvailableTransports, ArrivalTime, Telephone, Note, DateOfReply
    };
}

const rows = [
    createData('Granula','Toshkent - Maskva', 'Super Admin Kholikulov2001', "25 000 000,00 so'm", 2, "14.08.2025" , "+998991655101" , "test uchun izoh" , "11.08.2025 14:06"),
];

const ShowOffersTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{background: '#F2F6F9'}}>
                        <TableCell>Taklif</TableCell>
                        <TableCell align="left">Carrier FIO</TableCell>
                        <TableCell align="left">Narx</TableCell>
                        <TableCell align="left">Mavjud transportlar</TableCell>
                        <TableCell align="left">Kelish vaqti </TableCell>
                        <TableCell align="left">Telefon </TableCell>
                        <TableCell align="left">Izoh </TableCell>
                        <TableCell align="left">Javob berilgan sana
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row , index) => (
                        <TableRow
                            key={index}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.OfferLabel} {row.Offer}
                            </TableCell>
                            <TableCell align="left">{row.Carrier}</TableCell>
                            <TableCell align="left">{row.Price}</TableCell>
                            <TableCell align="left">{row.AvailableTransports}</TableCell>
                            <TableCell align="left">{row.ArrivalTime}</TableCell>
                            <TableCell align="left">{row.Telephone}</TableCell>
                            <TableCell align="left">{row.Note}</TableCell>
                            <TableCell align="left">{row.DateOfReply}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ShowOffersTable;