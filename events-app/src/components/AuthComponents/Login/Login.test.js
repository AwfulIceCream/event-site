// Login.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { AuthContext } from '../../../AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('Login Component', () => {
    let setLoggedIn;
    let navigate;

    beforeEach(() => {
        setLoggedIn = jest.fn();
        navigate = jest.fn();
        global.localStorage.setItem = jest.fn();
        global.localStorage.removeItem = jest.fn();
        global.localStorage.getItem = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderLogin = () => {
        render(
            <AuthContext.Provider value={{ setLoggedIn }}>
                <Router>
                    <Login />
                </Router>
            </AuthContext.Provider>
        );
    };

    test('renders Login form', () => {
        renderLogin();

        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });
});
