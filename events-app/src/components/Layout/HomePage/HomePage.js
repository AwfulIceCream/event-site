import {Link} from 'react-router-dom';
import "../../../styles.css"
import { useNavigate } from 'react-router-dom';


function isLoggedIn() {
    return !!localStorage.getItem('access_token');
}

export default function HomePage() {
    const navigate = useNavigate()
    if (!isLoggedIn()) {
        navigate('/login')
    }

    return (
        <main className="home-page">
            <section className="hero-section">
                <h1 className="hero-title">Welcome to Events Site</h1>
                <p className="hero-description">Discover and join exciting events near you.</p>
                <Link to="/events" className="hero-button btn btn-primary">Explore Events</Link>
            </section>
        </main>
    )
}