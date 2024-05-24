import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import Register from './Register';
import {AuthContext} from '../../../AuthContext';
import {BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('Register Component',()=>
{
    let setLoggedIn;

    beforeEach(() => {
        setLoggedIn = jest.fn();
        global.localStorage.setItem = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders Register form', () => {
        render(
            <AuthContext.Provider value={{setLoggedIn}}>
                <Router>
                    <Register/>
                </Router>
            </AuthContext.Provider>
        );

        const registerHeaders = screen.getAllByText(/Register/i);
        expect(registerHeaders.length).toBeGreaterThan(0);
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });

    test('handles form submission successfully', async () => {
        axios.post.mockResolvedValueOnce({
            data: {
                refresh_token: 'mockRefreshToken',
                access_token: 'mockAccessToken',
                user_id: 'mockUserId',
            },
        });
    });
    render(
        <AuthContext.Provider value={{setLoggedIn}}>
            <Router>
                <Register/>
            </Router>
        </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {target: {value: 'testuser'}});
    fireEvent.change(screen.getByLabelText(/Email/i), {target: {value: 'testuser@example.com'}});
    fireEvent.change(screen.getByLabelText(/Password/i), {target: {value: 'password'}});
    fireEvent.click(screen.getByRole('button', {name: /Register/i}));

    waitFor(() => {
        expect(global.localStorage.setItem).toHaveBeenCalledWith('refresh_token', 'mockRefreshToken');
        expect(global.localStorage.setItem).toHaveBeenCalledWith('access_token', 'mockAccessToken');
        expect(global.localStorage.setItem).toHaveBeenCalledWith('user_id', 'mockUserId');
    });

    test('handles form submission failure', async () => {
        axios.post.mockRejectedValueOnce(new Error('Registration failed'));
        render(
            <AuthContext.Provider value={{setLoggedIn}}>
                <Router>
                    <Register/>
                </Router>
            </AuthContext.Provider>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), {target: {value: 'testuser'}});
        fireEvent.change(screen.getByLabelText(/Email/i), {target: {value: 'testuser@example.com'}});
        fireEvent.change(screen.getByLabelText(/Password/i), {target: {value: 'password'}});
        fireEvent.click(screen.getByRole('button', {name: /Register/i}));

        await waitFor(() => {
            expect(screen.getByText('Registration failed: Check your credentials')).toBeInTheDocument();
        });
    });
});