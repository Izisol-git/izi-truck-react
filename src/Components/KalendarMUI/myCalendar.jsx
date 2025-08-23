import React  from "react";

function MyCalendar({ value, onChange }) {
    const handleChange = (e) => {
        if (onChange) onChange(e.target.value);
    };

    return (
        <div className="flex flex-col items-start gap-2">
            <input
                id="myDate"
                type="date"
                value={value || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-transparent h-[40px] rounded px-3 py-2 focus:outline-none focus:border-2 focus:border-[#3B82F6]"
            />
        </div>
    );
}

export default MyCalendar;
