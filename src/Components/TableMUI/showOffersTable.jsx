import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useTranslation} from "react-i18next";
import dayjs from "../../utils/dayjs.js";
import {Button, Chip} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AddOffersId, openOffersModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {OffersCard} from "../index.js";

function createData(Offer, OfferLabel, Carrier, Price, AvailableTransports, ArrivalTime, Telephone, Note, DateOfReply) {
    return {
        Offer, OfferLabel, Carrier, Price, AvailableTransports, ArrivalTime, Telephone, Note, DateOfReply
    };
}

const rows = [
    createData('Granula', 'Toshkent - Maskva', 'Super Admin Kholikulov2001', "25 000 000,00 so'm", 2, "14.08.2025", "+998991655101", "test uchun izoh", "11.08.2025 14:06"),
];

const ShowOffersTable = ({data}) => {
    const {t} = useTranslation();
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (



        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{background: '#F2F6F9'}}>
                        <TableCell>{t("ordersTranslation.table.route")}</TableCell>
                        {/*<TableCell align="left">{t("ordersTranslation.table.carrier")}</TableCell>*/}
                        <TableCell align="left">{t("ordersTranslation.table.price")}</TableCell>
                        <TableCell align="left">{t("ordersTranslation.table.cargo_name")}</TableCell>
                        <TableCell align="left">{t("ordersTranslation.table.cargo_weight")}</TableCell>
                        <TableCell align="left">{t("ordersTranslation.table.created_at")}</TableCell>
                        <TableCell align="left">{t("ordersTranslation.table.trailer_info")}</TableCell>
                        <TableCell
                            align="left">{user?.user?.roles[0]?.name === "super-admin" ? t("ordersTranslation.table.status") : 'Javob bermoq'}</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row?.route}
                            </TableCell>
                            {/*<TableCell align="left">{row?.Carrier}</TableCell>*/}
                            <TableCell align="left">{row?.price}</TableCell>
                            <TableCell align="left">{row?.cargo_name}</TableCell>
                            <TableCell align="left">{row?.cargo_weight}</TableCell>
                            <TableCell align="left">{new Date(row?.created_at)?.ddmmyyyy()}</TableCell>
                            <TableCell align="left">{row?.trailer_info}</TableCell>

                            {
                                user?.user?.roles[0]?.name === "super-admin"
                                    ?
                                    <TableCell align="left">{
                                        row?.status !== '1' ?
                                            <Chip
                                                label={'Faol'}
                                                color={'success'}
                                                variant="outlined"
                                                size="small"
                                            />
                                            :
                                            <Chip
                                                label={'Faol emas'}
                                                color={'warning'}
                                                variant="outlined"
                                                size="small"
                                            />
                                    }</TableCell>
                                    :
                                    <TableCell align="left">
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            size="small"
                                            onClick={() => {
                                                dispatch(openOffersModal())
                                                dispatch(AddOffersId(row))
                                            }}
                                        >
                                            <i className="fa-solid fa-pen-nib mr-2"></i>
                                            Javob berish
                                        </Button>
                                    </TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ShowOffersTable;
