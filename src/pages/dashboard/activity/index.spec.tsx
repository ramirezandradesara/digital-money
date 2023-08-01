import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataUser } from '../../../context/UserDataContext.jsx';
import { mockedUserData } from '../../../../test/mocks/userData';
import Home from './index.page';

describe('Home activity', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
      },
      writable: true,
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

    render(<Home />, { wrapper });
  };

  it('renders the component', () => {
    // render(<Home />)
  });

});
