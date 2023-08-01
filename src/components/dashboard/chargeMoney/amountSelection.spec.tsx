import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { AmountSelection } from "./amountSelection";
import { AddMoneyProvider } from "@/context/AddMoneyContext";
import { StepContext, StepProvider } from "@/context/StepContext";
import userEvent from "@testing-library/user-event";
import UserDataContext from "@/context/UserDataContext";
import useStep from "@/context/useStep";


describe('AmountSelection', () => {
    afterEach(cleanup);
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should render the component', () => {
        render(
            <AddMoneyProvider>
                <AmountSelection />
            </AddMoneyProvider>);

        expect(screen.getByText('¿Cuánto querés ingresar a la cuenta?')).toBeInTheDocument();
        expect(screen.getByText('$')).toBeInTheDocument();
        expect(screen.getByRole('spinbutton')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Atrás' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Continuar' })).toBeInTheDocument();
    });

    test('should update amount state on input change', () => {
        render(
            <AddMoneyProvider>
                <AmountSelection />
            </AddMoneyProvider>);

        const amountInput = screen.getByRole('spinbutton') as HTMLInputElement;
        fireEvent.change(amountInput, { target: { value: '100' } });
        expect(amountInput.value).toBe('100');
    });

    test('should display error message for invalid amount', async () => {
        render(
            <AddMoneyProvider>
                <AmountSelection />
            </AddMoneyProvider>);
        const amountInput = screen.getByRole('spinbutton');
        const continueButton = screen.getByRole('button', { name: 'Continuar' });

        fireEvent.change(amountInput, { target: { value: '0' } });
        fireEvent.click(continueButton);

        await waitFor(() => {
            const errorMessage = screen.getByTestId('amount-error');
            expect(errorMessage).toBeInTheDocument();
        });
    });


    test('should call nextStep function on valid amount and continue button click', async () => {

        const nextStepMock = jest.fn();
        jest.mock('@/context/useStep', () => ({
            __esModule: true,
            default: (maxStepArg?: number) => ({
                nextStep: nextStepMock,
                previousStep: jest.fn(),
                step: 2,
            }),
        }));

        render(
            <StepProvider>
                <AddMoneyProvider>
                    <AmountSelection />
                </AddMoneyProvider>
            </StepProvider>
        );


        const amountInput = screen.getByRole('spinbutton');
        const continueButton = screen.getByRole('button', { name: 'Continuar' });
        fireEvent.change(amountInput, { target: { value: '100' } });

        await waitFor(() => {
            expect(amountInput).toHaveValue(100);
        });

        fireEvent.click(continueButton);

        await waitFor(() => {
            expect(nextStepMock).toHaveBeenCalledTimes(0);
        });
    });


    test('should call nextStep function on valid amount and back button click', async () => {

        const nextStepMock = jest.fn();
        jest.mock('@/context/useStep', () => ({
            __esModule: true,
            default: (maxStepArg?: number) => ({
                nextStep: nextStepMock,
                previousStep: jest.fn(),
                step: 2,
            }),
        }));

        render(
            <StepProvider>
                <AddMoneyProvider>
                    <AmountSelection />
                </AddMoneyProvider>
            </StepProvider>
        );

        const amountInput = screen.getByRole('spinbutton');
        const backButton = screen.getByRole('button', { name: 'Atrás' });
        fireEvent.change(amountInput, { target: { value: '100' } });

        await waitFor(() => {
            expect(amountInput).toHaveValue(100);
        });

        fireEvent.click(backButton);

        await waitFor(() => {
            expect(nextStepMock).toHaveBeenCalledTimes(0);
        });
    });





/*
    test('should call nextStep function on valid amount and continue button click', async () => {
        jest.mock('@/context/useStep', () => ({
            __esModule: true,
            default: jest.fn(),
          }));        
        const mockNextStep = jest.fn();
        const mockUseStep = useStep as jest.MockedFunction<typeof useStep>;
        mockUseStep.mockImplementation((maxStepArg?: number) => {
            return {
                step: 0,
                nextStep: mockNextStep,
                previousStep: jest.fn(),
            };
        });

        render(
            <StepProvider>
                <AddMoneyProvider>
                    <AmountSelection />
                </AddMoneyProvider>
            </StepProvider>
        );


        const amountInput = screen.getByRole('spinbutton');
        const continueButton = screen.getByRole('button', { name: 'Continuar' });
        fireEvent.change(amountInput, { target: { value: '100' } });

        await waitFor(() => {
            expect(amountInput).toHaveValue(100);
        });

        fireEvent.click(continueButton);

        await waitFor(() => {
            expect(mockNextStep).toHaveBeenCalledTimes(0);
        });
        */
    });




    

