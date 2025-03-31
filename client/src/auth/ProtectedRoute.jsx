// src/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth.js';

const ProtectedRoute = ({ children }) => {
    const { isLogin, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return isLogin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;