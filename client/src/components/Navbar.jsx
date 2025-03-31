import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import "../style/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="feam">
                <NavLink to="/">FEAM</NavLink>
            </div>
            <ul className="navbar-links">
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                        NOVA
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
                        About
                    </NavLink>
                </li>
                <li>
                    {/* Використовуємо кнопку для виконання логіки логаута */}
                    <button onClick={handleLogout}>Exit</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;