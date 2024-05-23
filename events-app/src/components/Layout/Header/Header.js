import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../../styles.css";
import { AuthContext } from "../../../AuthContext";

async function logout() {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.post('http://localhost:5000/api/v1/auth/logout', {}, {
            headers: { Authorization: `Bearer ${token}` }
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
    const { loggedIn, setLoggedIn, userId } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    const handleLogout = async () => {
        await logout();
        setLoggedIn(false);
        navigate('/login');
    };

    const handleDeleteProfile = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.delete(`http://localhost:5000/api/v1/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_id');
                setLoggedIn(false);
                navigate('/register');
                console.log('Profile deleted successfully!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <header>
            <div className="logo">
                <Link to="/">Events Site</Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/events">Events</Link></li>
                    {loggedIn && <li><Link to={`/users/attending`}>Attending</Link></li>}
                    {loggedIn && <li><Link to={`/users/created`}>My Events</Link></li>}
                    {!loggedIn && <li><Link to="/login">Login</Link></li>}
                    {!loggedIn && <li><Link to="/register">Register</Link></li>}
                </ul>
            </nav>
            {loggedIn && (
                <div className="burger-menu" ref={menuRef}>
                    <div className="burger-icon" onClick={toggleMenu}>⋮</div>
                    {menuOpen && (
                        <div className="dropdown-menu">
                            <Link to={`/users/edit`}>Edit Profile</Link>
                            <button onClick={handleLogout}>Log Out</button>
                            <button onClick={handleDeleteProfile}>Delete Profile</button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;