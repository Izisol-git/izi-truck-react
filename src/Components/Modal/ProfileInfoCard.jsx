import React, { useEffect, useRef } from "react";

const ProfileInfoCard = ({ isOpen, onClose }) => {
    const user = {
        name: "Super Admin Kholikulov",
        roles: ["Super Admin", "Admin"],
        contract: "No Contracts",
        inn: "999999999",
        telegramNick: "employee_nick",
        email: "superadmin@izitruck.uz",
        telegramId: "234234434345",
        status: "On Vacation",
        avatar: "", // Rasm URL (agar yo‘q bo‘lsa, default ishlaydi)
    };

    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose(); // Modal tashqarisiga bosilganda yopish
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }


    }, [isOpen, onClose]);

    return (
        <div className={`fixed inset-0 mx-auto my-auto  bg-opacity-60 z-[9999] flex items-center justify-center ${isOpen ? "max-w-full   max-h-full bg-black" : "max-w-0    max-h-0 bg-transparent"  }   transition-all duration-300 ease-in-out overflow-hidden `}>
            <div
                ref={modalRef}
                className={`w-full ${isOpen ? "max-w-4xl   max-h-96" : "max-w-0    max-h-0" } transition-all duration-300 ease-in-out overflow-hidden mx-4 md:mx-auto bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6`}
            >
                {/* Left Side */}
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={
                                user.avatar
                                    ? user.avatar
                                    : "https://ui-avatars.com/api/?name=Super+Admin&background=1D4ED8&color=fff"
                            }
                            alt="User avatar"
                            className="w-16 h-16 rounded-full object-cover shadow"
                        />
                        <div>
                            <p className="text-sm text-gray-500">Employee name:</p>
                            <p className="bg-blue-100 text-blue-700 px-3 py-1 rounded inline-block font-medium">
                                {user.name}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Contract:</p>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded inline-block font-medium">
              {user.contract}
            </span>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">INN:</p>
                        <p className="text-base font-semibold text-gray-800">{user.inn}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Псевдоним пользователя (Telegram):
                        </p>
                        <p className="text-base font-semibold text-gray-800">
                            {user.telegramNick}
                        </p>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Roles:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {user.roles.map((role, i) => (
                                <span
                                    key={i}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded font-medium text-sm"
                                >
                  {role}
                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Email:</p>
                        <p className="text-base font-semibold text-gray-800">{user.email}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">User ID (Telegram):</p>
                        <p className="text-base font-semibold text-gray-800">
                            {user.telegramId}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Status:</p>
                        <p className="text-base font-semibold text-gray-800">{user.status}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfoCard;
