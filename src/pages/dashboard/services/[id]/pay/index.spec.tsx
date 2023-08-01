import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import SelectMethod from "./index.page";
import { modalFlag, setModalFlag, setUserData, userData } from "../../../../../mocks/contextData";
import { DataUser } from "@/context/UserDataContext";
import userEvent from "@testing-library/user-event";
import mockRouter from 'next-router-mock';
import mediaQuery from "css-mediaquery";

jest.mock('next/router', () => require('next-router-mock'));

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

describe('SelectMethod page tests', () => {
    const customRender = () => {
        const wrapper = ({ children }: any) => (
            <DataUser.Provider
                value={{ userData, setUserData, modalFlag, setModalFlag }}
            >
                {children}
            </DataUser.Provider>
        );
        render(<SelectMethod />, { wrapper });
    };

    it('SelectMethod page tests', async () => {
        customRender()
        const button = screen.getByText(/Ver detalles del pago/i);

        act(() => {
            userEvent.click(button);
        });
        
        await waitFor(() => expect(screen.getByTestId("modal-payment")).toBeInTheDocument());
        
    });

    test('Redirection to add card', () => {
        mockRouter.push("charge");
        customRender()
        const button = screen.getByRole('button', { name: /Agregar nueva tarjeta/i })

        fireEvent.click(button);

        expect(mockRouter.asPath).toEqual('/dashboard/cards/add-card');
    });

        it("should change to desktop styles", () => {
            window.matchMedia = createMatchMedia(1820);
            customRender();

            expect(screen.getByTestId("buttons-container")).toBeInTheDocument();
            expect(screen.getByTestId("buttons-container")).toHaveStyle({ "justify-content": "end" });
        });

        it("should change to tablet styles", () => {
            window.matchMedia = createMatchMedia(900);
            customRender();

            expect(screen.getByTestId("buttons-container")).toBeInTheDocument();
            expect(screen.getByTestId("buttons-container")).toHaveStyle({ "justify-content": "center" });
        });

        it("should change to mobile styles", () => {
            window.matchMedia = createMatchMedia(300);
            customRender();

            expect(screen.getByTestId("buttons-container")).toBeInTheDocument();
            expect(screen.getByTestId("buttons-container")).toHaveStyle({ "flex-direction": "column" });
        });
});