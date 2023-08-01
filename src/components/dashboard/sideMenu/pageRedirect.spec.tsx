import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DataUser } from "../../../context/UserDataContext";
import Pageredirect from "./pageRedirect";
import mediaQuery from "css-mediaquery";
import {
  userData,
  setUserData,
  setModalFlag,
  modalFlag,
} from "../../../mocks/contextData";

describe("AvatarNameText ", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");

  const renderAccordingText = (text: string) => {
    const wrapper = ({ children }: any) => (
      <DataUser.Provider
        value={{ userData, setUserData, modalFlag, setModalFlag }}
      >
        {children}
      </DataUser.Provider>
    );
    if (text === "Inicio") {
      useRouter.mockImplementationOnce(() => ({
        asPath: "/dashboard",
        push: jest.fn(),
      }));
      render(<Pageredirect variant="Inicio" />, { wrapper });
    } else if (text === "Actividad") {
      useRouter.mockImplementationOnce(() => ({
        asPath: "/dashboard/activity",
        push: jest.fn(),
      }));
      render(<Pageredirect variant="Actividad" />, { wrapper });
    } else if (text === "Tu perfil") {
      useRouter.mockImplementationOnce(() => ({
        asPath: "/dashboard/profile",
        push: jest.fn(),
      }));
      render(<Pageredirect variant="Tu perfil" />, { wrapper });
    } else if (text === "Cargar dinero") {
      useRouter.mockImplementationOnce(() => ({
        asPath: "/dashboard/charge",
        push: jest.fn(),
      }));
      render(<Pageredirect variant="Cargar dinero" />, { wrapper });
    } else if (text === "Pagar servicios") {
      useRouter.mockImplementationOnce(() => ({
        asPath: "/dashboard/services",
        push: jest.fn(),
      }));
      render(<Pageredirect variant="Pagar servicios" />, { wrapper });
    } else if (text === "Tarjetas") {
      useRouter.mockImplementationOnce(() => ({
        asPath: "/dashboard/cards",
        push: jest.fn(),
      }));
      render(<Pageredirect variant="Tarjetas" />, { wrapper });
    } else if (text === "Cerrar sesión") {
      useRouter.mockImplementationOnce(() => ({
        asPath: "/",
        push: jest.fn(),
      }));
      render(<Pageredirect variant="Cerrar sesión" />, { wrapper });
    } else {
      useRouter.mockImplementationOnce(() => ({
        asPath: "/",
        push: jest.fn(),
      }));
      render(<Pageredirect variant="No Match Text" />, { wrapper });
    }
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

  it("should have 'font-size: 11pt'", async () => {
    window.matchMedia = createMatchMedia(400);
    renderAccordingText("Inicio");

    await waitFor(() => {
      expect(screen.getByText(/inicio/i)).toHaveStyle({
        "font-size": "11pt",
        "font-weight": 900,
      });
    });
  });
  it("should have 'font-size: 12pt'", async () => {
    window.matchMedia = createMatchMedia(1000);
    renderAccordingText("Actividad");

    await waitFor(() => {
      expect(screen.getByText(/actividad/i)).toBeInTheDocument();
      expect(screen.getByText(/actividad/i)).toHaveStyle({
        "font-size": "12pt",
        "font-weight": 900,
      });
    });
  });
  it("should have 'font-size: 15pt'", async () => {
    window.matchMedia = createMatchMedia(1200);
    renderAccordingText("Tu perfil");

    await waitFor(() => {
      expect(screen.getByText(/tu perfil/i)).toBeInTheDocument();
      expect(screen.getByText(/tu perfil/i)).toHaveStyle({
        "font-size": "15pt",
        "font-weight": 900,
      });
    });
  });
  it("should redirect to 'Inicio'", async () => {
    window.matchMedia = createMatchMedia(1200);
    renderAccordingText("Inicio");

    await waitFor(() => {
      expect(screen.getByText(/inicio/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/inicio/i));
  });
  it("should redirect to 'Actividad'", async () => {
    renderAccordingText("Actividad");

    await waitFor(() => {
      expect(screen.getByText(/actividad/i)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/actividad/i));
  });
  it("should redirect to 'Tu perfil'", async () => {
    renderAccordingText("Tu perfil");

    await waitFor(() => {
      expect(screen.getByText(/tu perfil/i)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/tu perfil/i));
  });
  it("should redirect to 'Cargar dinero'", async () => {
    renderAccordingText("Cargar dinero");

    await waitFor(() => {
      expect(screen.getByText(/cargar dinero/i)).toBeInTheDocument();
      expect(screen.getByText(/cargar dinero/i)).toHaveStyle({
        "font-weight": 900,
      });
    });
    fireEvent.click(screen.getByText(/cargar dinero/i));
  });
  it("should redirect to 'Pagar servicios'", async () => {
    renderAccordingText("Pagar servicios");

    await waitFor(() => {
      expect(screen.getByText(/pagar servicios/i)).toBeInTheDocument();
      expect(screen.getByText(/pagar servicios/i)).toHaveStyle({
        "font-size": "15pt",
        "font-weight": 900,
      });
    });
    fireEvent.click(screen.getByText(/pagar servicios/i));
  });
  it("should redirect to 'Tarjetas'", async () => {
    renderAccordingText("Tarjetas");

    await waitFor(() => {
      expect(screen.getByText(/tarjetas/i)).toBeInTheDocument();
      expect(screen.getByText(/tarjetas/i)).toHaveStyle({
        "font-weight": 900,
      });
    });
    fireEvent.click(screen.getByText(/tarjetas/i));
  });
  it("should redirect to 'Cerrar sesión'", async () => {
    renderAccordingText("Cerrar sesión");
    await waitFor(() => {
      expect(screen.getByText(/cerrar sesión/i)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/cerrar sesión/i));
    });
  });
  it("should redirect ", async () => {
    renderAccordingText("No Match Text");
    await waitFor(() => {
      expect(screen.getByText(/no match text/i)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/no match text/i));
  });
});
