import {render, screen, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';
import UserAttending from './UserAttending';

jest.mock('axios');
jest.spyOn(window.localStorage.__proto__, 'getItem');
window.localStorage.__proto__.getItem = jest.fn();

describe('UserAttending', () => {
    test('renders "Events I`m attending" title', () => {
        window.localStorage.__proto__.getItem.mockReturnValue('mockToken');
        render(
            <Router>
                <UserAttending/>
            </Router>
        );
        expect(screen.getByText("Events I`m attending")).toBeInTheDocument();
    });

    test('fetches events from API', async () => {
        const events = [{id: 1, name: 'Event 1'}, {id: 2, name: 'Event 2'}];
        axios.get.mockResolvedValueOnce({data: events});

        render(
            <Router>
                <UserAttending/>
            </Router>
        );

    });
})
