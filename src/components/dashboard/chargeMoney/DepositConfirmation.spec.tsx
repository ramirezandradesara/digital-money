import { render, screen, cleanup, waitFor, act, fireEvent } from "@testing-library/react";
import { AddMoney, AddMoneyContext, AddMoneyProvider } from "@/context/AddMoneyContext";
import { DataUser } from "@/context/UserDataContext";
import { mockedUserData } from '../../../../test/mocks/userData';
import { lastFourDigits } from "@/helpers/lastFourDigits";
import mediaQuery from "css-mediaquery";
import mockRouter from "next-router-mock";
import { StepProvider } from "@/context/StepContext";
import DepositConfirmation from "./DepositConfirmation";
import getFormattedDate from "@/components/utils/getFormattedDate";

function createMatchMedia(width: number) {
    return (query: string): MediaQueryList => ({
        matches: mediaQuery.match(query, { width }) as boolean,
        media: "",
        addListener: () => { },
        removeListener: () => { },
        onchange: () => { },
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => true,
    });
}

describe('DepositConfirmation', () => {
    afterEach(cleanup);

    afterEach(() => {
        jest.clearAllMocks();
    });

    const token = 'your-auth-token';

    const router: any = jest.spyOn(require("next/router"), "useRouter");
    const pushMock = jest.fn();

    let deposit: AddMoney = {
        card_number: 4576875434562317,
        card_type: "Visa",
        amount: 200,
        dated: ""
    };


    /*-----------START WITH TEST---------------*/

    test('should render the component', () => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(768); //tablet

        global.localStorage.setItem('token', token)

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <DepositConfirmation />
                </AddMoneyContext.Provider>
            </DataUser.Provider>
        );

        expect(screen.getByText('Ya cargamos el dinero en tu cuenta')).toBeInTheDocument();
        expect(screen.getByText(/Fecha/)).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Descargar comprobante' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Ir al inicio' })).toBeInTheDocument();
    });


    test('should go to /dashboard, breakpoint mobile', async () => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(400); //mobile

        global.localStorage.setItem('token', token)

        router.mockImplementationOnce(() => ({
            asPath: "/dashboard/charge/card",
            push: pushMock
        }));

        mockRouter.push("/dashboard/charge/card");

        router.asPath = "/dashboard/charge/card";

        jest.spyOn(require("next/router"), "useRouter").mockReturnValue(router);

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <DepositConfirmation />
                </AddMoneyContext.Provider>
            </DataUser.Provider>
        );

        expect(mockRouter.asPath).toEqual("/dashboard/charge/card");
        expect(screen.getByText('Cargar dinero')).toBeInTheDocument();
        expect(screen.getByText('Ya cargamos el dinero en tu cuenta')).toBeInTheDocument();
        expect(screen.getByText(/Fecha/)).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Descargar comprobante' })).toBeInTheDocument();

        const basePageButton = screen.getByRole('button', { name: 'Ir al inicio' });
        expect(basePageButton).toBeInTheDocument();

        // screen.debug()

        await act(async () => {
            fireEvent.click(basePageButton);
        });

        mockRouter.push("/dashboard");

        expect(pushMock).toBeCalledWith("/dashboard");

        expect(mockRouter.asPath).toEqual("/dashboard");

    });


    test('should go to /dashboard, breakpoint tablet', async () => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(768); //tablet

        global.localStorage.setItem('token', token)

        router.mockImplementationOnce(() => ({
            asPath: "/dashboard/charge/card",
            push: pushMock
        }));

        mockRouter.push("/dashboard");

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <DepositConfirmation />
                </AddMoneyContext.Provider>
            </DataUser.Provider>
        );

        expect(screen.getByText('Ya cargamos el dinero en tu cuenta')).toBeInTheDocument();
        expect(screen.getByText(/Fecha/)).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Descargar comprobante' })).toBeInTheDocument();

        const basePageButton = screen.getByRole('button', { name: 'Ir al inicio' });
        expect(basePageButton).toBeInTheDocument();

        // screen.debug()

        await act(async () => {
            fireEvent.click(basePageButton);
        });

        expect(pushMock).toBeCalledWith("/dashboard");

        expect(mockRouter.asPath).toEqual("/dashboard");

    });


    test('should go to /dashboard, breakpoint laptop', async () => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(1025); //laptop

        global.localStorage.setItem('token', token)

        router.mockImplementationOnce(() => ({
            asPath: "/dashboard/charge/card",
            push: pushMock
        }));

        mockRouter.push("/dashboard");

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <DepositConfirmation />
                </AddMoneyContext.Provider>
            </DataUser.Provider>
        );

        expect(screen.getByText('Ya cargamos el dinero en tu cuenta')).toBeInTheDocument();
        expect(screen.getByText(/Fecha/)).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Descargar comprobante' })).toBeInTheDocument();

        const basePageButton = screen.getByRole('button', { name: 'Ir al inicio' });
        expect(basePageButton).toBeInTheDocument();

        // screen.debug()

        await act(async () => {
            fireEvent.click(basePageButton);
        });

        expect(pushMock).toBeCalledWith("/dashboard");

        expect(mockRouter.asPath).toEqual("/dashboard");

    });


    test('should go to /dashboard, breakpoint desktop', async () => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(1301); //desktop

        global.localStorage.setItem('token', token)

        router.mockImplementationOnce(() => ({
            asPath: "/dashboard/charge/card",
            push: pushMock
        }));

        mockRouter.push("/dashboard");

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <DepositConfirmation />
                </AddMoneyContext.Provider>
            </DataUser.Provider>
        );

        expect(screen.getByText('Ya cargamos el dinero en tu cuenta')).toBeInTheDocument();
        expect(screen.getByText(/Fecha/)).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Descargar comprobante' })).toBeInTheDocument();

        const basePageButton = screen.getByRole('button', { name: 'Ir al inicio' });
        expect(basePageButton).toBeInTheDocument();

        // screen.debug()

        await act(async () => {
            fireEvent.click(basePageButton);
        });

        expect(pushMock).toBeCalledWith("/dashboard");

        expect(mockRouter.asPath).toEqual("/dashboard");

    });


    test('should download voucher, breakpoint tablet', async () => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(768); //tablet

        global.localStorage.setItem('token', token)

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <DepositConfirmation />
                </AddMoneyContext.Provider>
            </DataUser.Provider>
        );

        expect(screen.getByText('Ya cargamos el dinero en tu cuenta')).toBeInTheDocument();
        expect(screen.getByText(/Fecha/)).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();
        const downloadVoucher = screen.getByRole('button', { name: 'Descargar comprobante' });
        expect(downloadVoucher).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Ir al inicio' })).toBeInTheDocument();

        // screen.debug()

        await act(async () => {
            fireEvent.click(downloadVoucher);
        });


    });



});






