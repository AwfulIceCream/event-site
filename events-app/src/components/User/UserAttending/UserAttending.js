import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import "../../../styles.css";
import EventCard from "../../EventComponents/EventCard/EventCard";

function UserAttending() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`http://localhost:5000/api/v1/users/events_attending`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchEvents();
    },);

    return (
        <div>
            <h1 className='user-events-title'>Events I`m attending</h1>
            <ul className="events-list">
                {events.map(event => <EventCard key={event.id} event={event}/>)}
            </ul>
        </div>
    );
}

export default UserAttending;
