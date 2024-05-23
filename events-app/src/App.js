import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Layout/HomePage/HomePage';
import Register from './components/AuthComponents/Register/Register';
import NotFoundPage from './components/Layout/NotFoundPage/NotFoundPage';
import Events from "./components/EventComponents/Events/Events";
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import Login from "./components/AuthComponents/Login/Login";
import CreateEvent from "./components/EventComponents/CreateEvent/CreateEvent"; // import the CreateEvent component
import { AuthContext } from './AuthContext';
import EventDetails from "./components/EventComponents/EventDetails/EventDetails";
import EditEvent from "./components/EventComponents/EditEvent/EditEvent";

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