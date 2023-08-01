import { act, render, screen, waitFor } from "@testing-library/react";
import { DataUser } from "../../../../context/UserDataContext";
import { modalFlag, setModalFlag, setUserData, userData } from "../../../../mocks/contextData";
import AddCard from "./index.page";
import userEvent from "@testing-library/user-event";

describe('AddCards page tests', () => {
    const token = 'your-auth-token';

    const customRender = () => {
        const wrapper = ({ children }: any) => (
            <DataUser.Provider
                value={{ userData, setUserData, modalFlag, setModalFlag }}
            >
                {children}
            </DataUser.Provider>
        );

        render(<AddCard />, { wrapper });
    };
    it("Button disabled when form isn't filled", () => {
        global.localStorage.setItem('token', token);

        customRender()

        const continueButton = screen.getByText(/continuar/i);

        expect(continueButton).toBeDisabled();
    });

    it('Button is enabled once the form is filled', async () => {
        global.localStorage.setItem('token', token);

        customRender()

        const numberInput = screen.getByPlaceholderText('Número de la tarjeta*')
        const nameInput = screen.getByPlaceholderText('Nombre y apellido*')
        const expiryInput = screen.getByPlaceholderText('Fecha de vencimiento*')
        const cvcInput = screen.getByPlaceholderText('Código de seguridad*')
        const continueButton = screen.getByRole('button', { name: /crear tarjeta/i })

        act(() => {
            userEvent.type(numberInput, "1234567891234567")
            userEvent.type(nameInput, "Mastercard")
            userEvent.type(expiryInput, "11/2022")
            userEvent.type(cvcInput, "123")
            userEvent.click(continueButton);
        });
  
        expect(continueButton).toHaveAttribute('disabled', '');
    });
});