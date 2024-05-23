import React, {useState, useEffect, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import "../../../styles.css"
import {AuthContext} from "../../../AuthContext";

async function logout() {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.post('http://localhost:5000/api/v1/auth/logout', {}, {
            headers: {Authorization: `Bearer ${token}`}
        });

        if (response.status === 200) {
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_id');
            console.log('Logged out successfully!');
        }
    } catch (error) {
        console.error(error);
    }
}

function Header() {
    const {loggedIn, setLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate()
    const handleLogout = async () => {
        await logout();
        setLoggedIn(false);
        navigate('/login')
    }

    return (
        <header>
            <div className="logo">
                <Link to="/">Events Site</Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/events">Events</Link></li>
                    {!loggedIn && <li><Link to="/login">Login</Link></li>}
                    {!loggedIn && <li><Link to="/register">Register</Link></li>}
                </ul>
            </nav>
            {loggedIn && <button className="logout-button" onClick={handleLogout}>Logout</button>}
        </header>
    );
}

export default Header;