import React from 'react';
import {NavLink} from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    return (
            <nav className="navbar">
                <div className="feam">FEAM</div>
                <ul className="navbar-links">
                    <li><NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>NOVA</NavLink></li>
                    <li><NavLink to="/api" className={({isActive}) => isActive ? "active" : ""}>API</NavLink></li>
                    <li><NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>About</NavLink></li>
                </ul>
            </nav>
    );
};

export default Navbar;