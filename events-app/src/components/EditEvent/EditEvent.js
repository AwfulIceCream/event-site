import "../../styles.css"

function EditEvent(props) {
    return (
                <main className="edit-event">
            <section className="edit-event-form">
                <h1>Edit Event</h1>
                <form noValidate>
                    <div className="form-group">
                        <label for="event-title">Event Title</label>
                        <input type="text" id="event-title" name="event-title" required placeholder={props.title}/>
                    </div>
                    <div className="form-group">
                        <label for="event-date">Event Date</label>
                        <input type="date" id="event-date" name="event-date" required/>
                    </div>
                    <div className="form-group">
                        <label for="event-description">Event Description</label>
                        <textarea id="event-description" name="event-description" rows="4" required></textarea>
                    </div>
                    <div className="form-group">
                        <label for="event-location">Event Location</label>
                        <input type="text" id="event-location" name="event-location" required/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                        <button type="button" className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default EditEvent