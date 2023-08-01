import { DataUser } from "../../context/UserDataContext";
import mediaQuery from "css-mediaquery";
import AvalibleMoney from "./avalibleMoney";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userData } from "../../mocks/contextData";
import mockRouter from "next-router-mock";


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

  render(<AvalibleMoney />, { wrapper });
};

const customRenderNullData = () => {
  const wrapper = ({ children }: any) => (
    <DataUser.Provider value={{ userDataNull }}>{children}</DataUser.Provider>
  );

  render(<AvalibleMoney />, { wrapper });
};

const router: any = jest.spyOn(require("next/router"), "useRouter");

describe("AvalibleMoney", () => {
  it("should hide and show user amount", async () => {
    customRender();
    expect(screen.getByTestId("visibility-avalible-money")).toBeInTheDocument();
    expect(screen.getByTestId("amount-avalible-money")).toHaveTextContent(
      "$ 1.000,00"
    );

    fireEvent.click(screen.getByTestId("visibility-avalible-money"));
    await waitFor(() => {
      expect(
        screen.getByTestId("visibility-off-avalible-money")
      ).toBeInTheDocument();
      expect(screen.getByTestId("amount-avalible-money")).toHaveTextContent(
        "$ *****"
      );
    });

    fireEvent.click(screen.getByTestId("visibility-off-avalible-money"));
    await waitFor(() => {
      expect(
        screen.getByTestId("visibility-avalible-money")
      ).toBeInTheDocument();
    });
  });
  
  it("should render skeleton", () => {
    customRenderNullData();
    expect(screen.getByTestId("skeleton-avalible-money")).toBeInTheDocument();
  });

  it("should change styles to mobile", () => {
    window.matchMedia = createMatchMedia(400);
    customRender();
    expect(screen.getByText(/dinero disponible/i)).toBeInTheDocument();
    expect(screen.getByText(/dinero disponible/i)).toHaveStyle({
      "font-size": "12pt",
    });
    expect(
        screen.getByTestId("amount-avalible-money")
      ).toHaveStyle({
        "font-size": "12pt",
      });
  });

  it("should redirect to '/dashboard/cards'", async ()  => {
    customRender()
    router.asPath = "/dashboard";
    router.mockImplementationOnce(() => ({
      asPath: router.asPath,
      push: jest.fn(),
    }));
    mockRouter.push("/dashboard/cards");
    expect(screen.getByTestId('link-cards-avalible-money')).toBeInTheDocument()
    await waitFor(() => {
        fireEvent.click(screen.getByTestId('link-cards-avalible-money'));
    })
    expect(mockRouter.asPath).toEqual("/dashboard/cards");
  });

  it("should redirect to '/dashboard/profile'", async () => {
    customRender()
    router.asPath = "/dashboard";
    router.mockImplementationOnce(() => ({
      asPath: router.asPath,
      push: jest.fn(),
    }));
    mockRouter.push("/dashboard/profile");
    expect(screen.getByTestId('link-profile-avalible-money')).toBeInTheDocument()
    await waitFor(() => {
        fireEvent.click(screen.getByTestId('link-profile-avalible-money'));
    })
    expect(mockRouter.asPath).toEqual("/dashboard/profile");
  });
});
