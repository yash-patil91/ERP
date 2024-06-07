import React, { useState } from 'react';
import { RiGoogleFill } from "react-icons/ri";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { GiWarBonnet } from "react-icons/gi";
import { FaApple } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { api_url } from '../Constants';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const history=useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleSignUp=()=>{
        history('/registration')
    }
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await axios.post(`${api_url}/api/auth/login`, formData);
            localStorage.setItem('token', response.data.token);
            history('/home');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Login failed. Please check your username and password.');
            } else if (error.request) {
                setError('No response from server. Please check your network connection.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-[#002D74]'}`}>
            <div className={`bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <div className="px-8 md:px-16">

                   <div className='flex justify-between'>
                   <div className='bg-black p-1 inline-block rounded'>
                        <GiWarBonnet className='text-white text-2xl' />
                    </div>
                    <button
                            onClick={toggleDarkMode}
                            className="py-2 px-4 bg-gray-200 rounded-xl hover:scale-105 duration-300"
                        >
                            {darkMode ? <MdOutlineLightMode/> : <MdDarkMode/>}
                        </button>
                    </div>
                    <h4 className="font-bold text-xl">Login to Storytale</h4>
                    <p className="text-xs mt-4">Grab high-class graphics and boost your design workflow</p>

                    <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input className={`p-2 mt-8 rounded-xl border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`} type="text" name="username" value={formData.username}
                    onChange={handleChange} placeholder="Email Or Username" />
                        <div className="relative">
                            <input className={`p-2 rounded-xl border w-full ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`} type={passwordVisible ? "text" : "password"} name="password" placeholder="Password" value={formData.password}
                    onChange={handleChange} />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute top-1/2 right-3 -translate-y-1/2 focus:outline-none">
                                {passwordVisible ? <IoEyeOff /> : <IoEye />}
                            </button>
                        </div>
                        <button className="bg-[#2ad432] rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
                    </form>

                    <div className="mt-6 flex items-center text-gray-400">
                        <hr className="flex-grow border-gray-400" />
                        <p className="mx-4 text-center text-sm">OR authorize with</p>
                        <hr className="flex-grow border-gray-400" />
                    </div>

                    <div className="flex space-x-4 mt-5">
                        <button className={` border py-2 w-full rounded-xl flex justify-center items-center text-sm hover:scale-105 duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white text-[#002D74]'}`}>
                            <RiGoogleFill className="mr-2" />
                            Google
                        </button>
                        <button className={`border py-2 w-full rounded-xl flex justify-center items-center text-sm hover:scale-105 duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ' bg-white text-[#002D74]'}`}>
                            <FaApple className="mr-2" />
                            Apple
                        </button>
                    </div>

                    <div className="mt-5 text-xs py-2">
                        <a href="#" className={`${darkMode ? 'text-gray-400' : 'text-[#002D74]'}`}>Forgot password?</a>
                    </div>

                    <div className="mt-3 text-xs flex justify-between items-center">
                        <p>Don't have an account?</p>
                        <button className={`py-2 px-5  border rounded-xl hover:scale-110 duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white text-[#002D74]'}`} onClick={handleSignUp}>Sign up</button>
                    </div>
                </div>

                {/* <div className="md:block hidden w-1/2">
                    <img className="rounded-2xl" src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" />
                </div> */}
            </div>
        </section>
    );
};

export default Login;
