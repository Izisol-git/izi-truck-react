import React from 'react';
import {
    AddEmployesModal,
    Button,
    ProfileInfoCard,
    ProfileInfoCardDrivers,
    ProfileInfoClients,
    TableEmployeesMUI,
    Timeline
} from "../index.js";
import {
    EditToggle,
    openContractsModal,
    openModal,
    openModalHistory
} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

function Details({inputModalArray, btnValue, data, id, contract}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(contract)
    return (
        <div>
            <div className={'bg-bacWhite min-h-[calc(100dvh-70px)] dark:bg-darkBg  '}>
                <div className={'flex items-center justify-between py-5  w-[90%] mx-auto '}>
                    <div className={'w-max '} onClick={() => navigate(`/users/${btnValue.toLowerCase()}`)}>
                        <Button color={'dark:bg-btnBgDark'} icon={<i className="fa-solid fa-arrow-left"></i>}
                                value={btnValue}/>
                    </div>
                    <div className={'flex items-center justify-between gap-2'}>
                        <div onClick={() => dispatch(openModalHistory())} className={'w-max'}>
                            <Button color={'dark:bg-btnBgDark'}
                                // color={'#EAB308'}
                                    icon={<i className="fa-regular fa-clock"></i>}
                                    value={'History'}/>
                        </div>
                        <div className={'w-max'}>
                            <Button color={'dark:bg-btnBgDark'} onClick={() => {
                                dispatch(EditToggle())
                                btnValue === 'Drivers' ? navigate(`/users/${btnValue.toLowerCase()}/edit`, btnValue) : dispatch(openModal())
                            }}
                                // color={'#38CB6E'}
                                    icon={<i className="fa-solid fa-pen-to-square"></i>}
                                    value={'Edit'}/>
                        </div>
                        <div className={'w-max'}>
                            <Button color={'dark:bg-btnBgDark'}
                                // color={'red'}
                                    icon={<i className="fa-solid fa-trash"></i>} value={'Delete'}/>
                        </div>
                    </div>
                </div>
                {
                    btnValue === "Employees" ? <ProfileInfoCard width={'90%'} data={data}
                                                                shadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'}/>
                        : btnValue === "Customers" ? <ProfileInfoClients width={'90%'} data={data}
                                                                         shadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'}/> :
                            btnValue === 'Drivers' ? <ProfileInfoCardDrivers width={'90%'} data={data}
                                                                             shadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'}/> : ''
                }


                {
                    btnValue !== "Drivers" ?
                        <div
                            className={'bg-white w-[90%] mt-4 py-4 px-6  mx-auto shadow-2xl rounded dark:bg-darkBgTwo'}>
                            <div className={'my-5 flex items-center justify-between'}>
                                <p className={'text-2xl text-blue font-semibold dark:text-darkText'}> Contracts</p>

                            </div>
                            <div className={'w-[100%]  mx-auto  '}>
                                {btnValue !== "Customers" ?
                                    <TableEmployeesMUI
                                        contracts={contract}
                                    />
                                    :
                                    <TableEmployeesMUI
                                        contracts={data?.contract}
                                    />
                                }
                            </div>

                        </div>
                        :
                        ''
                }
                <Timeline id={id} data={data}/>

                <AddEmployesModal id={id} h1={btnValue} employeesId={data}
                                  inputModalArray={inputModalArray}/>
            </div>
        </div>
    )
        ;
}

export default Details;