import React, { useEffect, useRef } from "react";

const ProfileInfoCard = ({width , shadow , data }) => {
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
                        <img src={data.avatar !== '' ? ' ../../../public/profile.png' : '../../../public/profile.png'}

                            alt="User avatar"
                            className="w-44 h-44   object-cover  "
                        />
                        <div className={'text-center'}>
                            <p className="text-sm  text-gray-500">Employee name:</p>
                            <p className="bg-blue-100 text-blue-700  py-1 rounded inline-block font-medium">
                                {data.user.name}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-4 border-r-4 border-dashed ">

                    <div>
                        <p className="text-sm text-gray-500">Create data:</p>
                        <div className="flex flex-wrap gap-2 mt-1">

                                <span

                                    className="  text-base font-semibold text-gray-700"
                                >
                                  {new Date(data.created_at).toISOString().split("T")[0]}
                                </span>

                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">End data:</p>
                        <div className="flex flex-wrap gap-2 mt-1">

                                <span

                                    className="  text-base font-semibold text-gray-700"
                                >
                                  {new Date(data.updated_at).toISOString().split("T")[0]}
                                </span>

                        </div>
                    </div>


                    <div>
                        <p className="text-sm text-gray-500">Email:</p>
                        <p className="text-base font-semibold text-gray-700">{data.user.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Status:</p>
                        {data.status === '1' ?
                            <span className="bg-green-300 text-gray-700 font-semibold px-3 py-1 rounded inline-block  ">
                          Active
                        </span> :
                            <span className="bg-yellow-300 text-gray-700 font-semibold px-3 py-1 rounded inline-block  ">
                          Invalid
                        </span>}
                    </div>
                </div>
                <div className="flex flex-col space-y-4  ">
                    <div>
                    <p className="text-sm text-gray-500">User ID (Telegram):</p>
                        <p className="text-base font-semibold text-gray-700">
                            {data.tg_user_id}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">User nick name (Telegram):</p>
                        <p className="text-base font-semibold text-gray-700">
                            {data.tg_nick_name}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Tin:</p>
                        <span className="bg-green-300 text-gray-700 font-semibold px-3 py-1 rounded inline-block  ">
                          {data.tin}
                        </span>
                    </div>

                    {/*<div>*/}
                    {/*    <p className="text-sm text-gray-500">INN:</p>*/}
                    {/*    <p className="text-base font-semibold text-gray-700">{user.inn}</p>*/}
                    {/*</div>*/}

                    {/*<div>*/}
                    {/*    <p className="text-sm text-gray-500">*/}
                    {/*        Псевдоним пользователя (Telegram):*/}
                    {/*    </p>*/}
                    {/*    <p className="text-base font-semibold text-gray-700">*/}
                    {/*        {user.telegramNick}*/}
                    {/*    </p>*/}
                    {/*</div>*/}
                </div>
            </div>

    );
};

export default ProfileInfoCard;
