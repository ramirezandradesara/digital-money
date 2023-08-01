import { act, render, screen, waitFor } from "@testing-library/react";
import ListCards from "./ListCards";
import userEvent from "@testing-library/user-event";

describe('ListCards tests', () => {
    it('ListCards title', () => {
        render(<ListCards cards={[]} handleDeleteCard={undefined} />)

        const text = screen.getByText(/Tus tarjetas/i);

        expect(text).toBeInTheDocument()
    });

    it('ListCards no cards added', () => {
        render(<ListCards cards={[]} handleDeleteCard={undefined} />)

        const text = screen.getByText(/No tenés tarjetas asociadas/i);

    });

    it('ListCards with cards added', async () => {
        render(<ListCards
            cards={[{
                account_id: 123,
                cod: 123,
                expiration_date: '123',
                first_last_name: '123',
                id: 123,
                number_id: 132,
            }]}
            handleDeleteCard={function (): void {
                throw new Error("Function not implemented.");
            }} />)

        const deleteButton = screen.getByRole('button', { name: /delete/i })
        expect(deleteButton).toBeInTheDocument()
    });
});