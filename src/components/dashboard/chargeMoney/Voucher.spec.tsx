import { render, screen, cleanup, waitFor, act, fireEvent } from "@testing-library/react";
import { AddMoney, AddMoneyContext, AddMoneyProvider } from "@/context/AddMoneyContext";
import { DataUser } from "@/context/UserDataContext";
import Voucher from "./Voucher";
import { mockedUserData } from '../../../../test/mocks/userData';
import { lastFourDigits } from "@/helpers/lastFourDigits";
import mediaQuery from "css-mediaquery";
import mockRouter from "next-router-mock";
import InfoPageText from "../infoPageText";
import { StepProvider } from "@/context/StepContext";

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

describe('Voucher', () => {
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

    test('should render the component, when token is in localStorage, breakpoint tablet', () => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(768); //tablet

        global.localStorage.setItem('token', token)

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <Voucher />
                </AddMoneyContext.Provider>
            </DataUser.Provider>
        );

        expect(screen.getByText('Revisá que está todo bien')).toBeInTheDocument();
        expect(screen.getByText('Vas a transferir')).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Atrás' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Confirmar' })).toBeInTheDocument();
    });


    test('should redirect to /login, when there is no token', async () => {
        global.localStorage.removeItem('token')

        router.mockImplementationOnce(() => ({
            asPath: "/dashboard/charge/card",
            push: pushMock
        }));

        mockRouter.push("/login");

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                <AddMoneyProvider>
                    <Voucher />
                </AddMoneyProvider>
            </DataUser.Provider>
        );


        expect(pushMock).toBeCalledWith("/login");

        expect(mockRouter.asPath).toEqual("/login");
    });


    test('change amount', async () => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(768); //tablet

        global.localStorage.setItem('token', token)

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <Voucher />
                </AddMoneyContext.Provider>
            </DataUser.Provider>
        );

        expect(screen.getByText('Revisá que está todo bien')).toBeInTheDocument();
        expect(screen.getByText('Vas a transferir')).toBeInTheDocument();

        const editButton = screen.getByTestId('icon-button-edit');

        expect(editButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(editButton);
        });

        const editAmountInput = screen.getByTestId('input-change-amount');
        expect(editAmountInput).toBeInTheDocument();

        const amount = "250";

        await act(async () => {
            fireEvent.change(editAmountInput, { target: { value: amount } });
        });

        expect(editAmountInput).toHaveValue(parseFloat(amount));

        const editButtonOK = screen.getByTestId('icon-button-done');

        expect(editButtonOK).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(editButtonOK);
        });

        expect(screen.getByText(`$${amount}`)).toBeInTheDocument();

    });


    test('should render the component on mobile', () => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(400); //mobile

        global.localStorage.setItem('token', token)

        const router = mockRouter;
        router.asPath = "/dashboard/charge/card";
      
        jest.spyOn(require("next/router"), "useRouter").mockReturnValue(router);

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <Voucher />
                </AddMoneyContext.Provider>
            </DataUser.Provider>
        );

        expect(mockRouter.asPath).toEqual("/dashboard/charge/card");
        expect(screen.getByText('Cargar dinero')).toBeInTheDocument();
        expect(screen.getByText('Revisá que está todo bien')).toBeInTheDocument();
        expect(screen.getByText('Vas a transferir')).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Atrás' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Confirmar' })).toBeInTheDocument();
    });


    test('should render the component on laptop', () => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(1025); //laptop

        global.localStorage.setItem('token', token)

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <Voucher />
                </AddMoneyContext.Provider>
            </DataUser.Provider>
        );

        expect(screen.getByText('Revisá que está todo bien')).toBeInTheDocument();
        expect(screen.getByText('Vas a transferir')).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Atrás' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Confirmar' })).toBeInTheDocument();
    });


    test('should render the component on desktop', () => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(1301); //desktop

        global.localStorage.setItem('token', token)

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <Voucher />
                </AddMoneyContext.Provider>
            </DataUser.Provider>
        );
        
        expect(screen.getByText('Revisá que está todo bien')).toBeInTheDocument();
        expect(screen.getByText('Vas a transferir')).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Atrás' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Confirmar' })).toBeInTheDocument();
    });


    test('should go to next step, breakpoint mobile', async() => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(400); //mobile

        global.localStorage.setItem('token', token)

        const nextStepMock = jest.fn();
        const backStepMock = jest.fn();
        jest.mock('@/context/useStep', () => ({
            __esModule: true,
            default: (maxStepArg?: number) => ({
                nextStep: nextStepMock,
                previousStep: backStepMock,
                step: 3,
            }),
        }));

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                 <StepProvider>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <Voucher />
                </AddMoneyContext.Provider>
                </StepProvider>
            </DataUser.Provider>
        );
        
        expect(screen.getByText('Revisá que está todo bien')).toBeInTheDocument();
        expect(screen.getByText('Vas a transferir')).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Atrás' })).toBeInTheDocument();

        const confirmButton = screen.getByRole('button', { name: 'Confirmar' });
        expect(confirmButton).toBeInTheDocument();

        // screen.debug()

        await act(async () => {
            fireEvent.click(confirmButton);
        });

        await waitFor(() => {
            expect(nextStepMock).toHaveBeenCalledTimes(0);
        });


    });


    test('should go to next step, breakpoint tablet', async() => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(768); //tablet

        global.localStorage.setItem('token', token)

        const nextStepMock = jest.fn();
        const backStepMock = jest.fn();
        jest.mock('@/context/useStep', () => ({
            __esModule: true,
            default: (maxStepArg?: number) => ({
                nextStep: nextStepMock,
                previousStep: backStepMock,
                step: 3,
            }),
        }));

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                 <StepProvider>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <Voucher />
                </AddMoneyContext.Provider>
                </StepProvider>
            </DataUser.Provider>
        );
        
        expect(screen.getByText('Revisá que está todo bien')).toBeInTheDocument();
        expect(screen.getByText('Vas a transferir')).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Atrás' })).toBeInTheDocument();

        const confirmButton = screen.getByRole('button', { name: 'Confirmar' });
        expect(confirmButton).toBeInTheDocument();

        // screen.debug()

        await act(async () => {
            fireEvent.click(confirmButton);
        });

        await waitFor(() => {
            expect(nextStepMock).toHaveBeenCalledTimes(0);
        });


    });


    test('should go to next step, breakpoint laptop', async() => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(1025); //laptop

        global.localStorage.setItem('token', token)

        const nextStepMock = jest.fn();
        const backStepMock = jest.fn();
        jest.mock('@/context/useStep', () => ({
            __esModule: true,
            default: (maxStepArg?: number) => ({
                nextStep: nextStepMock,
                previousStep: backStepMock,
                step: 3,
            }),
        }));

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                 <StepProvider>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <Voucher />
                </AddMoneyContext.Provider>
                </StepProvider>
            </DataUser.Provider>
        );
        
        expect(screen.getByText('Revisá que está todo bien')).toBeInTheDocument();
        expect(screen.getByText('Vas a transferir')).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Atrás' })).toBeInTheDocument();

        const confirmButton = screen.getByRole('button', { name: 'Confirmar' });
        expect(confirmButton).toBeInTheDocument();

        // screen.debug()

        await act(async () => {
            fireEvent.click(confirmButton);
        });

        await waitFor(() => {
            expect(nextStepMock).toHaveBeenCalledTimes(0);
        });


    });

    test('should go to next step, breakpoint desktop', async() => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(1301); //desktop

        global.localStorage.setItem('token', token)

        const nextStepMock = jest.fn();
        const backStepMock = jest.fn();
        jest.mock('@/context/useStep', () => ({
            __esModule: true,
            default: (maxStepArg?: number) => ({
                nextStep: nextStepMock,
                previousStep: backStepMock,
                step: 3,
            }),
        }));

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                 <StepProvider>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <Voucher />
                </AddMoneyContext.Provider>
                </StepProvider>
            </DataUser.Provider>
        );
        
        expect(screen.getByText('Revisá que está todo bien')).toBeInTheDocument();
        expect(screen.getByText('Vas a transferir')).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Atrás' })).toBeInTheDocument();

        const confirmButton = screen.getByRole('button', { name: 'Confirmar' });
        expect(confirmButton).toBeInTheDocument();

        // screen.debug()

        await act(async () => {
            fireEvent.click(confirmButton);
        });

        await waitFor(() => {
            expect(nextStepMock).toHaveBeenCalledTimes(0);
        });


    });


    test('should go to back step, breakpoint mobile', async() => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(400); //mobile

        global.localStorage.setItem('token', token)

        const nextStepMock = jest.fn();
        const backStepMock = jest.fn();
        jest.mock('@/context/useStep', () => ({
            __esModule: true,
            default: (maxStepArg?: number) => ({
                nextStep: nextStepMock,
                previousStep: backStepMock,
                step: 3,
            }),
        }));

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                 <StepProvider>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <Voucher />
                </AddMoneyContext.Provider>
                </StepProvider>
            </DataUser.Provider>
        );
        
        expect(screen.getByText('Revisá que está todo bien')).toBeInTheDocument();
        expect(screen.getByText('Vas a transferir')).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();

        const backButton = screen.getByRole('button', { name: 'Atrás' });
        expect(backButton).toBeInTheDocument();

        // screen.debug()

        await act(async () => {
            fireEvent.click(backButton);
        });

        await waitFor(() => {
            expect(backStepMock).toHaveBeenCalledTimes(0);
        });


    });


    test('should go to back step, breakpoint tablet', async() => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(768); //tablet

        global.localStorage.setItem('token', token)

        const nextStepMock = jest.fn();
        const backStepMock = jest.fn();
        jest.mock('@/context/useStep', () => ({
            __esModule: true,
            default: (maxStepArg?: number) => ({
                nextStep: nextStepMock,
                previousStep: backStepMock,
                step: 3,
            }),
        }));

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                 <StepProvider>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <Voucher />
                </AddMoneyContext.Provider>
                </StepProvider>
            </DataUser.Provider>
        );
        
        expect(screen.getByText('Revisá que está todo bien')).toBeInTheDocument();
        expect(screen.getByText('Vas a transferir')).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();

        const backButton = screen.getByRole('button', { name: 'Atrás' });
        expect(backButton).toBeInTheDocument();

        // screen.debug()

        await act(async () => {
            fireEvent.click(backButton);
        });

        await waitFor(() => {
            expect(backStepMock).toHaveBeenCalledTimes(0);
        });


    });


    test('should go to back step, breakpoint laptop', async() => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(1025); //laptop

        global.localStorage.setItem('token', token)

        const nextStepMock = jest.fn();
        const backStepMock = jest.fn();
        jest.mock('@/context/useStep', () => ({
            __esModule: true,
            default: (maxStepArg?: number) => ({
                nextStep: nextStepMock,
                previousStep: backStepMock,
                step: 3,
            }),
        }));

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                 <StepProvider>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <Voucher />
                </AddMoneyContext.Provider>
                </StepProvider>
            </DataUser.Provider>
        );
        
        expect(screen.getByText('Revisá que está todo bien')).toBeInTheDocument();
        expect(screen.getByText('Vas a transferir')).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();

        const backButton = screen.getByRole('button', { name: 'Atrás' });
        expect(backButton).toBeInTheDocument();

        // screen.debug()

        await act(async () => {
            fireEvent.click(backButton);
        });

        await waitFor(() => {
            expect(backStepMock).toHaveBeenCalledTimes(0);
        });


    });


    test('should go to back step, breakpoint desktop', async() => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 250;
        });

        window.matchMedia = createMatchMedia(1301); //desktop

        global.localStorage.setItem('token', token)

        const nextStepMock = jest.fn();
        const backStepMock = jest.fn();
        jest.mock('@/context/useStep', () => ({
            __esModule: true,
            default: (maxStepArg?: number) => ({
                nextStep: nextStepMock,
                previousStep: backStepMock,
                step: 3,
            }),
        }));

        render(
            <DataUser.Provider value={{ mockedUserData }}>
                 <StepProvider>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <Voucher />
                </AddMoneyContext.Provider>
                </StepProvider>
            </DataUser.Provider>
        );
        
        expect(screen.getByText('Revisá que está todo bien')).toBeInTheDocument();
        expect(screen.getByText('Vas a transferir')).toBeInTheDocument();
        expect(screen.getByText(`$${deposit.amount}`)).toBeInTheDocument();
        expect(screen.getByText('Para')).toBeInTheDocument();
        expect(screen.getByText('Cuenta propia')).toBeInTheDocument();
        expect(screen.getByText(`${deposit.card_type}`)).toBeInTheDocument();
        expect(screen.getByText(`Terminada en ${lastFourDigits(deposit.card_number)}`)).toBeInTheDocument();

        const backButton = screen.getByRole('button', { name: 'Atrás' });
        expect(backButton).toBeInTheDocument();

        // screen.debug()

        await act(async () => {
            fireEvent.click(backButton);
        });

        await waitFor(() => {
            expect(backStepMock).toHaveBeenCalledTimes(0);
        });


    });


    test('Error when change amount', async () => {
        const setDeposit = jest.fn(() => {
            deposit.amount = 0;
        });

        window.matchMedia = createMatchMedia(768); //tablet

        global.localStorage.setItem('token', token)


        render(
            <DataUser.Provider value={{ mockedUserData }}>
                <AddMoneyContext.Provider value={{ deposit, setDeposit }}>
                    <Voucher />
                </AddMoneyContext.Provider>
            </DataUser.Provider>
        );

        expect(screen.getByText('Revisá que está todo bien')).toBeInTheDocument();
        expect(screen.getByText('Vas a transferir')).toBeInTheDocument();

        const editButton = screen.getByTestId('icon-button-edit');

        expect(editButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(editButton);
        });

        const editAmountInput = screen.getByTestId('input-change-amount');
        expect(editAmountInput).toBeInTheDocument();

        const amount = "0";

        await act(async () => {
            fireEvent.change(editAmountInput, { target: { value: amount } });
        });

        expect(editAmountInput).toHaveValue(parseFloat(amount));

        const editButtonOK = screen.getByTestId('icon-button-done');

        expect(editButtonOK).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(editButtonOK);
        });

        expect(screen.getByText("El formato del importe es invalido. Debe contener solamente números. Debe contener al menos un número. El número no puede empezar con 0.")).toBeInTheDocument();

    });



});






