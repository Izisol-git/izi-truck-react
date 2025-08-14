import React from 'react';
import {AddEmployesModal, Button, ProfileInfoCard, TableEmployeesMUI, Timeline} from "../index.js";
import {openModal, openModalHistory} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

function Details({Contracts, inputModalArray , btnValue }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div>
            <div className={'bg-bacWhite min-h-[calc(100dvh-70px)]  '}>
                <div className={'flex items-center justify-between py-5  w-[90%] mx-auto '}>
                    <div className={'w-max '} onClick={() => navigate(`/users/${btnValue.toLowerCase()}`)}>
                        <Button icon={<i className="fa-solid fa-arrow-left"></i>} value={btnValue}/>
                    </div>
                    <div className={'flex items-center justify-between gap-2'}>
                        <div onClick={() => dispatch(openModalHistory())} className={'w-max'}>
                            <Button color={'#EAB308'} icon={<i className="fa-regular fa-clock"></i>}
                                    value={'History'}/>
                        </div>
                        <div className={'w-max'}>
                            <Button onClick={() => dispatch(openModal())} color={'#38CB6E'}
                                    icon={<i className="fa-solid fa-pen-to-square"></i>}
                                    value={'Edit'}/>
                        </div>
                        <div className={'w-max'}>
                            <Button color={'red'} icon={<i className="fa-solid fa-trash"></i>} value={'Delete'}/>
                        </div>
                    </div>
                </div>
                <ProfileInfoCard width={'90%'}
                                 shadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'}/>
                <div className={'bg-white w-[90%] mt-4 py-4 px-6  mx-auto shadow-2xl rounded'}>
                    <div className={'my-5'}><p className={'text-2xl text-blue font-semibold'}>Contracts</p>
                    </div>
                    <div className={'w-[100%]  mx-auto  '}>


                        <TableEmployeesMUI contracts={Contracts}/>
                    </div>

                </div>


                <Timeline/>

                <AddEmployesModal inputModalArray={inputModalArray}/>
            </div>
        </div>
    );
}

export default Details;