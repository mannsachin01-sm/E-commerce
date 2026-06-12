import { useState } from 'react';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

const API_URL = import.meta.env.VITE_API_URL; // Use API URL from env variables

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const isWeakPassword = (password) => {
        const minLength = 8;
        const hasNumber = /\d/;
        const hasLetter = /[a-zA-Z]/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        return password.length < minLength || 
               !hasNumber.test(password) || 
               !hasLetter.test(password) || 
               !hasSpecialChar.test(password);
    };

    const isEmailOrPhoneProvided = () => formData.email || formData.phone;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEmailOrPhoneProvided()) {
            Swal.fire({
                icon: 'warning',
                title: 'Input Required',
                text: 'Please provide either an email or a phone number.',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (isWeakPassword(formData.password)) {
            Swal.fire({
                icon: 'warning',
                title: 'Weak Password',
                text: 'Your password must be at least 8 characters long, include numbers, letters, and special characters.',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/user/signup`, formData, {
                withCredentials: true
            });
            Swal.fire({
                icon: 'success',
                title: 'Signup Successful!',
                text: 'Your account has been created successfully. You can log in now.',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/login');
            });

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <div className="flex flex-col items-start justify-center max-w-lg w-full mx-4 sm:w-[90%] lg:w-[50%] xl:w-[40%] shadow-2xl px-6 py-10 rounded-md">
                <span className="text-3xl sm:text-4xl font-bold">Create an account</span><br />
                <span className="text-sm sm:text-base">Enter your details below</span><br />
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        className="outline-none py-2 px-3 rounded-md border border-gray-300"
                        type="text"
                        placeholder="User Name"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        autoFocus
                        required
                    />
                    <input
                        className="outline-none py-2 px-3 rounded-md border border-gray-300"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        className="outline-none py-2 px-3 rounded-md border border-gray-300"
                        type="text"
                        placeholder="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <input
                        className="outline-none py-2 px-3 rounded-md border border-gray-300"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="bg-orange-500 rounded text-white py-2 mt-4 hover:bg-orange-600">
                        Create Account
                    </button>
                </form>
                <div className="mt-4 text-sm">
                    <span>Already have an account? </span>
                    <a href="/login" className="underline text-orange-500">Log in</a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
