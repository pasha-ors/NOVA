import React, {useState} from 'react';
import '../style/Login.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Login = ({onLogin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            onLogin(response.data);
            navigate('/');
        } catch (error) {
            setMessage(error.response.data.error);
        }
    }

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
                <div>{message}</div>
            </div>
        </div>
    );
};

export default Login;