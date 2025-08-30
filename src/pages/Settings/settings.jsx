import React, {useEffect, useState} from 'react';
import {Navbar} from "../../Components/index.js";
import {useSelector} from "react-redux";
import Pusher from "pusher-js";
import axios from "axios";
import {getCurrentUser} from "../../features/Auth/authThunks.js";

function Settings() {
    // const notifications = useSelector((state) => state.notification);
    const [notifications, setNotifications] = useState([]);
    Pusher.logToConsole = true;

    // async function login() {
    //     const response = await axios.post(
    //         "http://192.168.10.77:9090/broadcasting/auth",
    //         {}, // agar body bo‘lmasa bo‘sh object berasan
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`
    //             }
    //         }
    //     );
    //
    //     return response.data.token;
    // }


    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);

        // Pusher client
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
            cluster: import.meta.env.VITE_PUSHER_CLUSTER,
            authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        });

        // Kanalga ulanish
        const channel = pusher.subscribe("private-xabar");

        // Laravel default event nomi
        channel.bind("App\\Events\\MessageEvent", (data) => {
            console.log("✅ Xabar keldi:", data);
            setNotifications((prev) => [data, ...prev]);
        });

        // Cleanup
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, []);


    console.log(notifications);

    return (
        <>

            <div className="fixed top-4 right-4 w-80 space-y-2">
                {notifications.map((n, i) => (
                    <div key={i} className="bg-white p-3 shadow rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm">{n.id}</p>
                        <span className="text-xs text-gray-400">{n.chat_id}</span>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Settings;