import React, {useState} from 'react';
import '../style/Register.css';
import axios from "axios";


const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    return (
        <div className="register-container">
            <div className="register-box">
                <h1>Create an Account</h1>
                <form>
                    <input
                        type="text"
                        placeholder="Username"
                        className="register-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email address"
                        className="register-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="register-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="register-button" type="submit">Sign up</button>
                </form>
                <div>{message}</div>
            </div>
        </div>
    );
};

export default Register;