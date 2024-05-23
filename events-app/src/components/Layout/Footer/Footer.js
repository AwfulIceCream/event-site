import "../../../styles.css"

function Footer(){
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-logo">
                    <a href="#">Events Site</a>
                </div>
                <div className="footer-links">
                    <ul>
                        <li>Home</li>
                        <li>Events</li>
                        <li>About Us</li>
                        <li>Contact</li>
                    </ul>
                </div>
            </div>
            <div className="footer-info">
                <p>&copy; 2024 Events Site. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer