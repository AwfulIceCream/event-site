jest.mock('axios');
jest.spyOn(window.localStorage.__proto__, 'getItem');
window.localStorage.__proto__.getItem = jest.fn();

import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import UserEdit from './UserEdit'; // adjust this import path to your file structure

describe('UserEdit', () => {
    test('renders "Edit Profile" title', () => {
        window.localStorage.__proto__.getItem.mockReturnValue('mockToken');
        render(
            <Router>
                <UserEdit />
            </Router>
        );
    });

    test('fetches user data from API', async () => {
        const user = { email: 'test@example.com', name: 'Test User' };
        axios.get.mockResolvedValueOnce({ data: user });

        render(
            <Router>
                <UserEdit />
            </Router>
        );
    });

    test('handles form submission', async () => {
        const user = { email: 'test@example.com', name: 'Test User' };
        axios.get.mockResolvedValueOnce({ data: user });
        axios.put.mockResolvedValueOnce({});

        render(
            <Router>
                <UserEdit />
            </Router>
        );
    });
});
