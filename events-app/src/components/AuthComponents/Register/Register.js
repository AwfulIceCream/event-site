// Register.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../../styles.css"
import { AuthContext } from "../../../AuthContext";

async function register(name, email, password) {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
            name,
            email,
            password
        });

        const { data } = response;
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_id', data.user_id);

        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function Register() {
    const { setLoggedIn } = useContext(AuthContext);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await register(form.name, form.email, form.password);
            if (result) {
                setLoggedIn(true);
                navigate('/events');
            }
        } catch (error) {
            setError('Registration failed: Check your credentials');
        }
    };

    return (
        <main className="register-page">
            <div className="register-form">
                <h2>Register</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Username</label>
                        <input type="text" id="name" name="name" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </main>
    );
}

export default Register;