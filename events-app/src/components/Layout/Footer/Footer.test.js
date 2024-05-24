import { render, screen } from '@testing-library/react';
import Footer from './Footer'; // adjust this import path to your file structure

describe('Footer', () => {
    test('renders correct footer content', () => {
        render(<Footer />);
        expect(screen.getByText('Events Site')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Events')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText('© 2024 Events Site. All rights reserved.')).toBeInTheDocument();
    });
});
