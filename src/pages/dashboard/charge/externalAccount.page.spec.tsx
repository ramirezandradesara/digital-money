import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import ExternalAccount from "./externalAccount.page";
import { useMediaQuery } from "@mui/material";
import { DataUser } from "@/context/UserDataContext";
import getDocumentTitle from '@testing-library/react';


jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    useMediaQuery: jest.fn(),
}));

const userData = {
    alias: "ALIAS.FALSO.ALIAS",
    available_amount: 1000,
    cvu: "12345678123456781234",
    id: 100,
    user_id: 100,
    dni: 12345678,
    email: "test@gmail.com",
    firstname: "Pedro",
    lastname: "Perez",
    password: "1234A#",
    phone: "12345678",
};

describe('ExternalAccount', () => {
    let pushMock: jest.Mock;

    beforeEach(() => {
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

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should redirect to login if there is no token in localStorage', () => {
        render(
            <DataUser.Provider value={{ userData }}>
                <ExternalAccount />
            </DataUser.Provider>
        );

        expect(pushMock).toHaveBeenCalledWith('/login');
    });

    it('should render the AccountData component', () => {
        // Mock localStorage.getItem to return a token
        (window.localStorage.getItem as jest.Mock).mockReturnValue('fake-token');

        render(
            <DataUser.Provider value={{ userData }}>
                <ExternalAccount />
            </DataUser.Provider>
        );

        expect(screen.getByTestId('account-data')).toBeInTheDocument();
    });

/*
    it('should render the correct title and description', () => {
        render(
            <DataUser.Provider value={{ userData }}>
                <ExternalAccount />
            </DataUser.Provider>
        );

        const expectedTitle = 'Add money';
        const documentTitle = document.title;
      
        expect(documentTitle).toBe(expectedTitle);
      
        const expectedDescription = 'Digital Money House';
        const metaDescription = document.querySelector('meta[name="description"]').getAttribute('content');
        expect(metaDescription).toBe(expectedDescription);
/*
        const titleElement = document.querySelector('title');
        const descriptionElement = document.querySelector('meta[name="description"]');

        expect(titleElement?.textContent).toBe('Add money');
        expect(descriptionElement?.getAttribute('content')).toBe('Digital Money House');
        
    });
    */

    it('should render the Container component with correct styles', () => {
        render(
            <DataUser.Provider value={{ userData }}>
                <ExternalAccount />
            </DataUser.Provider>
        );

        const container = screen.getByRole('container');
        expect(container).toHaveStyle({ minWidth: '100%'});
    });

});