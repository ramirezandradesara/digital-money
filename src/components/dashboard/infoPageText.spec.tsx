import { render, screen } from "@testing-library/react";
import { DataUser } from "../../context/UserDataContext";
import InfoPageText from "./infoPageText";

const customRender = () => {
  const wrapper = ({ children }: any) => (
    <DataUser.Provider value={{}}>{children}</DataUser.Provider>
  );

  render(<InfoPageText />, { wrapper });
};

const router: any = jest.spyOn(require("next/router"), "useRouter");
describe("InfoPageText", () => {
  it("should render with text 'Inicio' ", () => {
    router.asPath = "/dashboard";
    router.mockImplementation(() => ({
      asPath: router.asPath,
      push: jest.fn(),
    }));
    customRender();

    expect(screen.getByText(/inicio/i)).toBeInTheDocument();
  });
  it("should render with text 'Actividad' ", () => {
    router.asPath = "/dashboard/activity";
    router.mockImplementation(() => ({
      asPath: router.asPath,
      push: jest.fn(),
    }));
    customRender();

    expect(screen.getByText(/actividad/i)).toBeInTheDocument();
  });
  it("should render with text 'Perfil' ", () => {
    router.asPath = "/dashboard/profile";
    router.mockImplementation(() => ({
      asPath: router.asPath,
      push: jest.fn(),
    }));
    customRender();

    expect(screen.getByText(/perfil/i)).toBeInTheDocument();
  });
  it("should render with text 'Cargar dinero' ", () => {
    router.asPath = "/dashboard/charge";
    router.mockImplementation(() => ({
      asPath: router.asPath,
      push: jest.fn(),
    }));
    customRender();

    expect(screen.getByText(/cargar dinero/i)).toBeInTheDocument();
  });
  it("should render with text 'Pagar servicios' ", () => {
    router.asPath = "/dashboard/services";
    router.mockImplementation(() => ({
      asPath: router.asPath,
      push: jest.fn(),
    }));
    customRender();

    expect(screen.getByText(/pagar servicios/i)).toBeInTheDocument();
  });
  it("should render with text 'Tarjetas' ", () => {
    router.asPath = "/dashboard/cards";
    router.mockImplementation(() => ({
      asPath: router.asPath,
      push: jest.fn(),
    }));
    customRender();

    expect(screen.getByText(/tarjetas/i)).toBeInTheDocument();
  });
});
