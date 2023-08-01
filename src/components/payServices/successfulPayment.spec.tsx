import React from 'react';
import { render, screen } from '@testing-library/react';
import SuccessfulPayment from './SuccessfulPayment';
import { DataUser } from '../../context/UserDataContext';
import { mockedUserData } from '../../../test/mocks/userData';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SuccessfulPayment', () => {
  const setUserData = jest.fn();
  const modalFlag = false;
  const setModalFlag = jest.fn();
  
  beforeEach(() => {
    let pushMock: jest.Mock;

    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
      },
      writable: true,
    });
  });

  const customRender = () => {
    const wrapper = ({ children }: any) => (
      <DataUser.Provider
        value={{ mockedUserData, setUserData, modalFlag, setModalFlag }}
      >
        {children}
      </DataUser.Provider>
    );

    render(<SuccessfulPayment />, { wrapper });
  };

 

  test('renders successful payment message', () => {
    customRender();
    const successMessage = screen.getByText('Ya realizaste tu pago');
    expect(successMessage).toBeInTheDocument();
  });
});
