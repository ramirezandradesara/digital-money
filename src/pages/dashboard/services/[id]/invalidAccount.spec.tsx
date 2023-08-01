import React from 'react';
import { render, screen } from '@testing-library/react';
import InvalidAccount from './invalidAccount.page';

describe('InvalidAccount component', () => {
  test('renders InvalidAccount component with correct props', () => {
    render(<InvalidAccount />);
    expect(screen.getByText('No encontramos facturas asociadas a este dato')).toBeInTheDocument();
    expect(screen.getByText('Revisá el dato ingresado. Si es correcto, es posible que la empresa aún no haya cargado tu factura.')).toBeInTheDocument();
    expect(screen.getByText('Revisar dato')).toBeInTheDocument();
  });

  test('calls handleClick when button is clicked', () => {
    render(<InvalidAccount />);

    const reviseButton = screen.getByText('Revisar dato');

  });
});
