import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Register from './components/Register/Register';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Events from "./components/Events/Events";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import CreateEvent from "./components/CreateEvent/CreateEvent"; // import the CreateEvent component
import { AuthContext } from './AuthContext';
import EventDetails from "./components/EventDetails/EventDetails";
import EditEvent from "./components/EditEvent/EditEvent";

function App() {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('access_token'));

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/event/:eventId" element={<EventDetails />} />
                    <Route path="/edit-event/:eventId" element={<EditEvent />} />
                    <Route path="/create-event" element={<CreateEvent />} /> {/* add this line */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;