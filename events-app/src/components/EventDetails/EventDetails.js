import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState, useRef} from 'react'; // import useRef
import axios from 'axios';
import "../../styles.css";

export default function EventDetails() {
    const {eventId} = useParams();
    const [event, setEvent] = useState({});
    const navigate = useNavigate();
    const menuRef = useRef(); // create a ref for the menu

    // Retrieve user ID from local storage
    const currentUserId = parseInt(localStorage.getItem('user_id'), 10); // Ensure the ID is a number

    useEffect(() => {
        // Fetch the event details
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/events/${eventId}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchEvent();
    }, [eventId]);

    useEffect(() => {
        // Add event listener for clicks outside of the menu
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                const menu = document.getElementById('event-menu');
                menu.style.display = 'none';
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener on unmount
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
            navigate('/events'); // Redirect to events list after deletion
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleEdit = () => {
        navigate(`/edit-event/${eventId}`); // Redirect to the edit event page
    };

    const handleAttend = async () => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.post(`http://localhost:5000/api/v1/events/${eventId}/attend/${currentUserId}`, {}, {
                headers: {Authorization: `Bearer ${token}`}
            });
            alert('You are now attending this event!');
        } catch (error) {
            console.error('Error attending event:', error);
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
                    <button className="attend-button" onClick={handleAttend}>Attend</button>
                )}
            </section>
        </main>
    );
}