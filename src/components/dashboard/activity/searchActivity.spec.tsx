import { render, screen, fireEvent } from '@testing-library/react';
import SearchActivity from './SearchActivity';
import React from 'react';
import { DataUser } from '../../../context/UserDataContext';
import { mockedUserData } from '../../../../test/mocks/userData';
import Activity from './Activity';
import userEvent from '@testing-library/user-event';

describe('SearchActivity', () => {
  const setUserData = jest.fn();
  const modalFlag = false;
  const setModalFlag = jest.fn();
  const setSearchValue = jest.fn();
  const searchValue = '';

  const customRender = () => {
    const wrapper = ({ children }: any) => (
      <DataUser.Provider
        value={{ mockedUserData, setUserData, modalFlag, setModalFlag }}
      >
        {children}
      </DataUser.Provider>
    );

    render(
      <SearchActivity
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        placeholder='Buscar en tu actividad'
      />,
      { wrapper }
    );
  };
  it('should allow completing the search input field', () => {
  customRender()

    const inputElement = screen.getByTestId('search-input');
    expect(inputElement).toBeInTheDocument();

    const typedValue = 'example search';
    userEvent.type(inputElement, typedValue);

    expect(setSearchValue).toHaveBeenCalledTimes(0);
  });
});
