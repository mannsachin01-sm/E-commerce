/* eslint-disable react-hooks/exhaustive-deps */ 
/* eslint-disable react/prop-types */
// src/context/CartContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContextProvider';

const API_URL = import.meta.env.VITE_API_URL;

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [] });
    const { userId } = useContext(UserContext);

    const fetchCart = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/cart/${userId}`);
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchCart();
        }
    }, [userId]);

    const addToCart = async (productId) => {
        try {
            const response = await axios.post(`${API_URL}/api/cart`, { productId, userId });
            setCart(response.data);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`${API_URL}/api/cart/${userId}/item/${productId}`);
            fetchCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const increaseQuantity = async (productId) => {
        try {
            await axios.patch(`${API_URL}/api/cart/${userId}/item/${productId}/increase`);
            fetchCart();
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

    const decreaseQuantity = async (productId) => {
        try {
            await axios.patch(`${API_URL}/api/cart/${userId}/item/${productId}/decrease`);
            fetchCart();
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        }
    };

    const clearCart = async () => {
        try {
            await axios.delete(`${API_URL}/api/cart/${userId}`); // Assuming you have an API to clear the cart on the server
            setCart({ items: [] }); // Clear the cart in the frontend as well
        } catch (error) {
            console.error('Error clearing the cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
