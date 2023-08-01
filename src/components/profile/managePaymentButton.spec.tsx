import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ManagePaymentButton from './ManagePaymentButton';

describe('ManagePaymentButton', () => {
  test('renders the button with the correct text', () => {
    render(<ManagePaymentButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Gestioná los medios de pago');
  });

  test('navigates to the correct link when clicked', () => {
    render(<ManagePaymentButton />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(window.location.href).toBe("http://localhost/");
  });
});
