import {
  render,
  screen,
  getByAltText,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Login from "./login.page";
import { DataUser } from "../context/UserDataContext";
import {
  userData,
  setUserData,
  setModalFlag,
  modalFlag,
} from "../mocks/contextData";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

describe("LoginPage", () => {
  const customRender = () => {
    const wrapper = ({ children }: any) => (
      <DataUser.Provider
        value={{ userData, setUserData, modalFlag, setModalFlag }}
      >
        {children}
      </DataUser.Provider>
    );

    render(<Login />, { wrapper });
  };

  it("should render button continuar", () => {
    customRender();
    const button = screen.getByRole("button", { name: /continuar/i });
    expect(button).toBeInTheDocument();
  });

  it("should render button crear cuenta", () => {
    customRender();
    const button = screen.getByRole("button", { name: /crear cuenta/i });
    expect(button).toBeInTheDocument();
  });

  it("should render input", () => {
    customRender();

    const emailInput = screen.getByLabelText("Correo electronico");
    expect(emailInput).toBeInTheDocument();
  });

  it("full steps valid", async () => {
    const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
    useRouterMock.mockImplementation(() => ({
      push: pushMock,
    }));
    customRender();

    //PASO 1
    const emailInput = screen.getByLabelText("Correo electronico");
    expect(emailInput).toBeInTheDocument();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            error: "Invalid credentials",
            message: "Invalid credentials",
          }),
      })
    ) as jest.Mock;

    const email = "test@gmail.com";

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: email } });
    });

    expect(emailInput).toHaveValue(email);

    await act(async () => {
      const continueButton = screen.getByRole("button", { name: /continuar/i });
      expect(continueButton).toBeInTheDocument();

      fireEvent.click(continueButton);
    });

    //PASO 2
    const passwordInput = screen.getByLabelText("Contraseña");
    expect(passwordInput).toBeInTheDocument();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            token: "token",
          }),
      })
    ) as jest.Mock;

    const password = "test123";

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: password } });
    });

    expect(passwordInput).toHaveValue(password);

    await act(async () => {
      const continueButton = screen.getByRole("button", { name: /continuar/i });
      expect(continueButton).toBeInTheDocument();

      fireEvent.click(continueButton);
    });

    await waitFor(async () => {
      expect(pushMock).toBeCalledWith("/dashboard");
    });
  });

  it("should redirect to register", async () => {
    const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
    useRouterMock.mockImplementation(() => ({
      push: pushMock,
    }));
    customRender();

    const button = screen.getByRole("button", { name: /crear cuenta/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    await waitFor(async () => {
      expect(pushMock).toBeCalledWith("/register");
    });
  });

  it("should render helpertext on email", async () => {
    customRender();

    //PASO 1
    const emailInput = screen.getByLabelText("Correo electronico");
    expect(emailInput).toBeInTheDocument();

    await act(async () => {
      const continueButton = screen.getByRole("button", { name: /continuar/i });
      expect(continueButton).toBeInTheDocument();

      fireEvent.click(continueButton);
    });

    const error = screen.getByText(/correo electronico es requerido/i);

    expect(error).toBeInTheDocument();
  });
});
