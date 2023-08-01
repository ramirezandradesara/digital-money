import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountItem from './AccountItem';
import { DataUser } from '../../context/UserDataContext.jsx';
import { mockedUserData } from '../../../test/mocks/userData';

describe('AccountItem', () => {
  beforeAll(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn(),
      },
    });
  });

  const setUserData = jest.fn();
  const token = 'YOUR_AUTH_TOKEN';

  const customRender = (title: string, value: string) => {
    const wrapper = ({ children }: any) => (
      <DataUser.Provider value={{ mockedUserData, setUserData, token }}>
        {children}
      </DataUser.Provider>
    );

    render(<AccountItem title={title} value={value} />, { wrapper });
  };

  it('should render the component', () => {
    customRender('CVU', '12345678123456781234');
    expect(screen.getByText('CVU')).toBeInTheDocument();
    expect(screen.getByText('12345678123456781234')).toBeInTheDocument();
  });

  it('should handle editing alias', () => {
    customRender('Alias', 'GATO.PERRO.CASA');
    expect(screen.getByText('Alias')).toBeInTheDocument();
    expect(screen.getByText('GATO.PERRO.CASA')).toBeInTheDocument();
  });

  it('should display error for invalid alias format', () => {
    customRender('Alias', 'ALIAS.ALIAS.ALIAS');

  });
});
