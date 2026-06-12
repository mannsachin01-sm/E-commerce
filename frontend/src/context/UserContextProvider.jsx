/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const userId = localStorage.getItem("userId");

    // Function to fetch user data by ID
    const fetchUserById = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/user/${userId}`);
            setUser(response.data); // Set user data into state
        } catch (err) {
            console.error("Failed to fetch user data:", err.response?.data?.message || err.message);
        }
    };

    // Fetch user data when userId exists in localStorage
    useEffect(() => {
        if (userId) {
            fetchUserById(); // Fetch user data by ID
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem('userId', userData._id);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem('userId');
    };

    return (
        <UserContext.Provider value={{fetchUserById, user, userId, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
