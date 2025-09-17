import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {UserNavbar} from "../index.js";
import {Chats, UserPagination} from "../../Components/index.js";
import {useDispatch} from "react-redux";
import {getAllChatsID, getNotifications} from "../../features/Notification/notificationsThunks.js";
import {useTranslation} from "react-i18next";

function NotificationsDetails() {
    const {id} = useParams();
    const {t} = useTranslation();

    const [chatsData , setChatsData] = useState();
    const [chatUser , setChatUser] = useState();
    const dispatch = useDispatch();


    const getAll = async () => {
        try {
            const  res = await dispatch(getNotifications()).unwrap();
            console.log(res)
            // setNotificationData(res.messages);
        }catch(err){
            console.log(err);
        }
    }

    const getChatsId =async () => {
        try {
            const res = await dispatch(getAllChatsID(id)).unwrap();
            console.log(res);
            setChatsData(res.messages);
            setChatUser(res.chat);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getChatsId()
        getAll()
    } , [id])


    return (
        <div>
            <div className={'bg-bacWhite flex min-h-[calc(100dvh-70px)] dark:bg-darkBg '}>
                <div className="w-[90%] mx-auto">


                    <div className="flex items-center  py-5 justify-between">
                        <p className={'text-2xl text-blue font-semibold dark:text-darkText'}>{t('notifications.chats.title')}</p>
                    </div>


                    <Chats getChatsId={getChatsId}  chatId={id} chatsData={chatsData} chatUser={chatUser} />


                    {/*{loading ? <Loading/> :*/}
                    {/*<UserPagination*/}
                    {/*    setEmployeesId={setNotificationsId}*/}
                    {/*    total={total}*/}
                    {/*    data={notificationData}*/}
                    {/*    arry={columnsArry}*/}
                    {/*    setColumnsArry={setColumnsArry}*/}
                    {/*    navigateURL={'notifications'}/>*/}
                    {/*/!*}*!/*/}
                    {/*/!*<AddEmployesModal employeesId={employeesId} data={employeesData} h1={"Employees"}*!/*/}
                    {/*/!*                  inputModalArray={inputModalArray}/>*!/*/}
                    {/*/!*<Timeline/>*!/*/}
                </div>
            </div>
        </div>
    );
}

export default NotificationsDetails;