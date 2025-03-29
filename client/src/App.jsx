import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Main from './pages/Main';
import Profile from './pages/Profile';
import NotFound from "./pages/NotFound.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar2 from "./components/Navbar2.jsx";

import "./style/App.css";

function App() {

    const [isLogin, setIsLogin] = React.useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setIsLogin(true);
        }
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem("accessToken", token.accessToken);
        localStorage.setItem("refreshToken", token.refreshToken);
        setIsLogin(true);
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLogin(false);
    }

    return (
        <BrowserRouter>
            <div className="app-container">
                {isLogin ? <Navbar onLogout={handleLogout}/> : <Navbar2/>}
                <Routes>
                    <Route path="/" element={<Home isLogin={isLogin} />} />
                    <Route path="/about" element={<About />} />
                        {
                        isLogin ? (
                                    <>
                                        <Route path="/main" element={<Main />} />
                                        <Route path="/profile" element={<Profile />} />
                                    </>
                            ) : (
                                    <>
                                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                                        <Route path="/register" element={<Register onLogin={handleLogin} />} />
                                    </>
                        )}
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;