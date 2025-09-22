import React from 'react';
import {
    AddEmployesModal,
    ProfileInfoCard,
    ProfileInfoCardDrivers,
    ProfileInfoClients,
    TableEmployeesMUI,
    Timeline
} from "../index.js";
import {
    EditToggle,
    openModal,
    openModalHistory
} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Button} from "@mui/material";
import {deleteClients, getClients} from "../../features/customers/clientsThunks.js";
import {deleteDrivers, getDrivers} from "../../features/Drivers/driversThunks.js";
import {deleteEmployee, getEmployees} from "../../features/Employees/employeeThunks.js";

function Details({inputModalArray, btnValue, data, id, contract}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {clientsId} = useSelector((state) => state.customers);
    const {employeesId} = useSelector((state) => state.employees);
    const {contractID} = useSelector((state) => state.employees);
    const {driversId} = useSelector((state) => state.drivers);
    const {t } = useTranslation();

    const deleteUser = async (id) => {
       if(btnValue === 'Drivers'){
           try {
               const response = await dispatch(deleteDrivers(id)).unwrap()
               navigate("/users/drivers");
               try {
                   const res = await dispatch(getDrivers({
                       page: 1,
                       search: '',
                   })).unwrap()
               } catch (error) {
                   console.log(error)
               }
           }
           catch(err) {
               console.error(err);
           }
       }
       if(btnValue === 'Customers'){
           try {
               const result = await dispatch(deleteClients(id));
               navigate("/users/customers");
               try {
                   const result1 = await dispatch(getClients({page: 1, search:""})).unwrap()
               } catch (e) {
                   console.error(e);
               }
           } catch (error) {
               console.log(error);
           }
       }
       if(btnValue === 'Employees'){
           try {
               const res = await dispatch(deleteEmployee(id))
               navigate("/users/employees");
               try {
                   const result = await dispatch(getEmployees({page: 1, search: ''})).unwrap()
               } catch (err) {
                   console.log(err)
               }
           }
           catch (error) {
               console.log(error);
           }
       }
    }

    return (
        <div>
            <div className={'bg-bacWhite min-h-[calc(100dvh-70px)] dark:bg-darkBg  '}>
                <div className={'flex items-center justify-between py-5  w-[90%] mx-auto '}>
                    <div className={'w-max '} onClick={() => navigate(`/users/${btnValue.toLowerCase()}`)}>
                        <Button
                            onClick={() => navigate(`/orders`)}
                            sx={{
                                background : '#1D2D5B',
                                '.dark &':{
                                    background : '#2B4764',
                                }
                            }}
                            color={'info'}
                            variant={'contained'}>
                            <i className="fa-solid fa-right-from-bracket mr-2"></i>
                            {t('clients.back_to_clients')}
                        </Button>
                        {/*<Button color={'dark:bg-btnBgDark'} icon={<i className="fa-solid fa-arrow-left"></i>}*/}
                        {/*        value={btnValue}/>*/}
                    </div>
                    <div className={'flex items-center justify-between gap-2'}>
                        <div onClick={() => dispatch(openModalHistory())} className={'w-max'}>
                            <Button
                                color={'info'}
                                variant={'contained'}>
                                <i className="fa-regular fa-clock mr-2"></i>
                                {t('clients.history')}
                            </Button>
                            {/*<Button color={'dark:bg-btnBgDark'}*/}
                            {/*    // color={'#EAB308'}*/}
                            {/*        icon={<i className="fa-regular fa-clock"></i>}*/}
                            {/*        value={'History'}/>*/}
                        </div>
                        <div className={'w-max'}>

                            <Button
                                onClick={() => {
                                    dispatch(EditToggle())
                                    btnValue === 'Drivers' ? navigate(`/users/${btnValue.toLowerCase()}/edit/${id}`, btnValue) : dispatch(openModal())
                                }}
                                color={'warning'}
                                variant={'contained'}>
                                <i className="fa-solid fa-pen-to-square mr-2"></i>
                                {t('clients.editClients')}
                            </Button>

                            {/*<Button color={'dark:bg-btnBgDark'}*/}
                            {/*    // color={'#38CB6E'}*/}

                            {/*        value={'Edit'}/>*/}
                        </div>
                        <div className={'w-max'}>
                            <Button
                                onClick={()=>deleteUser(id)}
                                color={'error'}
                                variant={'contained'}>
                                <i className="fa-solid fa-trash mr-2"></i>
                                {t('clients.delete')}
                            </Button>


                        </div>
                    </div>
                </div>
                {
                    btnValue === "Employees" ? <ProfileInfoCard width={'90%'} data={employeesId}
                                                                shadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'}/>
                        : btnValue === "Customers" ? <ProfileInfoClients width={'90%'} data={clientsId}
                                                                         shadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'}/> :
                            btnValue === 'Drivers' ? <ProfileInfoCardDrivers width={'90%'} data={driversId}
                                                                             shadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'}/> : ''
                }


                {
                    btnValue !== "Drivers" ?
                        <div
                            className={'bg-white w-[90%] mt-4 py-4 px-6  mx-auto shadow-2xl rounded dark:bg-darkBgTwo'}>
                            <div className={'my-5 flex items-center justify-between'}>
                                <p className={'text-2xl text-blue font-semibold dark:text-darkText'}> {t('clients.contracts')}</p>

                            </div>
                            <div className={'w-[100%]  mx-auto  '}>
                                {/*{btnValue !== "Customers" ?*/}
                                    <TableEmployeesMUI
                                        contracts={btnValue === "Customers" ? clientsId : btnValue === "Employees" ?  contractID : ''}
                                    />
                                {/*    :*/}
                                {/*    <TableEmployeesMUI*/}
                                {/*        contracts={clientsId}*/}
                                {/*    />*/}
                                {/*}*/}
                            </div>
                        </div>
                        :
                        ''
                }
                <Timeline id={id} data={btnValue === "Customers" ? clientsId : btnValue === "Employees" ?  employeesId : btnValue === 'Drivers' ?  driversId : ''}/>

                <AddEmployesModal id={id} h1={btnValue} employeesId={data}
                                  inputModalArray={inputModalArray}/>
            </div>
        </div>
    )
        ;
}

export default Details;