jest.mock('axios');
jest.spyOn(window.localStorage.__proto__, 'getItem');
window.localStorage.__proto__.getItem = jest.fn();

import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import UserEvents from './UserEvents'; // adjust this import path to your file structure

describe('UserEvents', () => {
    test('renders "My Events" title', () => {
        window.localStorage.__proto__.getItem.mockReturnValue('mockToken');
        render(
            <Router>
                <UserEvents />
            </Router>
        );
        expect(screen.getByText("My Events")).toBeInTheDocument();
    });

    test('fetches events from API', async () => {
        const events = [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }];
        axios.get.mockResolvedValueOnce({ data: events });

        render(
            <Router>
                <UserEvents />
            </Router>
        );
    });
});
