import React, { useState } from 'react';
import { RiGoogleFill } from "react-icons/ri";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { GiWarBonnet } from "react-icons/gi";
import { FaApple } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api_url } from '../Constants';
import {
    Container,
    Paper,
    Typography,
    TextField,
    IconButton,
    Button,
    InputAdornment,
    Box,
    Divider
} from '@mui/material';

const Registration = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
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

        const isValidUsername = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]+$/.test(formData.username);
        const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/.test(formData.password);
        const isNameUsedAsPassword = formData.password.toLowerCase().includes(formData.name.toLowerCase());

        if (!isValidUsername) {
            setUsernameError('Username must contain only lowercase letters, no spaces, and at least one special character and one number.');
            return;
        } else {
            setUsernameError('');
        }

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
            navigate('/');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Registration failed. Please try again.');
            } else if (error.request) {
                setError('No response from server. Please check your network connection.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    const handleSignIn = () => {
        navigate('/');
    }

    return (
        <Container maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: darkMode ? 'black' : 'grey.50', color: darkMode ? 'white' : '#002D74' }}>
            <Paper elevation={3} sx={{ p: 4, bgcolor: darkMode ? 'grey.800' : 'grey.100', width: '100%', borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box display="flex" alignItems="center" bgcolor="black" p={1} borderRadius="50%">
                        <GiWarBonnet color="white" size="24" />
                    </Box>
                    <IconButton onClick={toggleDarkMode}>
                        {darkMode ? <MdOutlineLightMode /> : <MdDarkMode />}
                    </IconButton>
                </Box>
                <Typography variant="h5" fontWeight="bold"  sx={{ color: darkMode ? '#ffffff' : '#000000' }}>Register for Storytale</Typography>
                <Typography variant="body2" mt={1}  sx={{ color: darkMode ? '#ffffff' : '#000000' }}>Grab high-class graphics and boost your design workflow</Typography>

                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2} mt={2}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            fullWidth
                            InputProps={{ style: { color: darkMode ? 'white' : 'inherit' } }}
                            sx={{ bgcolor: darkMode ? 'grey.700' : 'inherit' }}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                            InputProps={{ style: { color: darkMode ? 'white' : 'inherit' } }}
                            sx={{ bgcolor: darkMode ? 'grey.700' : 'inherit' }}
                        />
                        <TextField
                            label="Username"
                            variant="outlined"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            fullWidth
                            InputProps={{ style: { color: darkMode ? 'white' : 'inherit' } }}
                            sx={{ bgcolor: darkMode ? 'grey.700' : 'inherit' }}
                        />
                        {usernameError && <Typography color="error">{usernameError}</Typography>}
                        <TextField
                            label="Password"
                            variant="outlined"
                            name="password"
                            type={passwordVisible ? "text" : "password"}
                            value={formData.password}
                            onChange={handleInputChange}
                            fullWidth
                            InputProps={{
                                style: { color: darkMode ? 'white' : 'inherit' },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility}>
                                            {passwordVisible ? <IoEyeOff /> : <IoEye />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{ bgcolor: darkMode ? 'grey.700' : 'inherit' }}
                        />
                        {passwordError && <Typography color="error">{passwordError}</Typography>}
                        {error && <Typography color="error">{error}</Typography>}
                        <Button type="submit" variant="contained" color="success" fullWidth>Register</Button>
                    </Box>
                </form>

                {/* <Box mt={4} display="flex" alignItems="center">
                    <Divider sx={{ flexGrow: 1 }} />
                    <Typography variant="body2" sx={{ mx: 2 }}>OR authorize with</Typography>
                    <Divider sx={{ flexGrow: 1 }} />
                </Box>

                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button variant="outlined" startIcon={<RiGoogleFill />} sx={{ flexGrow: 1, mr: 1, bgcolor: darkMode ? 'grey.700' : 'white', color: darkMode ? 'white' : '#002D74' }}>Google</Button>
                    <Button variant="outlined" startIcon={<FaApple />} sx={{ flexGrow: 1, ml: 1, bgcolor: darkMode ? 'grey.700' : 'white', color: darkMode ? 'white' : '#002D74' }}>Apple</Button>
                </Box> */}

                {/* <Box mt={2} textAlign="center">
                    <Button variant="text" sx={{ color: darkMode ? '#ffffff' : '#002D74' }}>Forgot password?</Button>
                </Box> */}

                <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2"  sx={{ color: darkMode ? '#ffffff' : '#000000' }}>Already have an account?</Typography>
                    <Button variant="outlined" onClick={handleSignIn} sx={{ bgcolor: darkMode ? 'grey.700' : 'white', color: darkMode ? 'white' : '#002D74' }}>Sign In</Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Registration;
