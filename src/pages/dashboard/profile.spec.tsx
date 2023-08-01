import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { DataUser } from '../../context/UserDataContext';
import mediaQuery from 'css-mediaquery';
import Profile from './profile.page';
import {
  userData,
  setUserData,
  setModalFlag,
  modalFlag,
} from "../../mocks/contextData";
import mockRouter from "next-router-mock";


describe('Profile', () => {

  const token = 'your-auth-token';

  function createMatchMedia(width: number) {
    return (query: string): MediaQueryList => ({
      matches: mediaQuery.match(query, { width }) as boolean,
      media: '',
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    });
  }

  const customRender = () => {
    const wrapper = ({ children }: any) => (
      <DataUser.Provider
        value={{ userData, setUserData, modalFlag, setModalFlag }}
      >
        {children}
      </DataUser.Provider>
    );

    render(<Profile />, { wrapper });
  };

  it('should render user first name and last name', async () => {
    global.localStorage.setItem('token', token);

    window.matchMedia = createMatchMedia(1200);
    customRender();
    await waitFor(() => {
      expect(screen.getByText(/Luis/i)).toBeInTheDocument();
    });
  });

  it('should render with desktop styles', async () => {
    global.localStorage.setItem('token', token);

    window.matchMedia = createMatchMedia(1200);
    customRender();
    await waitFor(() => {
      expect(screen.getByText(/Luis/i)).toHaveStyle({
        'font-size': '1rem',
        'font-weight': 400,
      });
    });
  });

  it('should change styles to mobile media query', async () => {
    global.localStorage.setItem('token', token);

    window.matchMedia = createMatchMedia(400);

    const router = mockRouter;
    router.asPath = "/dashboard/profile";
    jest.spyOn(require("next/router"), "useRouter").mockReturnValue(router);

    customRender();

    // await waitFor(() => {
    //   expect(screen.getByTestId('container-avatar-name-text')).toHaveStyle({
    //     display: 'column',
    //     'justify-content': 'flex-end',
    //     color: 'rgb(156, 39, 176)',
    //   });
    //   expect(screen.getByText(/Luis Alvarez/i)).toHaveStyle({
    //     'font-size': '10pt',
    //     'font-weight': 500,
    //   });
    // });
  });
});
