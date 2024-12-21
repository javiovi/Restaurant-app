import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import Restaurant from '../restaurant';

describe('Restaurant Login', () => {
  it('should render the login form', () => {
    render(<Restaurant />);
    expect(screen.getByText(/Restaurant App/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Restaurant Name/i)).toBeInTheDocument();
  
    expect(screen.getByLabelText(/Waiter Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should show an error message if password is incorrect', () => {
    render(<Restaurant />);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByText(/Sign In/i);

    fireEvent.change(passwordInput, { target: { value: 'wrong-password' } });
    fireEvent.click(signInButton);

    expect(screen.getByText(/Incorrect password/i)).toBeInTheDocument();
  });

  it('should navigate to dashboard on valid login', () => {
    render(<Restaurant />);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByText(/Sign In/i);

    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.click(signInButton);

    expect(window.location.href).toContain('../dashboard.tsx');
  });
});
