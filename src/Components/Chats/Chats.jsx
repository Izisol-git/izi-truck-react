import React, {useEffect, useRef , useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {sendMessages} from "../../features/Notification/notificationsThunks.js";

export const UserChats = ({ item, chatUser, currentUserId , user }) => {


    // vaqt formatlash
    const formatDate = (dateString) => {
        const d = new Date(dateString);
        return `${d.getHours().toString().padStart(2, "0")}:${d
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
    };

    const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

    const showFile = (item) => {
        if (!item?.file_type) return "";

        switch (item.file_type) {
            case "photo":

                return (
                    <img
                        src={`https://backend.izitruck.uz/storage/messages/photo_68cc028f2d05b.jpg`}
                        alt={item.file_name}
                        className="mt-2 rounded-lg max-w-[300px] max-h-[200px] object-cover"
                    />
                );

            // Video fayllari

            case "video":
                return (
                    <video
                        controls
                        className="mt-2 rounded-lg max-w-[400px] max-h-[300px] bg-black"
                    >
                        <source src={`${BASE_URL}/storage/${item.file_path}`} type={item.type} />
                        Your browser does not support the video tag.
                    </video>
                );

            // Agar boshqa fayl chiqsa
            default:
                return (
                    <a
                        href={`${BASE_URL}/storage/${item.file_path}`}
                        download
                        className="text-blue-500 underline mt-2 block"
                    >
                        {item.file_name}
                    </a>
                );
        }
    };


    return (
        <div
            className={`flex items-end gap-2 mb-4 ${
                item?.from_type === 'admin' ? "justify-end" : "justify-start"
            }`}
        >
            {/* Avatar faqat boshqa foydalanuvchilar uchun */}
            {item?.from_type !== 'admin' && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0">
                    <img src="/profile.png" alt="foto"/>
                </div>
            )}

            <div
                className={` max-w-[60%] px-3 py-2 rounded-2xl shadow text-sm ${
                    item?.from_type === 'admin'
                        ? "bg-black text-white rounded-br-none dark:bg-navBgHover"
                        : "bg-gray-100 text-gray-800 rounded-bl-none dark:bg-navBgHover dark:text-white"
                }`}
            >

                <div
                    className={`flex items-center gap-2 mt-1 text-[11px] ${
                        item?.from_type === 'admin' ? "justify-end text-gray-300" : "justify-start text-gray-500 dark:text-white"
                    }`}
                >
                    <span>{formatDate(item.created_at)}</span>
                    <span>{ item?.from_type === 'admin' ?  (user?.user?.name)  : (chatUser.first_name + " " + chatUser.last_name)}</span>
                </div>
                {/* Matn yoki rasm */}
                <div className={'flex items-end  gap-4'}>

                    {item.file_type !== null && (
                        showFile(item)
                    )}

                    <p >{item.text}
                        {/*9446546546546546548  944654654654654654  944654654654654654  944654654654654654  944654654654654654  944654654654654654*/}
                    </p>
                </div>

                {/* Vaqt va ism */}

            </div>

            {/* Avatar faqat o‘zim uchun */}
            {item?.from_type === 'admin' && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0">
                    <img src="/public/profile.png" alt="foto"/>
                </div>
            )}
        </div>
    );
};

function Chats({ chatsData, chatUser, currentUserId , chatId , getChatsId }) {
    const containerRef = useRef(null);
    // const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const  dispatch = useDispatch();
    const {getAllChatsID} = useSelector((state) => state.notification);
    const {user} = useSelector((state) => state.auth);
    const [sendData, setSendData] = useState({
        text:'',
        file : ''
    });

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [getAllChatsID?.chat]);

    const handleSend = async () => {
        try {
            if (sendData.file) {
                // Fayl bor → FormData
                const formData = new FormData();
                formData.append("text", sendData.text);
                formData.append("file", sendData.file);

                await dispatch(sendMessages({ id: chatId, data: formData, hasFile: true }));
            } else {
                // Faqat text → JSON
                await dispatch(sendMessages({ id: chatId, data: { text: sendData.text }, hasFile: false }));
            }
            getChatsId(chatId)
        } catch (error) {
            console.error(error);
        }

        setSendData({ text: "", file: "" });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            console.log("File changed", e.target.files[0]);
            setSendData({ ...sendData, file: e.target.files[0] }); // File object
        }
    };

    return (
        <div ref={containerRef} className="bg-white flex flex-col   relative px-4 mx-auto pt-5 rounded-md shadow h-[calc(100dvh-160px)] overflow-y-scroll dark:bg-darkBgTwo">
            <div className={'  flex-1'}>
                {getAllChatsID?.messages?.map((item) => (
                    <UserChats
                        key={item.id}
                        item={item}
                        chatUser={getAllChatsID?.chat}
                        currentUserId={currentUserId}
                        user={user}
                    />
                ))}
            </div>

            {/* Input + File + Send */}
            <div
                className="sticky  -bottom-1 left-0 w-full  bg-white dark:bg-darkBgTwo px-3 py-2 flex items-center gap-2 mb-3 ">
                {/* Fayl tanlash */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{display: "none"}}
                    id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer text-gray-600">
                    <i className="fa-solid fa-paperclip text-xl dark:text-darkText"></i>
                </label>


                {/* Matn kiritish */}
                <TextField
                    className={'dark:bg-darkText rounded dark:text-white'}
                    variant="outlined"
                    size="small"
                    placeholder="Write a message..."
                    fullWidth
                    value={sendData?.text}
                    onChange={(e) => setSendData({...sendData , text:e.target.value})}
                />

                {/* Yuborish tugmasi */}
                <button
                    onClick={handleSend}
                    className="text-blue-500 hover:text-blue-700 px-2 w-16   py-2"
                >
                    <i className="fa-solid fa-paper-plane text-xl dark:text-darkText "></i>
                </button>
            </div>
        </div>
    );
}

export default Chats;