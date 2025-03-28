import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

    const [isLogin, setIsLogin] = React.useState(true);

    return (
        <BrowserRouter>
            <div className="app-container">
                {
                    isLogin ?
                            <>
                                <Navbar/>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/main" element={<Main />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/*" element={<NotFound />} />
                                </Routes>
                            </>
                        :
                            <>
                                <Navbar2/>
                                <Routes>
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/*" element={<NotFound />} />
                                </Routes>
                            </>
                }
            </div>
        </BrowserRouter>
    );
}

export default App;