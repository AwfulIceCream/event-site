import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EventDetails from './EventDetails';
import axios from 'axios';

// Mock Axios
jest.mock('axios');

describe('EventDetails Component', () => {
    // Sample event data
    const mockEvent = {
        id: '1',
        title: 'Sample Event',
        date: '2024-05-25T00:00:00.000Z',
        location: 'Sample Location',
        description: 'Sample Description',
        creator_id: 1 // Assuming user ID 1 is the creator
    };

    // Sample current user ID
    const currentUserId = '1';

    // Mock localStorage getItem
    const mockGetItem = jest.fn();
    global.localStorage.getItem = mockGetItem;
    mockGetItem.mockReturnValue(currentUserId);

    test('renders event details correctly', async () => {
        // Mock successful Axios GET requests
        axios.get.mockResolvedValueOnce({ data: mockEvent });
        axios.get.mockResolvedValueOnce({ data: { is_attending: false } });

        render(
            <Router>
                <EventDetails />
            </Router>
        );

        // Wait for Axios requests to resolve
        await waitFor(() => {
            expect(screen.getByText('Sample Event')).toBeInTheDocument();
            expect(screen.getByText('Description:')).toBeInTheDocument();
            expect(screen.getByText('Location:')).toBeInTheDocument();
            expect(screen.getByText('Pricing:')).toBeInTheDocument();
            expect(screen.getByText('Attend')).toBeInTheDocument();
        });
    });

    test('handles event deletion correctly', async () => {
        // Mock successful Axios DELETE request
        axios.delete.mockResolvedValueOnce();

        render(
            <Router>
                <EventDetails />
            </Router>
        );

        await waitFor(() => {
            });
        });
});
