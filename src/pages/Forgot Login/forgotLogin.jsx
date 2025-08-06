import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {Button, Input} from "../../Components";
import {Checkbox, FormControlLabel} from "@mui/material";
import {useNavigate} from "react-router-dom";

const ForgotLogin = () => {
    const navigate = useNavigate();


    return (
        <div className="flex h-screen overflow-hidden">

            <div className="hidden lg:block w-1/2 bg-blue relative">
                <div className="flex items-center justify-center h-full px-8">
                    <img
                        src="../../../public/truck-login.svg"
                        alt="Login Illustration"
                        className="max-h-[80%]"
                    />
                </div>
                <svg
                    className="absolute  top-0 right-0 h-full w-[100px]"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,0 C80,40 80,60 0,100 L100,100 L100,0 Z"
                        fill="white"
                    />
                </svg>

            </div>

            <div className="w-4/5 lg:w-1/2 mx-auto lg:mx-0 bg-white flex items-center justify-center">
                <div className="w-full max-w-md lg:px-8 lg:border border-blue rounded py-16">
                    <h2 className="text-2xl font-bold mb-6   text-blue text-center">Password reset</h2>
                    <form>
                        <p className="mb-4  ">
                            Forgot your password? No problem. Just let us know your email address and we will email you a
                            password reset link that will allow you to choose a new one.
                        </p>

                        <div className="mb-4  ">
                            <label htmlFor={"login-input"}
                                   className="block mb-1 font-semibold   text-blue">Email</label>
                            <Input type={'text'} autocomplete={'Email'} placeholder={'Email...'} id={'email -input'}/>
                        </div>

                        <Button value={'Send'}/>
                        <p onClick={() => navigate('/login')}
                           className={'cursor-pointer underline text-blue text-center hover:text-black mt-4'}>
                           Login
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotLogin;
