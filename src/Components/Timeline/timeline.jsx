import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {closeModalHistory} from "../../features/EmployeSModalToggle/employesModalToggle.js";

const Timeline = ({data}) => {
    const dispatch = useDispatch();
    const isOpenHistory = useSelector(
        (state) => state.employesModal.isOpenHistory
    );

    useEffect(() => {
        document.body.style.overflow = isOpenHistory ? "hidden" : "auto";
    }, [isOpenHistory]);

    const [openIndex, setOpenIndex] = useState(null);



       return (
           <>
               {/* Backdrop */}
               <div
                   className={`fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 z-[1099] ${
                       isOpenHistory ? "opacity-100" : "opacity-0 pointer-events-none"
                   }`}
                   onClick={() => dispatch(closeModalHistory())}
               ></div>

               {/* Modal (Center) */}
               <div
                   className={`fixed top-1/2 left-1/2 w-[38rem] max-h-[90vh] bg-white dark:bg-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-xl overflow-y-auto transform transition-all duration-500 ease-out z-[1100]
                      ${isOpenHistory ? "opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2" : "opacity-0 scale-90 -translate-x-1/2 -translate-y-1/2 pointer-events-none"}
                    `}
               >
                   {/* Header */}
                   <div
                       className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                       <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                           Change History
                       </h3>
                       <button
                           onClick={() => dispatch(closeModalHistory())}
                           className="p-2 w-[30px] h-[30px] center rounded hover:bg-gray-200 dark:hover:bg-gray-800"
                       >
                           <i className="fas fa-times text-blue"></i>
                       </button>
                   </div>

                   {/* Content */}
                   <div className="p-6 relative">
                       <div
                           className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-300/70 to-transparent"></div>

                       <div className="space-y-10">
                           {data?.all_histories.length > 0 ? data?.all_histories?.map((log, index) => {
                               const datetime = new Date(log.created_at);
                               const formattedDate = datetime.toLocaleDateString("en-GB");
                               const formattedTime = datetime.toLocaleTimeString([], {
                                   hour: "2-digit",
                                   minute: "2-digit",
                               });

                               let colorClass = "text-blue-600 dark:text-blue-400";
                               if (log.action === "created")
                                   colorClass = "text-green-600 dark:text-green-400";
                               if (log.action === "deleted")
                                   colorClass = "text-red-600 dark:text-red-400";

                               const userName = log.user?.name || "System";
                               const open = openIndex === index;

                               return (
                                   <div key={index} className="relative pl-12">
                                       <div
                                           className="absolute left-[6px] top-2 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-white dark:border-gray-900 shadow-md"></div>

                                       <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                           {formattedDate} • {formattedTime}
                                       </div>

                                       <div
                                           className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                           <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                               Record{" "}
                                               <span className={`${colorClass} font-semibold`}>
                                                {log.action}
                                               </span>{" "}
                                               by <strong>{userName}</strong>
                                           </div>

                                           {log.action === "updated" &&
                                           log.data?.old &&
                                           log.data?.new ? (
                                               <div className="mt-2">
                                                   {!open ? (
                                                       <button
                                                           onClick={() => setOpenIndex(index)}
                                                           className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                                                       >
                                                           Show details
                                                       </button>
                                                   ) : (
                                                       <div className="mt-2 space-y-1">
                                                           <button
                                                               onClick={() => setOpenIndex(null)}
                                                               className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                                                           >
                                                               Hide details
                                                           </button>

                                                           {Object.keys(log.data.new).map((key) => {
                                                               const oldVal = log.data.old[key];
                                                               const newVal = log.data.new[key];
                                                               return (
                                                                   <div
                                                                       key={key}
                                                                       className="text-sm text-gray-700 dark:text-gray-300 break-words whitespace-normal"
                                                                   >
                                                                       <span className="font-medium">{key}</span>:{" "}
                                                                       {oldVal && oldVal !== newVal && (
                                                                           <>
                                                                            <span
                                                                                className="text-red-500 line-through">
                                                                                {oldVal}
                                                                            </span>
                                                                               <span className="mx-1 text-gray-400">
                                                                                →
                                                                            </span>
                                                                           </>
                                                                       )}
                                                                       <span className="text-green-600 font-semibold">
                                                                        {newVal}
                                                                    </span>
                                                                   </div>
                                                               );
                                                           })}
                                                       </div>
                                                   )}
                                               </div>
                                           ) : log.action === "created" ? (
                                               <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                   Initial values saved.
                                               </div>
                                           ) : log.action === "deleted" ? (
                                               <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                   Record was deleted.
                                               </div>
                                           ) : null }
                                       </div>
                                   </div>
                               );
                           }) : <div className={'text-red-500 font-bold ml-4'}>Not found!</div>}
                       </div>
                   </div>
               </div>
           </>
       );

};

export default Timeline;
