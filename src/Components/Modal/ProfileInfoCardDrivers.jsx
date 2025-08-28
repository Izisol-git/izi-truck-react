import React, { useEffect, useRef } from "react";
import {useSelector} from "react-redux";
import {SkeletonMUI} from "../index.js";

const ProfileInfoCardDrivers = ({width , shadow , data }) => {


    const modalRef = useRef(null);

    const {loading} = useSelector((state) => state.drivers);



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
                                       ? "../../../public/profile.png"
                                       : "../../../public/profile.png"
                               }
                               alt="User avatar"
                               className="w-44 h-44 object-cover"
                           />
                       )}
                       <div className="text-center">
                           <p className="text-sm text-gray-500 dark:text-darkTextTwo">Drivers name:</p>
                           {loading ? (
                               <SkeletonMUI variant="text" width={120}   />
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
                       <p className="text-sm text-gray-500 dark:text-darkTextTwo">Create data:</p>
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
                       <p className="text-sm text-gray-500 dark:text-darkTextTwo">End data:</p>
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
                       <p className="text-sm text-gray-500 dark:text-darkTextTwo">brand:</p>
                       {loading ? (
                           <SkeletonMUI variant="text" width={80} />
                       ) : (
                           <p className="text-base font-semibold text-gray-700 dark:text-darkText">{data?.brand}</p>
                       )}
                   </div>

                   <div>
                       <p className="text-sm text-gray-500 dark:text-darkTextTwo">carrying:</p>
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
                       <p className="text-sm text-gray-500 dark:text-darkTextTwo">phone_numbers:</p>
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
                       <p className="text-sm text-gray-500 dark:text-darkTextTwo">tex_passport:</p>
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
                           <p className="text-sm text-gray-500 mb-1 dark:text-darkTextTwo">number:</p>
                           {loading ? (
                               <SkeletonMUI variant="text" width={80} />
                           ) : (
                               <span className="bg-green-300 text-gray-700 font-semibold px-3 py-1 rounded inline-block dark:text-darkText dark:bg-btnBgDark">
            {data?.number}
          </span>
                           )}
                       </div>
                       <div>
                           <p className="text-sm text-gray-500 mb-1 dark:text-darkTextTwo">trailer_number:</p>
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
                           <p className="text-sm text-gray-500 dark:text-darkTextTwo">height:</p>
                           {loading ? (
                               <SkeletonMUI variant="text" width={60} />
                           ) : (
                               <p className="text-base font-semibold text-gray-700 dark:text-darkText">
                                   {data?.height}
                               </p>
                           )}
                       </div>
                       <div>
                           <p className="text-sm text-gray-500 dark:text-darkTextTwo">capacity:</p>
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
                           <p className="text-sm text-gray-500 dark:text-darkTextTwo">length:</p>
                           {loading ? (
                               <SkeletonMUI variant="text" width={60} />
                           ) : (
                               <p className="text-base font-semibold text-gray-700 dark:text-darkText">
                                   {data?.length}
                               </p>
                           )}
                       </div>
                       <div>
                           <p className="text-sm text-gray-500 dark:text-darkTextTwo">width:</p>
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
