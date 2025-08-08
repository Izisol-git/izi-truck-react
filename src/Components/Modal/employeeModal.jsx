import React  from "react";

const EmployeeModal = () => {

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <p className="text-gray-700">Employee name:</p>
                    <p className="text-blue-600 font-semibold">Super Admin Kholikulov</p>
                </div>
                <div>
                    <p className="text-gray-700">Roles:</p>
                    <p className="text-blue-600 font-semibold">Super Admin, Admin</p>
                </div>
                <div>
                    <p className="text-gray-700">Contract:</p>
                    <p className="text-blue-600 font-semibold">No Contracts</p>
                </div>
                <div>
                    <p className="text-gray-700">Email:</p>
                    <p className="text-blue-600 font-semibold">superadmin@izitruck.uz</p>
                </div>
                <div>
                    <p className="text-gray-700">INN:</p>
                    <p className="text-blue-600 font-semibold">999999999</p>
                </div>
                <div>
                    <p className="text-gray-700">User ID (Telegram):</p>
                    <p className="text-blue-600 font-semibold">23423434345</p>
                </div>
                <div>
                    <p className="text-gray-700">Username (Telegram):</p>
                    <p className="text-blue-600 font-semibold">employee_nick</p>
                </div>
                <div>
                    <p className="text-gray-700">Status:</p>
                    <p className="text-blue-600 font-semibold">On Vacation</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeModal;
