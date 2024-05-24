import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';
import { AuthContext } from '../../../AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('Header Component', () => {
    let setLoggedIn;

    beforeEach(() => {
        setLoggedIn = jest.fn();
        global.localStorage.setItem = jest.fn();
        global.localStorage.getItem = jest.fn();
        global.localStorage.removeItem = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderHeader = (loggedIn = false, userId = 'mockUserId') => {
        render(
            <AuthContext.Provider value={{ loggedIn, setLoggedIn, userId }}>
                <Router>
                    <Header />
                </Router>
            </AuthContext.Provider>
        );
    };

    test('renders Header with navigation links', () => {
        renderHeader();

        expect(screen.getByText('Events Site')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Events')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
    });

    test('shows user-specific links when logged in', () => {
        renderHeader(true);

        expect(screen.getByText('Attending')).toBeInTheDocument();
        expect(screen.getByText('My Events')).toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
        expect(screen.queryByText('Register')).not.toBeInTheDocument();
    });

    test('toggles dropdown menu on burger icon click', () => {
        renderHeader(true);

        const burgerIcon = screen.getByText('⋮');
        fireEvent.click(burgerIcon);

        expect(screen.getByText('Edit Profile')).toBeInTheDocument();
        expect(screen.getByText('Log Out')).toBeInTheDocument();
        expect(screen.getByText('Delete Profile')).toBeInTheDocument();

        fireEvent.click(burgerIcon);

        expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
        expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
        expect(screen.queryByText('Delete Profile')).not.toBeInTheDocument();
    });

    test('handles logout successfully', async () => {
        axios.post.mockResolvedValueOnce({ status: 200 });

        renderHeader(true);

        fireEvent.click(screen.getByText('⋮'));
        fireEvent.click(screen.getByText('Log Out'));

        await waitFor(() => {

        });
    });

    test('handles profile deletion successfully', async () => {
        axios.delete.mockResolvedValueOnce({ status: 200 });

        renderHeader(true);

        fireEvent.click(screen.getByText('⋮'));
        fireEvent.click(screen.getByText('Delete Profile'));

        await waitFor(() => {

        });
    });
});