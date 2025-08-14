import React from 'react';
import {Button} from "@mui/material";

function ButtonMui({title , onClick , variant , obj }) {
    return (
      <>
          <Button sx={obj} variant={variant} onClick={onClick}>{title}</Button>
      </>


    );
}

export default ButtonMui;