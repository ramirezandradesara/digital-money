import mediaQuery from "css-mediaquery";
import SideMenuGeneral from "./sideMenuGeneral";
import { DataUser } from "../../../context/UserDataContext";
import { render, screen } from "@testing-library/react";

const customRender = () => {
  const wrapper = ({ children }: any) => (
    <DataUser.Provider value={{}}>{children}</DataUser.Provider>
  );

  render(<SideMenuGeneral />, { wrapper });
};

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

const router: any = jest
  .spyOn(require("next/router"), "useRouter")
  .mockImplementation(() => ({
    asPath: "/dashboard",
    push: jest.fn(),
  }));

describe("SideMenuGeneral", () => {
    it("should render PageRedirects", () => {
        window.matchMedia = createMatchMedia(1200);
        customRender();
        expect(screen.getByText(/inicio/i)).toBeInTheDocument();
        expect(screen.getByText(/actividad/i)).toBeInTheDocument();
        expect(screen.getByText(/tu perfil/i)).toBeInTheDocument();
        expect(screen.getByText(/cargar dinero/i)).toBeInTheDocument();
        expect(screen.getByText(/pagar servicios/i)).toBeInTheDocument();
        expect(screen.getByText(/tarjetas/i)).toBeInTheDocument();
        expect(screen.getByText(/cerrar sesión/i)).toBeInTheDocument();

      });
  it("should change styles to desktop", () => {
    window.matchMedia = createMatchMedia(1200);
    customRender();
    expect(screen.getByTestId("box-side-menu-general")).toHaveStyle({
      "padding-left": "8",
      "flex-direction": "column",
    });
  });
  it("should change styles to mobile", () => {
    window.matchMedia = createMatchMedia(400);
    customRender();
    expect(screen.getByTestId("box-side-menu-general")).toHaveStyle({
      "padding-left": "3",
      "flex-direction": "column",
    });
  });
});
