import React, {useRef} from "react";

function MyCalendar({value, onChange , errorMassage}) {
    const handleChange = (e) => {
        if (onChange) onChange(e.target.value);
    };
    const dateRef = useRef(null);
    const openCalendar = () => {
        if (dateRef.current && dateRef.current.showPicker) {
            dateRef.current.showPicker();
        }
    };

    return (
        <div className="flex flex-col items-start gap-2">
            <input
                id="myDate"
                type="date"
                ref={dateRef}
                value={value || ""}
                onChange={handleChange}
                onClick={openCalendar}
                className={`w-full h-[40px] rounded px-3 py-2  border  border-gray-300 ${errorMassage ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900  focus:outline-none focus:border-2 focus:border-[#3B82F6]   dark:bg-[#444444] dark:text-white dark:border-gray-600   dark:focus:border-blue-400    ` }
            />
        </div>

    );
}

export default MyCalendar;
