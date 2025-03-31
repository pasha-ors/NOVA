// src/auth/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Перевірити чи є accessToken або оновити через refresh_token
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                setIsLogin(true);
                setLoading(false);
            } else {
                try {
                    const res = await axios.get('http://localhost:5000/api/auth/refresh_token', {
                        withCredentials: true
                    });
                    if (res.data.accessToken) {
                        localStorage.setItem('accessToken', res.data.accessToken);
                        setIsLogin(true);
                    } else {
                        setIsLogin(false);
                    }
                } catch (err) {
                    setIsLogin(false);
                }
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Викликається при успішному логіні
    const login = (accessToken) => {
        localStorage.setItem('accessToken', accessToken);
        setIsLogin(true);
    };

    // Викликається при логауті
    const logout = async () => {
        try {
            await axios.delete('http://localhost:5000/api/auth/refresh_token', {
                withCredentials: true,
            });
        } catch (err) {
            console.error('Logout failed:', err);
        } finally {
            localStorage.removeItem('accessToken');
            setIsLogin(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isLogin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};