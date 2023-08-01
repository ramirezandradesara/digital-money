import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorPayment from './error.page';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ErrorPayment component', () => {
  beforeAll(() => {
    let pushMock: jest.Mock;

    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn(),
      },
    });
  });
  test('renders PayServiceError component with correct props', () => {
    render(<ErrorPayment />);

    expect(
      screen.getByText('Hubo un problema con tu pago')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Puede deberse a fondos insuficientes. Comunícate con la entidad emisora de la tarjeta'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Volver a intentarlo')).toBeInTheDocument();
  });

  test('find button in error component', () => {
    render(<ErrorPayment />);

    screen.getByText('Volver a intentarlo');

  });
});
