import React, {useContext, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import "../../../styles.css"
import {AuthContext} from "../../../AuthContext";

async function login(email, password) {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
            email,
            password
        });

        const { data } = response;
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_id', data.user_id);
        console.log(data)
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

function Login() {
    const { setLoggedIn } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await login(formData.email, formData.password);
        if (result) {
            setLoggedIn(true);
            navigate('/events');
        } else {
            console.log('Login failed: Check your credentials');
        }
    }

    return (
        <main className="login-page">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={handleInputChange} type="text" id="email" name="email" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={handleInputChange} type="password" id="password" name="password" required/>
                    </div>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </main>
    );
}

export default Login;