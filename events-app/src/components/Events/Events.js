import "../../styles.css"

function Events (){
    return (
        <div className="events-page">
            <h1 className="title-text"> Upcoming Events</h1>
            <ul className="events-list">
                <li className="event-card">
                    <h2 className="event-title">Event Title</h2>
                    <p className="event-details"><span>Date:</span> January 1, 2025</p>
                    <p className="event-details"><span>Location:</span> Venue Name, City</p>
                    <a href="#" className="event-link">View Details</a>
                </li>
                <li className="event-card">
                    <h2 className="event-title">Event Title</h2>
                    <p className="event-details"><span>Date:</span> January 2, 2025</p>
                    <p className="event-details"><span>Location:</span> Venue Name, City</p>
                    <a href="#" className="event-link">View Details</a>
                </li>
            </ul>
        </div>
    )
}

export default Events