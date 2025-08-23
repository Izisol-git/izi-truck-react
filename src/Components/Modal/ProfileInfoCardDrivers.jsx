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
               className="bg-white overflow-hidden mx-auto rounded p-6 grid grid-cols-3 gap-6"
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
                           <p className="text-sm text-gray-500">Drivers name:</p>
                           {loading ? (
                               <SkeletonMUI variant="text" width={120}   />
                           ) : (
                               <p className="bg-blue-100 text-blue-700 py-1 rounded inline-block font-medium">
                                   {data?.fio}
                               </p>
                           )}
                       </div>
                   </div>
               </div>

               {/* Middle section */}
               <div className="flex flex-col space-y-4 border-r-4 border-dashed">
                   <div>
                       <p className="text-sm text-gray-500">Create data:</p>
                       <span className="text-base font-semibold text-gray-700 w-full">
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
                       <p className="text-sm text-gray-500">End data:</p>
                       <span className="text-base font-semibold text-gray-700 w-full">
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
                       <p className="text-sm text-gray-500">brand:</p>
                       {loading ? (
                           <SkeletonMUI variant="text" width={80} />
                       ) : (
                           <p className="text-base font-semibold text-gray-700">{data?.brand}</p>
                       )}
                   </div>

                   <div>
                       <p className="text-sm text-gray-500">carrying:</p>
                       {loading ? (
                           <SkeletonMUI variant="text" width={80} />
                       ) : (
                           <p className="text-base font-semibold text-gray-700">
                               {data?.carrying}
                           </p>
                       )}
                   </div>
               </div>

               {/* Right section */}
               <div className="flex flex-col space-y-4">
                   <div>
                       <p className="text-sm text-gray-500">phone_numbers:</p>
                       <div className="text-base flex items-center flex-wrap gap-3 font-semibold text-gray-700">
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
                       <p className="text-sm text-gray-500">tex_passport:</p>
                       {loading ? (
                           <SkeletonMUI variant="text" width={100} />
                       ) : (
                           <p className="text-base font-semibold text-gray-700">
                               {data?.tex_passport}
                           </p>
                       )}
                   </div>

                   <div className="flex flex-wrap gap-4">
                       <div>
                           <p className="text-sm text-gray-500 mb-1">number:</p>
                           {loading ? (
                               <SkeletonMUI variant="text" width={80} />
                           ) : (
                               <span className="bg-green-300 text-gray-700 font-semibold px-3 py-1 rounded inline-block">
            {data?.number}
          </span>
                           )}
                       </div>
                       <div>
                           <p className="text-sm text-gray-500 mb-1">trailer_number:</p>
                           {loading ? (
                               <SkeletonMUI variant="text" width={100} />
                           ) : (
                               <span className="bg-green-300 text-gray-700 font-semibold px-3 py-1 rounded inline-block">
            {data?.trailer_number}
          </span>
                           )}
                       </div>
                   </div>

                   <div className="flex items-center flex-wrap gap-8">
                       <div>
                           <p className="text-sm text-gray-500">height:</p>
                           {loading ? (
                               <SkeletonMUI variant="text" width={60} />
                           ) : (
                               <p className="text-base font-semibold text-gray-700">
                                   {data?.height}
                               </p>
                           )}
                       </div>
                       <div>
                           <p className="text-sm text-gray-500">capacity:</p>
                           {loading ? (
                               <SkeletonMUI variant="text" width={60} />
                           ) : (
                               <p className="text-base font-semibold text-gray-700">
                                   {data?.capacity}
                               </p>
                           )}
                       </div>
                   </div>

                   <div className="flex items-center flex-wrap gap-8">
                       <div>
                           <p className="text-sm text-gray-500">length:</p>
                           {loading ? (
                               <SkeletonMUI variant="text" width={60} />
                           ) : (
                               <p className="text-base font-semibold text-gray-700">
                                   {data?.length}
                               </p>
                           )}
                       </div>
                       <div>
                           <p className="text-sm text-gray-500">width:</p>
                           {loading ? (
                               <SkeletonMUI variant="text" width={60} />
                           ) : (
                               <p className="text-base font-semibold text-gray-700">
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
