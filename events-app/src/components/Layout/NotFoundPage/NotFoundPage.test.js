import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage'; // adjust this import path to your file structure

describe('NotFoundPage', () => {
    test('renders "Page not found" text', () => {
        render(<NotFoundPage />);
        const linkElement = screen.getByText(/Page not found/i);
        expect(linkElement).toBeInTheDocument();
    });
});
