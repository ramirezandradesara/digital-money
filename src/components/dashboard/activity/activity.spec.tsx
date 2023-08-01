import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataUser } from '../../../context/UserDataContext';
import Activity from './Activity';
import { mockedUserData } from '../../../../test/mocks/userData';

describe('Activity', () => {
  const setUserData = jest.fn();
  const modalFlag = false;
  const setModalFlag = jest.fn();

  const customRender = () => {
    const wrapper = ({ children }:any) => (
      <DataUser.Provider
      value={{ mockedUserData, setUserData, modalFlag, setModalFlag }}
    >
      {children}
    </DataUser.Provider>
    );

    render(<Activity />, { wrapper });
  };

  it('should display loader', async () => {
    customRender();

    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
  });

});
