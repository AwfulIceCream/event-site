import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateEvent from './CreateEvent';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { act } from 'react';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('CreateEvent Component', () => {
    const navigate = jest.fn();

    beforeEach(() => {
        useNavigate.mockReturnValue(navigate);
        jest.clearAllMocks();
    });

    test('renders CreateEvent form', () => {
        render(
            <Router>
                <CreateEvent />
            </Router>
        );

        expect(screen.getByLabelText(/event title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/event date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/event description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/event location/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create event/i })).toBeInTheDocument();
    });

    test('handles form submission successfully', async () => {
        axios.post.mockResolvedValueOnce({ data: { id: 'mockEventId' } });

        render(
            <Router>
                <CreateEvent />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/event title/i), { target: { value: 'Test Event' } });
        fireEvent.change(screen.getByLabelText(/event date/i), { target: { value: '2024-05-25' } });
        fireEvent.change(screen.getByLabelText(/event description/i), { target: { value: 'This is a test event.' } });
        fireEvent.change(screen.getByLabelText(/event location/i), { target: { value: 'Test Location' } });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /create event/i }));
        });

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:5000/api/v1/events',
                {
                    title: 'Test Event',
                    date: new Date('2024-05-25').toISOString(),
                    description: 'This is a test event.',
                    location: 'Test Location',
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
            );
            expect(navigate).toHaveBeenCalledWith('/events');
        });
    });

    test('handles form submission failure', async () => {
        axios.post.mockRejectedValueOnce(new Error('Event creation failed'));
        console.error = jest.fn();

        render(
            <Router>
                <CreateEvent />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/event title/i), { target: { value: 'Test Event' } });
        fireEvent.change(screen.getByLabelText(/event date/i), { target: { value: '2024-05-25' } });
        fireEvent.change(screen.getByLabelText(/event description/i), { target: { value: 'This is a test event.' } });
        fireEvent.change(screen.getByLabelText(/event location/i), { target: { value: 'Test Location' } });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /create event/i }));
        });

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:5000/api/v1/events',
                {
                    title: 'Test Event',
                    date: new Date('2024-05-25').toISOString(),
                    description: 'This is a test event.',
                    location: 'Test Location',
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
            );
            expect(navigate).not.toHaveBeenCalled();
            expect(console.error).toHaveBeenCalledWith('Error:', expect.any(Error));
        });
    });
});