import React, { useState } from 'react';
import { RiGoogleFill } from "react-icons/ri";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { GiWarBonnet } from "react-icons/gi";
import { FaApple } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { api_url } from '../Constants';
import axios from 'axios'

const Registration = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const history = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: ''
    });
    const [passwordError, setPasswordError] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/.test(formData.password);
        const isNameUsedAsPassword = formData.password.toLowerCase().includes(formData.name.toLowerCase());

        if (!isValidPassword) {
            setPasswordError('Password must contain at least 4 characters, one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }

        if (isNameUsedAsPassword) {
            setPasswordError('Password cannot contain your name.');
            return;
        }
        try {
            const response = await axios.post(`${api_url}/api/auth/register`, formData);
            localStorage.setItem('token', response.data.token);
            history('/');
        } catch (error) {
            if (error.response) {
                setPasswordError(error.response.data.message || 'Registration failed. Please try again.');
            } else if (error.request) {
                setPasswordError('No response from server. Please check your network connection.');
            } else {
                setPasswordError('An unexpected error occurred. Please try again.');
            }
        }


        // Continue with registration logic
        console.log('Registration data:', formData);
    };


    const handleSignIn = () => {
        history('/')
    }

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
                            {darkMode ? <MdOutlineLightMode /> : <MdDarkMode />}
                        </button>
                    </div>
                    <h4 className="font-bold text-xl">Register for Storytale</h4>
                    <p className="text-xs mt-4">Grab high-class graphics and boost your design workflow</p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 xl:w-[20vw] lg:w-[30vw] md:w-[40vw] sm:w-[50vw]">
                        <input
                            className={`p-2 mt-8 rounded-xl border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            className={`p-2 rounded-xl border w-full ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                            type="text"
                            name="username"
                            placeholder="Email Or Username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <div className="relative">
                            <input
                                className={`p-2 rounded-xl border w-full ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute top-1/2 right-3 -translate-y-1/2 focus:outline-none">
                                {passwordVisible ? <IoEyeOff /> : <IoEye />}
                            </button>
                        </div>
                        <button className="bg-[#2ad432] rounded-xl text-white py-2 hover:scale-105 duration-300">Register</button>
                        {passwordError && <p className="text-red-500">{passwordError}</p>}
                    </form>
                    <div className="mt-3 text-xs flex justify-between items-center">
                        <p>Already have an account?</p>
                        <button className={`py-2 px-5 border rounded-xl hover:scale-110 duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white text-[#002D74]'}`} onClick={handleSignIn}>Sign In</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;
