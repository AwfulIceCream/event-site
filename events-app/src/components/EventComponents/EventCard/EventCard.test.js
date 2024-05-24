import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EventCard from './EventCard';
import React from 'react';

describe('EventCard Component', () => {
    const mockEvent = {
        id: '1',
        title: 'Sample Event',
        date: '2024-05-25T00:00:00.000Z',
        location: 'Sample Location'
    };

    test('renders event details correctly', () => {
        render(
            <Router>
                <EventCard event={mockEvent} />
            </Router>
        );

        expect(screen.getByText('Sample Event')).toBeInTheDocument();
        expect(screen.getByText('View Details')).toBeInTheDocument();
    });

    test('renders the correct link', () => {
        render(
            <Router>
                <EventCard event={mockEvent} />
            </Router>
        );

        const linkElement = screen.getByText('View Details');
        expect(linkElement).toHaveAttribute('href', '/event/1');
    });
});