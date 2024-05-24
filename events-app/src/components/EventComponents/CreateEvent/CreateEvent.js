import axios from 'axios';
import {useState} from 'react';
import "../../../styles.css"
import {useNavigate} from "react-router-dom";

export default function CreateEvent(props) {
    const navigate = useNavigate()

    const [event, setEvent] = useState({
        title: '',
        date: new Date(),
        description: '',
        location: ''
    });

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    }

    const handleChangeDate = (e) => {
        setEvent({
            ...event,
            [e.target.name]: new Date(e.target.value).toISOString()
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        axios.post('http://localhost:5000/api/v1/events', event, {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                navigate('/events')
            })
            .catch(error => {
                console.error('Error:', error);
                // handle error
            });
    }
    return (
        <main className="create-event">
            <section className="create-event">
                <h1>Create New Event</h1>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="title">Event Title</label>
                        <input type="text" id="title" name="title" required onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Event Date</label>
                        <input type="date" id="date" name="date" required onChange={handleChangeDate}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Event Description</label>
                        <textarea id="description" name="description" rows="4" required
                                  onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Event Location</label>
                        <input type="text" id="location" name="location" required onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Create Event</button>
                    </div>
                </form>
            </section>
        </main>
    )
}