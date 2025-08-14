import React, { useEffect, useRef } from "react";

const ProfileInfoCard = ({width , shadow }) => {
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



    return (

            <div
                ref={modalRef} style={width   ? { width: width , boxShadow: shadow } : { width: "100%"  ,boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)' }}
                className={`bg-white overflow-hidden  mx-auto   rounded     p-6 grid grid-cols-3 gap-6`}
            >

                <div className="flex flex-col space-y-4   border-r-4 border-dashed">
                    <div className="flex flex-col  justify-center h-full items-center gap-4   ">
                        <img src={
                                user.avatar
                                    ? user.avatar
                                    : "https://ui-avatars.com/api/?name=Super+Admin&background=1D4ED8&color=fff"
                            }
                            alt="User avatar"
                            className="w-44 h-44 rounded-[30px] object-cover shadow"
                        />
                        <div className={'text-center'}>
                            <p className="text-sm  text-gray-500">Employee name:</p>
                            <p className="bg-blue-100 text-blue-700  py-1 rounded inline-block font-medium">
                                {user.name}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-4 border-r-4 border-dashed ">

                    <div>
                        <p className="text-sm text-gray-500">Roles:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {user.roles.map((role, i) => (
                                <span
                                    key={i}
                                    className="bg-green-300 text-gray-700   px-3 py-1 rounded font-semibold text-sm"
                                >
                                  {role}
                                </span>
                            ))}
                        </div>
                    </div>


                    <div>
                        <p className="text-sm text-gray-500">Email:</p>
                        <p className="text-base font-semibold text-gray-700">{user.email}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">User ID (Telegram):</p>
                        <p className="text-base font-semibold text-gray-700">
                            {user.telegramId}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Status:</p>
                        <p className="text-base font-semibold text-gray-700">{user.status}</p>
                    </div>
                </div>
                <div className="flex flex-col space-y-4  ">

                    <div>
                        <p className="text-sm text-gray-500">Contract:</p>
                        <span className="bg-green-300 text-gray-700 font-semibold px-3 py-1 rounded inline-block  ">
                          {user.contract}
                        </span>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">INN:</p>
                        <p className="text-base font-semibold text-gray-700">{user.inn}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Псевдоним пользователя (Telegram):
                        </p>
                        <p className="text-base font-semibold text-gray-700">
                            {user.telegramNick}
                        </p>
                    </div>
                </div>
            </div>

    );
};

export default ProfileInfoCard;
