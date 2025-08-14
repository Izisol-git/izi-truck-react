import React from 'react';

function Button({value, onClick , icon , color}) {
    return (
        <>
            <button
                onClick={onClick}
                type={'button'}
                style={{backgroundColor: color}}
                className={`w-full py-2 px-3 bg-blue  text-white   rounded hover:bg-blue-900 transition`}
            >
                {icon} {value}
            </button>
        </>
    );
}

export default Button;