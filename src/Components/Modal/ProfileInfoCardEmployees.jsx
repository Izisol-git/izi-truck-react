import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

const ProfileInfoCardEmployees = ({ width, shadow, data }) => {
    const { t } = useTranslation();
    const modalRef = useRef(null);

    return (
        <div
            ref={modalRef}
            style={
                width
                    ? { width: width, boxShadow: shadow }
                    : {
                        width: "100%",
                        boxShadow:
                            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
                    }
            }
            className="bg-white overflow-hidden mx-auto rounded p-6 grid grid-cols-3 gap-6 dark:bg-darkBgTwo dark:rounded-none"
        >
            {/* LEFT */}
            <div className="flex flex-col space-y-4 border-r-4 border-dashed">
                <div className="flex flex-col justify-center h-full items-center gap-4">
                    <img src={data?.avatar !== '' ? '/profile.png' : '/profile.png'}

                         alt="User avatar"
                         className="w-44 h-44   object-cover  "
                    />
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                            {t("employees.employeeProfile.name")}:
                        </p>
                        <p className="bg-blue-100 text-blue-700 py-1 rounded inline-block font-medium dark:text-darkText">
                            {data?.user?.name || "—"}
                        </p>
                    </div>
                </div>
            </div>

            {/* MIDDLE */}
            <div className="flex flex-col space-y-4 border-r-4 border-dashed">
                <div>
                    <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                    {t("employees.employeeProfile.createDate")}:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
            <span className="text-base font-semibold text-gray-700 dark:text-darkText">
              {data?.created_at
                  ? new Date(data.created_at).toISOString().split("T")[0]
                  : "—"}
            </span>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                        {t("employees.employeeProfile.endDate")}:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
            <span className="text-base font-semibold text-gray-700 dark:text-darkText">
              {data?.updated_at
                  ? new Date(data.updated_at).toISOString().split("T")[0]
                  : "—"}
            </span>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                        {t("employees.employeeProfile.email")}:
                    </p>
                    <p className="text-base font-semibold text-gray-700 dark:text-darkText">
                        {data?.user?.email || "—"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                        {t("employees.employeeProfile.status")}:
                    </p>
                    {data?.status === "1" ? (
                        <span className="bg-green-300 text-gray-700 font-semibold px-3 py-1 rounded inline-block dark:bg-navBgHover dark:text-white">
              {t("employees.employeeProfile.statusActive")}
            </span>
                    ) : (
                        <span className="bg-yellow-300 text-gray-700 font-semibold px-3 py-1 rounded inline-block dark:bg-navBgHover dark:text-white">
              {t("employees.employeeProfile.statusInvalid")}
            </span>
                    )}
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col space-y-4">
                <div>
                    <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                        {t("employees.employeeProfile.phoneNumber")}:
                    </p>
                    <p className="text-base font-semibold text-gray-700 dark:text-darkText">
                        {data?.phone_number || "—"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                        {t("employees.employeeProfile.telegramId")}:
                    </p>
                    <p className="text-base font-semibold text-gray-700 dark:text-darkText">
                        {data?.tg_user_id || "—"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                        {t("employees.employeeProfile.telegramNick")}:
                    </p>
                    <p className="text-base font-semibold text-gray-700 dark:text-darkText">
                        {data?.tg_nick_name || "—"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                        {t("employees.employeeProfile.tin")}:
                    </p>
                    <span className="bg-green-300 text-gray-700 font-semibold px-3 py-1 rounded inline-block dark:bg-navBgHover dark:text-white">
            {data?.tin || "—"}
          </span>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfoCardEmployees;
