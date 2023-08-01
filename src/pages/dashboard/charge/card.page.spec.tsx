import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataUser } from '../../../context/UserDataContext.jsx';
import { mockedUserData } from '../../../../test/mocks/userData';
import CardPage from './card.page';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Card', () => {
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

  const setUserData = jest.fn();
  const token = 'YOUR_AUTH_TOKEN';

  const customRender = () => {
    const wrapper = ({ children }: any) => (
      <DataUser.Provider value={{ mockedUserData, setUserData, token }}>
        {children}
      </DataUser.Provider>
    );

    render(<CardPage />, { wrapper });
  };

  it('renders the component', () => {
    customRender();
  });
});
