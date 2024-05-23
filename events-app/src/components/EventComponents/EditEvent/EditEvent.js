import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import "../../../styles.css";

function EditEvent() {
    const location = useLocation();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(location.state.event || {});

    const handleChange = (e) => {
        setEventData({...eventData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(eventData)
            const token = localStorage.getItem('access_token');
            const {description, location, title, date} = eventData;
            const response = await axios.put(`http://localhost:5000/api/v1/events/${eventData.id}`, {
                description,
                location,
                title,
                date
            }, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log(response.data);
            navigate(`/event/${eventData.id}`);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!location.state.event) {
            // Fetch the event data if it's not passed through the state
            const fetchEventData = async () => {
                const response = await axios.get(`http://localhost:5000/api/v1/events/${location.state.eventId}`);
                setEventData(response.data);
            }

            fetchEventData();
        }
    }, [location.state.event]);

    return (
        <main className="edit-event">
            <section className="edit-event-form">
                <h1>Edit Event</h1>
                <form noValidate onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Event Title</label>
                        <input type="text" id="title" name="title" required value={eventData.title}
                               onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Event Date</label>
                        <input type="date" id="date" name="date" required value={eventData.date}
                               onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Event Description</label>
                        <textarea id="description" name="description" rows="4" required value={eventData.description}
                                  onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Event Location</label>
                        <input type="text" id="location" name="location" required value={eventData.location}
                               onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" style={{marginRight: '10px'}}>Save Changes
                        </button>
                        <button type="button" className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default EditEvent
