import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {UserNavbar} from "../index.js";
import {Chats, UserPagination} from "../../Components/index.js";
import {useDispatch} from "react-redux";
import {getAllChatsID} from "../../features/Notification/notificationsThunks.js";
import {useTranslation} from "react-i18next";

function NotificationsDetails() {
    const {id} = useParams();
    const {t} = useTranslation();
    const [columnsArry, setColumnsArry] = useState([
        {title: "Аватар", active: true},
        {title: "Full name", active: true},
        {title: "User Name", active: true},
        {title: "From type", active: true},
        {title: "Created at", active: true},
        {title: "Is read", active: true},
        {title: "Action", active: true},
    ])

    const [chatsData , setChatsData] = useState();
    const [chatUser , setChatUser] = useState();
    const dispatch = useDispatch();

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
    } , [])


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