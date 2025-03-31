import React, { useState } from 'react';
import '../style/Login.css';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import useAuth from '../auth/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Використовуємо відносний URL, бо baseURL встановлено в axiosInstance,
            // та з withCredentials автоматично додається у конфігурацію.
            const response = await axiosInstance.post('/auth/login', { email, password });

            // Припускаємо, що сервер повертає { accessToken: '...' }.
            login(response.data.accessToken);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Welcome Back</h1>
                <form onSubmit={handleSubmit}>
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
                {message && <div className="error-message">{message}</div>}
            </div>
        </div>
    );
};

export default Login;