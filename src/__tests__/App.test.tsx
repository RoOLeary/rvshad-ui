import { render, screen } from '@testing-library/react';
import { AppWrapper } from "../App.tsx";

describe('App tests', () => {
    it('should contains the heading 1', () => {
    render(<AppWrapper />);
        const heading = screen.getByText(/Hello world! I am using React/i);
        expect(heading).toBeInTheDocument()
    });
});