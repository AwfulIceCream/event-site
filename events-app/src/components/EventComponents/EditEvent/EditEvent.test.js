import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditEvent from './EditEvent';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import axios from 'axios';
import { act } from 'react';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

describe('EditEvent Component', () => {
    const mockEvent = {
        id: '1',
        title: 'Sample Event',
        date: '2024-05-25',
        description: 'This is a sample event.',
        location: 'Sample Location'
    };

    beforeEach(() => {
        useLocation.mockReturnValue({ state: { event: mockEvent } });
        jest.clearAllMocks();
    });

    test('renders EditEvent form with event data', () => {
        render(
            <Router>
                <EditEvent />
            </Router>
        );

        expect(screen.getByLabelText(/event title/i)).toHaveValue(mockEvent.title);
        expect(screen.getByLabelText(/event date/i)).toHaveValue(mockEvent.date);
        expect(screen.getByLabelText(/event description/i)).toHaveValue(mockEvent.description);
        expect(screen.getByLabelText(/event location/i)).toHaveValue(mockEvent.location);
    });

    test('handles form input changes', () => {
        render(
            <Router>
                <EditEvent />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/event title/i), { target: { value: 'Updated Event' } });
        fireEvent.change(screen.getByLabelText(/event date/i), { target: { value: '2024-06-01' } });
        fireEvent.change(screen.getByLabelText(/event description/i), { target: { value: 'Updated description.' } });
        fireEvent.change(screen.getByLabelText(/event location/i), { target: { value: 'Updated Location' } });

        expect(screen.getByLabelText(/event title/i)).toHaveValue('Updated Event');
        expect(screen.getByLabelText(/event date/i)).toHaveValue('2024-06-01');
        expect(screen.getByLabelText(/event description/i)).toHaveValue('Updated description.');
        expect(screen.getByLabelText(/event location/i)).toHaveValue('Updated Location');
    });

    test('handles form submission successfully', async () => {
        axios.put.mockResolvedValueOnce({ data: { ...mockEvent, title: 'Updated Event' } });

        render(
            <Router>
                <EditEvent />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/event title/i), { target: { value: 'Updated Event' } });
        fireEvent.change(screen.getByLabelText(/event date/i), { target: { value: '2024-06-01' } });
        fireEvent.change(screen.getByLabelText(/event description/i), { target: { value: 'Updated description.' } });
        fireEvent.change(screen.getByLabelText(/event location/i), { target: { value: 'Updated Location' } });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
        });

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(
                `http://localhost:5000/api/v1/events/${mockEvent.id}`,
                {
                    title: 'Updated Event',
                    date: '2024-06-01',
                    description: 'Updated description.',
                    location: 'Updated Location'
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
            );
        });
    });

    test('handles form submission failure', async () => {
        axios.put.mockRejectedValueOnce(new Error('Event update failed'));
        console.error = jest.fn();

        render(
            <Router>
                <EditEvent />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/event title/i), { target: { value: 'Updated Event' } });
        fireEvent.change(screen.getByLabelText(/event date/i), { target: { value: '2024-06-01' } });
        fireEvent.change(screen.getByLabelText(/event description/i), { target: { value: 'Updated description.' } });
        fireEvent.change(screen.getByLabelText(/event location/i), { target: { value: 'Updated Location' } });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
        });

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(
                `http://localhost:5000/api/v1/events/${mockEvent.id}`,
                {
                    title: 'Updated Event',
                    date: '2024-06-01',
                    description: 'Updated description.',
                    location: 'Updated Location'
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
            );
            expect(console.error).toHaveBeenCalledWith(expect.any(Error));
        });
    });
});