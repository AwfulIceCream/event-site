import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../../AuthContext';
import "../../../styles.css";

function UserEdit() {
    const navigate = useNavigate();
    const {setLoggedIn} = useContext(AuthContext);
    const [user, setUser] = useState({
        name: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`http://localhost:5000/api/v1/users/`, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setUser({'email': response.data.email, 'name': response.data.name});
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch user data.');
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(user)
            const token = localStorage.getItem('access_token');
            await axios.put(`http://localhost:5000/api/v1/users/`, user, {
                headers: {Authorization: `Bearer ${token}`}
            });
            navigate('/events');
        } catch (error) {
            setError('Failed to update user profile.');
        }
    };

    const handleDeleteProfile = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const userId = localStorage.getItem('user_id')
            await axios.delete(`http://localhost:5000/api/v1/users/${userId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_id');
            setLoggedIn(false);
            navigate('/register');
            console.log('Profile deleted successfully!');
        } catch (error) {
            console.error('Failed to delete profile:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="user-edit-container">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="save-button">Save</button>
            </form>
            <button onClick={handleDeleteProfile} className="delete-button">Delete Profile</button>
        </div>
    );
}

export default UserEdit;