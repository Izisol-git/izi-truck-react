import React from 'react';

function Button({value, onClick}) {
    return (
        <>
            <button
                onClick={onClick}
                type={'button'}
                className="w-full bg-blue  text-white py-2 rounded hover:bg-blue-900 transition"
            >
                {value}
            </button>
        </>
    );
}

export default Button;