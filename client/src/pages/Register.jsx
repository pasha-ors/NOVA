import React, { useState } from 'react';
import '../style/Register.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import useAuth from '../auth/useAuth';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage]   = useState(null);
    const navigate              = useNavigate();
    const { login }             = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Використовуємо відносний URL, бо baseURL встановлено в axiosInstance
            const response = await axiosInstance.post('/auth/register', { username, email, password });
            // Припускаємо, що сервер повертає { accessToken: '...' }
            login(response.data.accessToken);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage('Unexpected error occurred.');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h1>Create an Account</h1>
                <form onSubmit={handleSubmit}>
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
                    <button className="register-button" type="submit">
                        Sign up
                    </button>
                </form>
                {message && <div className="error-message">{message}</div>}
            </div>
        </div>
    );
};

export default Register;