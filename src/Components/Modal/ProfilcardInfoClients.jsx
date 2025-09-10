import React, { useRef} from "react";
import {useSelector} from "react-redux";

const ProfileInfoClients = ({width, shadow, data}) => {

    const {user} = useSelector((state) => state.auth);

    const modalRef = useRef(null);

    // console.log(data)


    return (

        <div
            ref={modalRef} style={width ? {width: width, boxShadow: shadow} : {
            width: "100%",
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
        }}
            className={`bg-white overflow-hidden  mx-auto  rounded        p-6 grid grid-cols-3 gap-6 dark:bg-darkBgTwo dark:rounded-0 `}
        >

            <div className="flex flex-col space-y-4   border-r-4 border-dashed">
                <div className="flex flex-col  justify-center h-full items-center gap-4   ">
                    <img src={data?.avatar !== '' ? ' ../../../public/profile.png' : '../../../public/profile.png'}

                         alt="User avatar"
                         className="w-44 h-44   object-cover  "
                    />
                    <div className={'text-center'}>
                        <p className="text-sm  text-gray-500  dark:text-darkTextTwo">Client name:</p>
                        <p className="bg-blue-100 text-blue-700  py-1 rounded inline-block font-medium dark:text-darkText">
                            {data?.fio}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col space-y-4 border-r-4 border-dashed ">

                <div>
                    <p className="text-sm text-gray-500 dark:text-darkTextTwo">Create data:</p>
                    <div className="flex flex-wrap gap-2 mt-1">

                                <span

                                    className="  text-base font-semibold text-gray-700 dark:text-darkText"
                                >
                                    {
                                        data?.created_at ?
                                            new Date(data.created_at).toISOString().split("T")[0]
                                            :
                                            "—"
                                    }
                                </span>

                    </div>
                </div>
                {/*<div>*/}
                {/*    <p className="text-sm text-gray-500 dark:text-darkTextTwo">End data:</p>*/}
                {/*    <div className="flex flex-wrap gap-2 mt-1">*/}

                {/*                <span className="  text-base font-semibold text-gray-700 dark:text-darkText"     >*/}
                {/*                    {*/}
                {/*                        data?.created_at ?*/}
                {/*                            new Date(data.updated_at).toISOString().split("T")[0]*/}
                {/*                            :*/}
                {/*                            "—"*/}
                {/*                    }*/}
                {/*                </span>*/}



                {/*    </div>*/}
                {/*</div>*/}


                <div>
                    <p className="text-sm text-gray-500 dark:text-darkTextTwo">Contract :</p>
                    <p className="text-base font-semibold text-gray-700 dark:text-darkText">{data?.contract?.customer}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-darkTextTwo">Added by:</p>
                    <p className="text-base font-semibold text-gray-700 dark:text-darkText">{user?.user?.name}</p>
                </div>
            </div>
            <div className="flex flex-col space-y-4  ">
                <div>
                    <p className="text-sm text-gray-500 dark:text-darkTextTwo">phone_number:</p>
                    <p className="text-base font-semibold text-gray-700 dark:text-darkText">
                        {data?.phone_number}
                    </p>
                </div>
                {/*<div>*/}
                {/*    <p className="text-sm text-gray-500 dark:text-darkTextTwo">shipment_notification:</p>*/}
                {/*    <p className="text-base font-semibold text-gray-700 dark:text-darkText">*/}
                {/*        {data?.shipment_notification}*/}
                {/*    </p>*/}
                {/*</div>*/}


            </div>
        </div>

    );
};

export default ProfileInfoClients;
