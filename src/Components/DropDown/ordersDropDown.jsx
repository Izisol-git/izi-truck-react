import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const OrdersDropDown = ({activeStatus ,setActiveStatus}) => {



    return (
        <>
            <ButtonGroup sx={{border:'1px solid '}} variant="text">
                <Button
                    onClick={() => setActiveStatus("all")}
                    sx={{
                        paddingRight:'15px',
                        paddingLeft:'15px',
                        borderColor: "#1D2D5B",
                        color: "#1D2D5B",

                        backgroundColor:
                            activeStatus === "all" ? "rgba(29,45,91,0.3)" : "whit",
                        "&:hover": {
                            borderColor: "#162447",
                            backgroundColor: "rgba(29,45,91,0.15)",
                        },
                    }}
                >
                    Hammasi
                </Button>

                <Button
                    onClick={() => setActiveStatus("none")}
                    sx={{
                        color: "#1D2D5B",
                        borderColor: "#1D2D5B",
                        paddingRight:'15px',
                        paddingLeft:'15px',
                        backgroundColor:
                            activeStatus === "none" ? "rgba(29,45,91,0.3)" : "whit",
                        "&:hover": {
                            borderColor: "#162447",
                            backgroundColor: "rgba(29,45,91,0.15)",

                        },
                    }}
                >
                    Akt Yo'q
                </Button>

                <Button
                    onClick={() => setActiveStatus("yes")}
                    sx={{
                        color: "#1D2D5B",
                        borderColor: "#1D2D5B",
                        paddingRight:'15px',
                        paddingLeft:'15px',
                        backgroundColor:
                            activeStatus === "yes" ? "rgba(29,45,91,0.3)" : "whit",
                        "&:hover": {
                            borderColor: "#162447",
                            backgroundColor: "rgba(29,45,91,0.15)",
                        },
                    }}
                >
                    Akt bor
                </Button>
            </ButtonGroup>



        </>
    );
};

export default OrdersDropDown;
