import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import "../../styles.css"
import EventCard from "../EventCard/EventCard";

function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://localhost:5000/api/v1/events', {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setEvents(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="events-page">
            <div className="title-container">
                <h1 className="title-text">Upcoming Events</h1>
                <div className="button-container">
                    <Link to="/create-event" className="btn btn-primary">Create New Event</Link>
                </div>
            </div>
            <ul className="events-list">
                {events.map(event => <EventCard key={event.id} event={event}/>)}
            </ul>
        </div>
    );

}

export default Events;
