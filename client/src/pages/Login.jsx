import React, {useState} from 'react';
import '../style/Login.css';
import axios from "axios";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Welcome Back</h1>
                <form>
                    <input
                        type="email"
                        placeholder="Email address"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="login-button" type="submit">Log in</button>
                </form>
                <div className="signup-prompt">
                    No account? <a href="/register">Sign up</a>
                </div>
                <div>{message}</div>
            </div>
        </div>
    );
};

export default Login;