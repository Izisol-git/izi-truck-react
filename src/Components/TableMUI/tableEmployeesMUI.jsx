import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from "react-i18next";

export default function TableEmployeesMUI({ contracts }) {
    const { t } = useTranslation();

    if (!Array.isArray(contracts)) {
        return (
            <TableContainer
                component={Paper}
                sx={{
                    width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '20px',
                    '.dark &': {
                        bgcolor: '#303030'
                    }
                }}
            >
                <Table aria-label="simple table">
                    <TableHead
                        sx={{
                            bgcolor: '#F2F6F9',
                            '.dark &': {
                                bgcolor: '#374151',
                                color: 'white'
                            }
                        }}
                    >
                        <TableRow>
                            <TableCell  sx={{
                                bgcolor: '#F2F6F9',
                                '.dark &': {
                                    bgcolor: '#374151',
                                    color: 'white'
                                }
                            }}>{t("clients.table.id")}</TableCell>
                            <TableCell  sx={{
                                bgcolor: '#F2F6F9',
                                '.dark &': {
                                    bgcolor: '#374151',
                                    color: 'white'
                                }
                            }}>{t("clients.table.contractNumber")}</TableCell>
                            <TableCell  sx={{
                                bgcolor: '#F2F6F9',
                                '.dark &': {
                                    bgcolor: '#374151',
                                    color: 'white'
                                }
                            }}>{t("clients.table.contractDate")}</TableCell>
                            <TableCell  sx={{
                                bgcolor: '#F2F6F9',
                                '.dark &': {
                                    bgcolor: '#374151',
                                    color: 'white'
                                }
                            }}>{t("clients.table.company")}</TableCell>
                            <TableCell  sx={{
                                bgcolor: '#F2F6F9',
                                '.dark &': {
                                    bgcolor: '#374151',
                                    color: 'white'
                                }
                            }}>{t("clients.table.inn")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            key={contracts?.id}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                '.dark &': { bgcolor: '#303030' }
                            }}
                        >
                            <TableCell  sx={{
                                '.dark &': {
                                    color: 'white'
                                }
                            }}>{contracts?.id}</TableCell>
                            <TableCell  sx={{
                                '.dark &': {
                                    color: 'white'
                                }
                            }}>{contracts?.contract_no}</TableCell>
                            <TableCell  sx={{
                                '.dark &': {
                                    color: 'white'
                                }
                            }}>
                                {contracts?.created_at
                                    ? new Date(contracts?.created_at).toISOString().split("T")[0]
                                    : "—"}
                            </TableCell>
                            <TableCell  sx={{
                                '.dark &': {
                                    color: 'white'
                                }
                            }}>{contracts?.customer}</TableCell>
                            <TableCell  sx={{
                                '.dark &': {
                                    color: 'white'
                                }
                            }}>{contracts?.customer_tin}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    if (Array.isArray(contracts)) {
        return (
            <TableContainer
                component={Paper}
                sx={{
                    width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '20px',
                    '.dark &': {
                        bgcolor: '#303030'
                    }
                }}
            >
                <Table aria-label="simple table">
                    <TableHead
                        // color={'white'}
                        sx={{
                            bgcolor: '#F2F6F9',
                            '.dark &': {
                                bgcolor: '#374151',
                                color: 'white'
                            }
                        }}
                    >
                        <TableRow>
                            <TableCell  sx={{
                                bgcolor: '#F2F6F9',
                                '.dark &': {
                                    bgcolor: '#374151',
                                    color: 'white'
                                }
                            }}>{t("clients.table.id")}</TableCell>
                            <TableCell  sx={{
                                bgcolor: '#F2F6F9',
                                '.dark &': {
                                    bgcolor: '#374151',
                                    color: 'white'
                                }
                            }}>{t("clients.table.contractNumber")}</TableCell>
                            <TableCell  sx={{
                                bgcolor: '#F2F6F9',
                                '.dark &': {
                                    bgcolor: '#374151',
                                    color: 'white'
                                }
                            }}>{t("clients.table.contractDate")}</TableCell>
                            <TableCell  sx={{
                                bgcolor: '#F2F6F9',
                                '.dark &': {
                                    bgcolor: '#374151',
                                    color: 'white'
                                }
                            }}>{t("clients.table.company")}</TableCell>
                            <TableCell  sx={{
                                bgcolor: '#F2F6F9',
                                '.dark &': {
                                    bgcolor: '#374151',
                                    color: 'white'
                                }
                            }}>{t("clients.table.inn")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contracts?.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '.dark &': { bgcolor: '#303030' }
                                }}
                            >
                                <TableCell  sx={{
                                    bgcolor: '#F2F6F9',
                                    '.dark &': {
                                        bgcolor: '#374151',
                                        color: 'white'
                                    }
                                }}>{index + 1}</TableCell>
                                <TableCell  sx={{
                                    bgcolor: '#F2F6F9',
                                    '.dark &': {
                                        bgcolor: '#374151',
                                        color: 'white'
                                    }
                                }}>{row?.contract_no}</TableCell>
                                <TableCell  sx={{
                                    bgcolor: '#F2F6F9',
                                    '.dark &': {
                                        bgcolor: '#374151',
                                        color: 'white'
                                    }
                                }}>
                                    {row?.created_at
                                        ? new Date(row?.created_at).toISOString().split("T")[0]
                                        : "—"}
                                </TableCell>
                                <TableCell  sx={{
                                    bgcolor: '#F2F6F9',
                                    '.dark &': {
                                        bgcolor: '#374151',
                                        color: 'white'
                                    }
                                }}>{row?.carrier}</TableCell>
                                <TableCell  sx={{
                                    bgcolor: '#F2F6F9',
                                    '.dark &': {
                                        bgcolor: '#374151',
                                        color: 'white'
                                    }
                                }}>{row?.carrier_tin}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
