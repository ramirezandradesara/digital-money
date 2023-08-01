import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PersonalData from './PersonalData';
import { DataUser } from '../../context/UserDataContext.jsx';

describe('PersonalData', () => {
  const userData = {
    email: 'test@gmail.com',
    firstname: 'John',
    lastname: 'Doe',
    dni: '12345678',
    phone: '12345678',
  };

  const setUserData = jest.fn();
  const token = 'your-auth-token';

  beforeEach(() => {
    render(
      <DataUser.Provider value={{ userData, setUserData, token }}>
        <PersonalData />
      </DataUser.Provider>
    );
  });

  it('renders user data correctly', () => {
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('test@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Apellido')).toBeInTheDocument();
    expect(screen.getByText('CUIT')).toBeInTheDocument();
    expect(screen.getByText('Teléfono')).toBeInTheDocument();
  });

  it('displays edit fields on click', () => {
    const editButton = screen.getByTestId('edit-icon-lastname');
    fireEvent.click(editButton);
    const lastnameInput = screen.getByTestId(
      'editing-input'
    ) as HTMLInputElement;
    expect(lastnameInput).toBeInTheDocument();
  });
});
