import { render, screen } from "@testing-library/react";
import Cards from "./index.page";
import { DataUser } from "../../../context/UserDataContext";
import { modalFlag, setModalFlag, setUserData, userData } from "../../../mocks/contextData";

describe('Cards page tests', () => {
    const token = 'your-auth-token';

    const customRender = () => {
        const wrapper = ({ children }: any) => (
            <DataUser.Provider
                value={{ userData, setUserData, modalFlag, setModalFlag }}
            >
                {children}
            </DataUser.Provider>
        );
        render(<Cards />, { wrapper });
    };

    it('Cards page tests', () => {
        global.localStorage.setItem('token', token);

        customRender()
        const text = screen.getByText(/Agregá tu tarjeta de débito o crédito/i);
        expect(text).toBeInTheDocument()
    });
});