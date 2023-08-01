import { render, screen } from "@testing-library/react";
import HomeLayout from "@/components/layouts/layout-home";
import { DataUser } from "../../context/UserDataContext";
import mediaQuery from "css-mediaquery";
import Home from "./index.page";
import {
  userData,
  setUserData,
  setModalFlag,
  modalFlag,
} from "../../mocks/contextData";

const router : any = jest.spyOn(require("next/router"), "useRouter");

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
    <DataUser.Provider
      value={{ userData, setUserData, modalFlag, setModalFlag }}
    >
      {children}
    </DataUser.Provider>
  );

  render(<Home />, { wrapper });
};

describe("Home", () => {
  it("should render the component", () => {
    router.mockImplementationOnce(() => ({
      asPath: "/",
      push: jest.fn(),
    }));
    customRender();
    const headingElement = screen.getByText("Dinero disponible");
    expect(headingElement).toBeInTheDocument();
  });

  it("should have the correct layout", () => {
    expect((Home as any).Layout).toBe(HomeLayout);
  });
  it("should render InfoPageText component", () => {
    window.matchMedia = createMatchMedia(400);
    router.asPath = "/dashboard";
    router.mockImplementation(() => ({
      asPath: router.asPath,
      push: jest.fn(),
    }));
    customRender();
    expect(screen.getByText("Inicio")).toBeInTheDocument();
  });
});
