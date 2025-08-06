import React from 'react';

function Lable({value , htmlFor}) {
    return (
        <>
            <label htmlFor={htmlFor}>{value}</label>
        </>
    );
}

export default Lable;