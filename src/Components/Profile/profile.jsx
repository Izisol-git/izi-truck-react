import React, { useState, useRef, useEffect } from "react";

const ProfileDropdown = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    const toggleDropdown = () => setOpen(!open);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-[30px] h-[30px] relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className=" w-full h-full   rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none"
            >
                <i className="fa-solid fa-user-tie"></i>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                        <p className="px-4 py-2 text-sm font-semibold text-blue border-b">Full name</p>

                        <div
                            href="/settings"
                            className="block px-4 cursor-pointer py-2 text-sm text-blue font-semibold hover:bg-gray-100"
                        >
                            Sozlamalar
                        </div>
                        <button
                            onClick={() => alert("Chiqildi")}
                            className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                        >
                            Chiqish
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
