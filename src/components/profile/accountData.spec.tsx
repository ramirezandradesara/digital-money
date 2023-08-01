import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountData from './AccountData';
import { DataUser } from '../../context/UserDataContext.jsx';
import {
  userData,
} from "../../mocks/contextData";

describe('AccountData', () => {
 
  const customRender = () => {
    const wrapper = ({ children }: any) => (
      <DataUser.Provider value={{ userData }}>{children}</DataUser.Provider>
    );

    render(<AccountData />, { wrapper });
  };

  it('should render the component', () => {
    customRender();
    expect(
      screen.getByText(
        'Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta'
      )
    ).toBeInTheDocument();
  });

  it('should render user account data', () => {
    customRender();
    expect(screen.getByText('CVU')).toBeInTheDocument();
    expect(screen.getByText('12345678123456781234')).toBeInTheDocument();
    expect(screen.getByText('Alias')).toBeInTheDocument();
    expect(screen.getByText('ALIAS.ALIAS.ALIAS')).toBeInTheDocument();
  });
});
