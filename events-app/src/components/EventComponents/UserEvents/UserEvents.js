import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import "../../../styles.css";
import EventCard from "../EventCard/EventCard";

function UserEvents() {
    const [events, setEvents] = useState([]);
    const userId=localStorage.getItem('user_id')
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`http://localhost:5000/api/v1/users/${userId}/events_attending`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchEvents();
    }, [userId]);

    return (
        <div>
            <h1 className='user-events-title'>Events I`m attending</h1>
            <ul className="events-list">
                {events.map(event => <EventCard key={event.id} event={event}/>)}
            </ul>
        </div>
    );
}

export default UserEvents;
