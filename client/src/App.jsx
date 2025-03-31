// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Main from './pages/Main';
import Profile from './pages/Profile';
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar2 from "./components/Navbar2";

import "./style/App.css";

function App() {
    return (
        <BrowserRouter>
            {/* Обгортаємо все в AuthProvider, щоб мати доступ до контексту */}
            <AuthProvider>
                <div className="app-container">
                    {/* Приклад: можна зробити динамічний Navbar у залежності від isLogin */}
                    {/* Але зазвичай Navbar читає isLogin прямо з useAuth */}
                    {/* <Navbar /> або <Navbar2 /> */}
                    <Navbar />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />

                        {/* Публічні сторінки */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Приватні сторінки (захищені) */}
                        <Route path="/main" element={
                            <ProtectedRoute>
                                <Main />
                            </ProtectedRoute>
                        } />
                        <Route path="/profile" element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        } />

                        {/* 404 */}
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;