import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Events from './Events'; // adjust this import path to your file structure

jest.mock('axios');
jest.spyOn(window.localStorage.__proto__, 'getItem');
window.localStorage.__proto__.getItem = jest.fn();

describe('Events', () => {
    test('renders "Upcoming Events" title', () => {
        render(
            <Router>
                <Events />
            </Router>
        );
        expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
    });

    test('fetches events from API', async () => {
        const events = [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }];
        axios.get.mockResolvedValueOnce({ data: events });

        render(
            <Router>
                <Events />
            </Router>
        );

        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    });
});
