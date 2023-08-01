import { DataUser } from "../../context/UserDataContext";
import mediaQuery from "css-mediaquery";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userData } from "../../mocks/contextData";
import mockRouter from "next-router-mock";
import AccountNumber from './AccountNumber';


function createMatchMedia(width: number) {
  return (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }) as boolean,
    media: "",
    addListener: () => {},
    removeListener: () => {},
    onchange: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  });
}

const userDataNull = null;

const customRender = () => {
  const wrapper = ({ children }: any) => (
    <DataUser.Provider value={{ userData }}>{children}</DataUser.Provider>
  );

  render(<AccountNumber />, { wrapper });
};


describe("AccountNumber", () => {
    it('should display loader', async () => {
        customRender();
    
        const loaderElement = screen.getByTestId('loader');
        expect(loaderElement).toBeInTheDocument();
      });
});
