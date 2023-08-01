import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DataUser } from "../../context/UserDataContext";
import IndexButtons from "./indexButtons";
import mockRouter from "next-router-mock";
import mediaQuery from "css-mediaquery";

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

const customRender = () => {
  const wrapper = ({ children }: any) => (
    <DataUser.Provider value={{}}>{children}</DataUser.Provider>
  );

  render(<IndexButtons />, { wrapper });
};
const router: any = jest.spyOn(require("next/router"), "useRouter");

describe("IndexButtons", () => {

  it("should render buttons ", () => {
    customRender();
    expect(screen.getByText(/cargar dinero/i)).toBeInTheDocument();
    expect(screen.getByText(/pago de servicios/i)).toBeInTheDocument();
  });

  it("should change to mobile styles ", () => {
    window.matchMedia = createMatchMedia(400);
    customRender();
    expect(screen.getByTestId('grid-index-buttons')).toHaveStyle({
        "flex-direction": "column",
    })
    expect(screen.getByText(/cargar dinero/i)).toHaveStyle({
        'width':'100%',
    });
    expect(screen.getByText(/pago de servicios/i)).toHaveStyle({
        'width':'100%',
    });
  });

  it("should redirect to '/dashboard/charge'", async () => {
    window.matchMedia = createMatchMedia(1200);
    customRender();
    expect(screen.getByText(/cargar dinero/i)).toBeInTheDocument();
    expect(screen.getByText(/pago de servicios/i)).toBeInTheDocument();
    router.asPath = "/dashboard";
    router.mockImplementationOnce(() => ({
      asPath: router.asPath,
      push: jest.fn(),
    }));
    mockRouter.push("/dashboard/charge");
    expect(screen.getByTestId('button-charge-index-buttons')).toBeInTheDocument()
    await waitFor(() => {
        fireEvent.click(screen.getByTestId('button-charge-index-buttons'));
    })
    expect(mockRouter.asPath).toEqual("/dashboard/charge");
  });

  it("should redirect to '/dashboard/services'", async () => {
    window.matchMedia = createMatchMedia(1200);
    customRender();
    expect(screen.getByText(/cargar dinero/i)).toBeInTheDocument();
    expect(screen.getByText(/pago de servicios/i)).toBeInTheDocument();
    router.asPath = "/dashboard";
    router.mockImplementationOnce(() => ({
      asPath: router.asPath,
      push: jest.fn(),
    }));
    mockRouter.push("/dashboard/services");
    expect(screen.getByTestId('button-services-index-buttons')).toBeInTheDocument()
    await waitFor(() => {
        fireEvent.click(screen.getByTestId('button-services-index-buttons'));
    })
    expect(mockRouter.asPath).toEqual("/dashboard/services");
  });
});

