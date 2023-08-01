import React from 'react';
import { render } from '@testing-library/react';
import { DataUser } from '@/context/UserDataContext';
import { mockedUserData } from '../../test/mocks/userData';
import { useRouter } from 'next/router';
import Register from './register.page';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ServiceById component', () => {
  const setUserData = jest.fn();
  const modalFlag = false;
  const setModalFlag = jest.fn();
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
  const customRender = () => {
    const wrapper = ({ children }: any) => (
      <DataUser.Provider
        value={{
          userData: mockedUserData,
          setUserData,
          modalFlag,
          setModalFlag,
        }}
      >
        {children}
      </DataUser.Provider>
    );

    render(<Register />, { wrapper });
  };

  test('renders AccountNumber component', () => {
    customRender();
  });
});
