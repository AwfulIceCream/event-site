import { Link } from 'react-router-dom';
import "../../../styles.css"

function EventCard ({event}){
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <li className="event-card">
            <h2 className="event-title">{event.title}</h2>
            <p className="event-details"><span>Date: </span>{formattedDate}</p>
            <p className="event-details"><span>Location: </span>{event.location}</p>
            <Link to={`/event/${event.id}`} className="event-link">View Details</Link>
        </li>
    )
}

export default EventCard;