import React from 'react';

function Button({value, onClick , icon , color , darkColor  , width='w-full' , rounded='rounded'}) {
    return (
        <>
            <button

                onClick={onClick}
                type={'button'}
                className={`${width}  py-2 px-3 bg-blue   text-white ${color}    ${rounded} hover:bg-blue-900 transition`}
            >
                {icon} {value}
            </button>
        </>
    );
}

export default Button;