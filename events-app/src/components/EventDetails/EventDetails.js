import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import "../../styles.css";

export default function EventDetails() {
    const {eventId} = useParams();
    const [event, setEvent] = useState({});
    const [isAttending, setIsAttending] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef();

    const currentUserId = parseInt(localStorage.getItem('user_id'), 10);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/events/${eventId}`);
                setEvent(response.data);

                const attendeesResponse = await axios.get(`http://localhost:5000/api/v1/events/${eventId}/attendees`);
                setIsAttending(attendeesResponse.data.some(user => user.id === currentUserId));
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchEvent();
    }, [eventId, currentUserId]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                const menu = document.getElementById('event-menu');
                menu.style.display = 'none';
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`http://localhost:5000/api/v1/events/${eventId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            navigate('/events');
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleEdit = () => {
        navigate(`/edit-event/${eventId}`, {state: {event}});
    };

    const handleToggleAttendance = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (isAttending) {
                await axios.delete(`http://localhost:5000/api/v1/events/${eventId}/attend/${currentUserId}`, {
                    headers: {Authorization: `Bearer ${token}`}
                });
            } else {
                await axios.post(`http://localhost:5000/api/v1/events/${eventId}/attend/${currentUserId}`, {}, {
                    headers: {Authorization: `Bearer ${token}`}
                });
            }
            setIsAttending(!isAttending);
        } catch (error) {
            console.error('Error toggling attendance:', error);
        }
    };

    const toggleMenu = () => {
        const menu = document.getElementById('event-menu');
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    };

    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <main className="event-details">
            <section>
                <div className="event-actions">
                    {currentUserId === event.creator_id && (
                        <>
                            <button className="menu-button" onClick={toggleMenu}>⋮</button>
                            <div id="event-menu" className="menu" ref={menuRef}>
                                <div className="menu-item" onClick={handleEdit}>Edit Event</div>
                                <div className="menu-item" onClick={handleDelete}>Delete Event</div>
                            </div>
                        </>
                    )}
                </div>
                <h1>{event.title}</h1>
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Pricing:</strong> Free</p>
                {currentUserId !== event.creator_id && (
                    <button className={isAttending ? "stop-attend-button" : "attend-button"}
                            onClick={handleToggleAttendance}>
                        {isAttending ? "Do Not Attend" : "Attend"}
                    </button>
                )}
            </section>
        </main>
    );
}