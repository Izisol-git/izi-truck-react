import React, {useEffect, useState} from 'react';
import {Navbar} from "../../Components/index.js";
import {useSelector} from "react-redux";
import Pusher from "pusher-js";
import axios from "axios";
import {getCurrentUser} from "../../features/Auth/authThunks.js";

function Settings() {
    // const notifications = useSelector((state) => state.notification);


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



    return (
        <>
            settings
        </>
    );
}

export default Settings;