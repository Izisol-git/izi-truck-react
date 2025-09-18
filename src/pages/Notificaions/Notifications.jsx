import React, {useEffect, useState} from 'react';
import {UserNavbar} from "../index.js";
import {openModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {AddEmployesModal, Chats, Loading, Timeline, UserPagination} from "../../Components/index.js";
import {inputModalArray} from "../../Data/employeesData.js";
import {useDispatch, useSelector} from "react-redux";
import {getCahts, getNotifications} from "../../features/Notification/notificationsThunks.js";

function Notifications(props) {
    const dispatch = useDispatch();
    const [notificationsId, setNotificationsId] = useState();
    const [total, setTotal] = useState();
    const [notificationData, setNotificationData] = useState();
    const {user} = useSelector((state) => state.auth);
    const [columnsArry, setColumnsArry] = useState([
        { key: "notifications.notificationsTable.avatar", title: "Аватар", active: true },
        { key: "notifications.notificationsTable.full_name", title: "Full name", active: true },
        { key: "notifications.notificationsTable.username", title: "User Name", active: true },
        { key: "notifications.notificationsTable.created_at", title: "Created at", active: true },
        { key: "notifications.notificationsTable.action", title: "Action", active: true }
    ]);
    const getAll = async () => {
        try {
            const  res = await dispatch(getNotifications()).unwrap();
            console.log(res)
            // setNotificationData(res.messages);
        }catch(err){
            console.log(err);
        }
    }
    const getAllChats = async () => {
        try {
            const  res = await dispatch(getCahts()).unwrap();
            console.log(res)
            setTotal(res)
            setNotificationData(res);
        }catch(err){
            console.log(err);
        }
    }
    // console.log(notificationData);

    useEffect(()=>{
        console.log('ishladi')
        getAll()
        getAllChats()
    } , [])


   if( user?.user?.roles[0]?.name === 'super-admin'){
       return (
           <div>
               <div className={'bg-bacWhite flex min-h-[calc(100dvh-70px)] dark:bg-darkBg '}>
                   <div className="w-[90%] mx-auto">
                       <UserNavbar value={'Notifications'} columnsArry={columnsArry}
                                   setColumnsArry={setColumnsArry}/>
                       {/*{loading ? <Loading/> :*/}
                       <UserPagination
                           setEmployeesId={setNotificationsId}
                           total={total}
                           data={notificationData}
                           arry={columnsArry}
                           setColumnsArry={setColumnsArry}
                           navigateURL={'notifications'}/>
                       {/*}*/}
                       {/*<AddEmployesModal employeesId={employeesId} data={employeesData} h1={"Employees"}*/}
                       {/*                  inputModalArray={inputModalArray}/>*/}
                       {/*<Timeline/>*/}
                   </div>
               </div>
           </div>
       )
   }
   else {
       return (
           <></>
       )
   }
}

export default Notifications;