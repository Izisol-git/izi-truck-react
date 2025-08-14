import React, { useState } from "react";

function MyCalendar() {
    const [date, setDate] = useState("");

    return (
        <div className="flex flex-col items-start gap-2">
            <input
                id="myDate"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 bg-transparent  h-[40px] rounded px-3 py-2 focus:outline-none focus:border-2 focus:border-[#3B82F6]"
            />

        </div>
    );
}

export default MyCalendar;
