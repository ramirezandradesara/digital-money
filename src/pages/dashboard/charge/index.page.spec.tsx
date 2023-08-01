import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index.page";
import UserDataContext, { DataUser } from "@/context/UserDataContext";
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

describe('Home Component', () => {
    test('renders Transferencia bancaria option and navigates to externalAccount page on click', () => {

        mockRouter.push("charge");

        render(
            <DataUser.Provider value={{}}>
                <Home />
            </DataUser.Provider>);


        //expect(screen.getByText('Transferencia bancaria')).toBeInTheDocument();

        const transferenciaBancariaOption = screen.getByText('Transferencia bancaria');
        fireEvent.click(transferenciaBancariaOption);
        expect(mockRouter.asPath).toEqual('charge/externalAccount');

    });

    test('renders Seleccionar Tarjeta option and navigates to externalAccount page on click', () => {

        mockRouter.push("charge");

        render(
            <DataUser.Provider value={{}}>
                <Home />
            </DataUser.Provider>);


        //expect(screen.getByText('Seleccionar Tarjeta')).toBeInTheDocument();

        const SeleccionarTarjetaOption = screen.getByText('Seleccionar tarjeta');
        fireEvent.click(SeleccionarTarjetaOption);
        expect(mockRouter.asPath).toEqual('charge/card');

    });
});