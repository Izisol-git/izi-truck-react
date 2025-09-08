import React, {useEffect, useState} from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {Button, Input} from "../../Components/index.js";
import {Checkbox, FormControlLabel} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {getCurrentUser, loginUser} from "../../features/Auth/authThunks.js";
import {useDispatch, useSelector} from "react-redux";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState();
    const [password    , setPassword  ] = useState();
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.auth);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const postLogin = async () => {
        try {
            const result = await dispatch(loginUser({ email, password })).unwrap();
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate("/dashboard");
        }
    } , [])


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

            <div className="w-4/5 mx-auto  lg:mx-0 lg:w-1/2 bg-white flex items-center justify-center">
                <div className="w-full max-w-md lg:px-8 lg:border border-blue rounded py-16">
                    <h2 className="text-2xl font-bold mb-6   text-blue text-center">Kirish</h2>
                    <form>
                        <div className="mb-4  ">
                            <label htmlFor={"login-input"}
                                   className="block mb-1 font-semibold   text-blue">Login</label>
                            <Input onChange={setEmail} type={'text'} autocomplete={'username'} placeholder={'Login...'} id={'login-input'}/>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-semibold text-blue">Parol</label>
                            <div className="relative ">
                                <Input onChange={setPassword} type={showPassword ? 'text' : 'password'} placeholder={'********'}
                                       id={'password-input'} autocomplete={'current-password'}/>
                                {
                                    showPassword ? <VisibilityOffOutlinedIcon onClick={() => togglePassword()}
                                                                              className="h-5 w-5 text-blue absolute top-1/2 -translate-y-1/2 right-2"/>
                                        :
                                        <VisibilityOutlinedIcon onClick={() => togglePassword()}
                                                                className="h-5 w-5 text-blue absolute top-1/2 -translate-y-1/2 right-2"/>
                                }
                            </div>
                        </div>
                        <div className="mb-4">
                            {/*<FormControlLabel*/}
                            {/*    control={<Checkbox  />}*/}
                            {/*    label="Men shartlarga roziman"*/}
                            {/*/>*/}
                        </div>
                        <Button onClick={()=> postLogin()} value={!loading ? 'Kirish' : 'Loading....'}/>
                        {/*<p onClick={()=> navigate('/forgot-password')} className={'cursor-pointer underline text-blue text-center hover:text-black mt-4'}>Forgot your password?</p>*/}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
