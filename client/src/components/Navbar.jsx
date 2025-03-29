import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import "../style/Navbar.css"

const Navbar = ({onLogout}) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        onLogout();
        navigate('login');
    }

    return (
            <nav className="navbar">
                <div className="feam"><a href="/">FEAM</a></div>
                <ul className="navbar-links">
                    <li><NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>NOVA</NavLink></li>
                    <li><NavLink to="/profile" className={({isActive}) => isActive ? "active" : ""}>Profile</NavLink>
                    </li>
                    <li><NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>About</NavLink></li>
                    <li>
                        <button onClick={handleLogout} className="logout-button">Exit</button>
                    </li>
                </ul>
            </nav>
    );
};

export default Navbar;