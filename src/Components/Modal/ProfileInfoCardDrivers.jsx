import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { SkeletonMUI } from "../index.js";
import { useTranslation } from "react-i18next";

const ProfileInfoCardDrivers = ({ width, shadow, data }) => {
    const modalRef = useRef(null);
    const { loading } = useSelector((state) => state.drivers);
    const { t } = useTranslation();

    return (
        <>
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
                className="bg-white overflow-hidden mx-auto rounded p-6 grid grid-cols-3 gap-6 dark:rounded-none dark:bg-darkBgTwo"
            >
                {/* Left section */}
                <div className="flex flex-col space-y-4 border-r-4 border-dashed">
                    <div className="flex flex-col justify-center h-full items-center gap-4">
                        {loading ? (
                            <SkeletonMUI variant="circular" width={176} height={176} />
                        ) : (
                            <img
                                src={
                                    data?.avatar !== ""
                                        ? "/profile.png"
                                        : "/profile.png"
                                }
                                alt="User avatar"
                                className="w-44 h-44 object-cover"
                            />
                        )}
                        <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                                {t("drivers.profile.name")}
                            </p>
                            {loading ? (
                                <SkeletonMUI variant="text" width={120} />
                            ) : (
                                <p className="bg-blue-100 text-blue-700 py-1 rounded inline-block font-medium dark:text-darkText">
                                    {data?.fio}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Middle section */}
                <div className="flex flex-col space-y-4 border-r-4 border-dashed">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                            {t("drivers.profile.createDate")}
                        </p>
                        <span className="text-base font-semibold text-gray-700 w-full dark:text-darkText">
              {loading ? (
                  <SkeletonMUI variant="text" width={100} />
              ) : data?.created_at ? (
                  new Date(data.created_at).toISOString().split("T")[0]
              ) : (
                  "—"
              )}
            </span>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                            {t("drivers.profile.endDate")}
                        </p>
                        <span className="text-base font-semibold text-gray-700 w-full dark:text-darkText">
              {loading ? (
                  <SkeletonMUI variant="text" width={100} />
              ) : data?.updated_at ? (
                  new Date(data.updated_at).toISOString().split("T")[0]
              ) : (
                  "—"
              )}
            </span>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                            {t("drivers.profile.brand")}
                        </p>
                        {loading ? (
                            <SkeletonMUI variant="text" width={80} />
                        ) : (
                            <p className="text-base font-semibold text-gray-700 dark:text-darkText">
                                {data?.brand}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                            {t("drivers.profile.carrying")}
                        </p>
                        {loading ? (
                            <SkeletonMUI variant="text" width={80} />
                        ) : (
                            <p className="text-base font-semibold text-gray-700 dark:text-darkText">
                                {data?.carrying}
                            </p>
                        )}
                    </div>
                </div>

                {/* Right section */}
                <div className="flex flex-col space-y-4">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                            {t("drivers.profile.phoneNumbers")}
                        </p>
                        <div className="text-base flex items-center flex-wrap gap-3 font-semibold text-gray-700 dark:text-darkText">
                            {loading ? (
                                <SkeletonMUI variant="text" width={120} />
                            ) : Array.isArray(data?.phone_number) ? (
                                data.phone_number.map((item, i) => <p key={i}>{item}</p>)
                            ) : (
                                "—"
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                            {t("drivers.profile.texPassport")}
                        </p>
                        {loading ? (
                            <SkeletonMUI variant="text" width={100} />
                        ) : (
                            <p className="text-base font-semibold text-gray-700 dark:text-darkText">
                                {data?.tex_passport}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1 dark:text-darkTextTwo">
                                {t("drivers.profile.number")}
                            </p>
                            {loading ? (
                                <SkeletonMUI variant="text" width={80} />
                            ) : (
                                <span className="bg-green-300 text-gray-700 font-semibold px-3 py-1 rounded inline-block dark:text-darkText dark:bg-btnBgDark">
                  {data?.number}
                </span>
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1 dark:text-darkTextTwo">
                                {t("drivers.profile.trailerNumber")}
                            </p>
                            {loading ? (
                                <SkeletonMUI variant="text" width={100} />
                            ) : (
                                <span className="bg-green-300 text-gray-700 font-semibold px-3 py-1 rounded inline-block dark:text-darkText dark:bg-btnBgDark">
                  {data?.trailer_number}
                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center flex-wrap gap-8">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                                {t("drivers.profile.height")}
                            </p>
                            {loading ? (
                                <SkeletonMUI variant="text" width={60} />
                            ) : (
                                <p className="text-base font-semibold text-gray-700 dark:text-darkText">
                                    {data?.height}
                                </p>
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                                {t("drivers.profile.capacity")}
                            </p>
                            {loading ? (
                                <SkeletonMUI variant="text" width={60} />
                            ) : (
                                <p className="text-base font-semibold text-gray-700 dark:text-darkText">
                                    {data?.capacity}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center flex-wrap gap-8">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                                {t("drivers.profile.length")}
                            </p>
                            {loading ? (
                                <SkeletonMUI variant="text" width={60} />
                            ) : (
                                <p className="text-base font-semibold text-gray-700 dark:text-darkText">
                                    {data?.length}
                                </p>
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-darkTextTwo">
                                {t("drivers.profile.width")}
                            </p>
                            {loading ? (
                                <SkeletonMUI variant="text" width={60} />
                            ) : (
                                <p className="text-base font-semibold text-gray-700 dark:text-darkText">
                                    {data?.width}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileInfoCardDrivers;
