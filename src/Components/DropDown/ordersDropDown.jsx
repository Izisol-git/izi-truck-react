import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useTranslation} from "react-i18next";

const OrdersDropDown = ({activeStatus ,setActiveStatus , setFilters , filters , onClick , pageqq}) => {




const {t} = useTranslation();


    return (


    <>
        <ButtonGroup sx={{
            border: "1px solid",
            borderRadius:'8px',

            overflow:'hidden',
            '.dark & ': {
                border: '2px solid #374151',
            }

        }} variant="text">
            {/* Hammasi */}
            <Button
                onClick={() => {
                    setActiveStatus('');
                    setFilters({ ...filters, search_status: 2 });
                    onClick(pageqq , { ...filters, search_status: 2 });
                }}
                sx={{
                    px: "15px",
                    borderColor: "#1D2D5B",
                    color: "#1D2D5B",
                    backgroundColor:
                        activeStatus === '' ? "rgba(29,45,91,0.3)" : "transparent",
                    "&:hover": {
                        borderColor: "#162447",
                        backgroundColor: "rgba(29,45,91,0.15)",
                    },

                    // 🔥 Dark mode
                    ".dark &": {
                        color: "#fff",
                        borderColor: "#374151",
                        backgroundColor:
                            activeStatus === '' ? "#374151" : "transparent",
                        "&:hover": {
                            backgroundColor: "rgba(55, 65, 81, 0.4)",
                        },
                    },
                }}
            >
                {t('ordersTranslation.all')}
            </Button>

            {/* Akt Yo‘q */}
            <Button
                onClick={() => {
                    setActiveStatus(0);
                    setFilters({ ...filters, search_status: 0 });
                    onClick(pageqq ,{ ...filters, search_status: 0 });
                }}
                sx={{
                    px: "15px",
                    borderColor: "#1D2D5B",
                    color: "#1D2D5B",
                    backgroundColor:
                        activeStatus === 0 ? "rgba(29,45,91,0.3)" : "transparent",
                    "&:hover": {
                        borderColor: "#162447",
                        backgroundColor: "rgba(29,45,91,0.15)",
                    },

                    // 🔥 Dark mode
                    ".dark &": {
                        color: "#fff",
                        borderColor: "#374151",
                        backgroundColor:
                            activeStatus === 0 ? "#374151" : "transparent",
                        "&:hover": {
                            backgroundColor: "rgba(55, 65, 81, 0.4)",
                        },
                    },
                }}
            >
                {t('ordersTranslation.no_act')}
            </Button>

            {/* Akt Bor */}
            <Button
                onClick={() => {
                    setActiveStatus(1);
                    setFilters({ ...filters, search_status: 1 });
                    onClick(pageqq ,{ ...filters, search_status: 1 });
                }}
                sx={{
                    px: "15px",
                    borderColor: "#1D2D5B",
                    color: "#1D2D5B",
                    backgroundColor:
                        activeStatus === 1 ? "rgba(29,45,91,0.3)" : "transparent",
                    "&:hover": {
                        borderColor: "#162447",
                        backgroundColor: "rgba(29,45,91,0.15)",
                    },

                    // 🔥 Dark mode
                    ".dark &": {
                        color: "#fff",
                        borderColor: "#374151",
                        backgroundColor:
                            activeStatus === 1 ? "#374151" : "transparent",
                        "&:hover": {
                            backgroundColor: "rgba(55, 65, 81, 0.4)",
                        },
                    },
                }}
            >
                {t('ordersTranslation.has_act')}
            </Button>
        </ButtonGroup>
    </>

);
};

export default OrdersDropDown;
