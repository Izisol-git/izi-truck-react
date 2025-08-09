import React  from "react";

const EmployeeModal = () => {
    const data = {
        name: "Super Admin Kholikulov",
        contract: "No Contracts",
        inn: "999999999",
        telegramNick: "employee_nick",
        roles: ["Super Admin", "Admin"],
        email: "superadmin@izitruck.uz",
        telegramId: "234234434345",
        status: "On Vacation",
    };
    return (
        <div className="absolute top-0 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-md   mx-auto">
            {/* Chap taraf */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600">Employee name:</span>
                    <span className="bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded">
                        {data.name}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600">Contract:</span>
                    <span className="bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded">
                        {data.contract}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600">inn:</span>
                    <span className="font-semibold">{data.inn}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Псевдоним пользователя(Telegram):</span>
                    <span className="font-semibold">{data.telegramNick}</span>
                </div>
            </div>

            {/* O'ng taraf */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-600">Roles:</span>
                    {data.roles.map((role, idx) => (
                        <span
                            key={idx}
                            className="bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded"
                        >
                            {role}
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600">Email:</span>
                    <span className="font-semibold">{data.email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">User ID(Telegram):</span>
                    <span className="font-semibold">{data.telegramId}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600">Status:</span>
                    <span className="font-semibold">{data.status}</span>
                </div>
            </div>
        </div>
    );
};

export default EmployeeModal;
