import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CardSelection } from "./cardSelection";
import { UserAvatar } from "@/shared/styled/avatars";
import UserDataContext, { DataUser } from "@/context/UserDataContext";
import { AddMoneyProvider } from "@/context/AddMoneyContext";
import { StepProvider } from "@/context/StepContext";
import getCards from "@/service/get_cards.service";
import { BankCard } from "@/types/bank_card.type";


jest.mock('next/router', () => require('next-router-mock'));


//jest.mock("@/service/get_cards.service");

/*jest.mock("@/service/get_cards.service", () => ({
    getCards: jest.fn().mockResolvedValue([
    {
        id: 284,
        account_id: 50,
        number_id: 4444111111119876,
        first_last_name: "Tester",
        cod: 222,
        expiration_date: "08/2025",
      },
    ]),
  }));
*/

describe('CardSelection', () => {
    test('renders component, user without associated cards', async () => {
        render(
            <DataUser.Provider value={{ userData: {}, setUserData: jest.fn() }}>
                <AddMoneyProvider>
                    <CardSelection />
                </AddMoneyProvider>
            </DataUser.Provider>
        );

        await waitFor(() => screen.getByText('No tenés tarjetas asociadas'));

        expect(screen.getByText('Seleccionar tarjeta')).toBeInTheDocument();
        expect(screen.getByText('Tus tarjetas')).toBeInTheDocument();
        expect(screen.getByText('Nueva tarjeta')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled();
    });
   
    
});