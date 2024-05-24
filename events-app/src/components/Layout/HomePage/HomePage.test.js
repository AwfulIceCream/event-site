import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage'; // adjust this import path to your file structure
jest.spyOn(window.localStorage.__proto__, 'getItem');
window.localStorage.__proto__.getItem = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('HomePage', () => {
    test('renders "Welcome to Events Site" title', () => {
        window.localStorage.__proto__.getItem.mockReturnValue('mockToken');
        render(
            <Router>
                <HomePage />
            </Router>
        );
        expect(screen.getByText('Welcome to Events Site')).toBeInTheDocument();
        expect(screen.getByText('Discover and join exciting events near you.')).toBeInTheDocument();
        expect(screen.getByText('Explore Events')).toBeInTheDocument();
    });
});