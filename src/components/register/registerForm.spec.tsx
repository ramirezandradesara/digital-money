import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RegisterForm from "./RegisterForm";

describe("------- RegisterForm -------", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("When rendering the register form: ", () => {
    it("Should show the title `Crear cuenta`", () => {
      render(<RegisterForm></RegisterForm>);
      const title = screen.queryByRole("p", { name: "Crear cuenta" });
      expect(title).toBeInTheDocument;
    });

    it("Should show the text related to the registration requeriments", () => {
      render(<RegisterForm></RegisterForm>);
      const regMessage = `Usa entre 6 y 20 carácteres (debe contener al menos al menos 1 carácter especial, una mayúscula y un número)`;
      const message = screen.getByText(regMessage);
      expect(message).toBeInTheDocument;
    });

    it("Should render 7 text input for the registration form", () => {
      render(<RegisterForm></RegisterForm>);

      const textInputNombre = screen.getByPlaceholderText("Nombre*");
      const textInputApellido = screen.getByPlaceholderText("Apellido*");
      const textInputDNI = screen.getByPlaceholderText("DNI*");
      const textInputCorreo = screen.getByPlaceholderText(
        "Correo electrónico*"
      );
      const textInputContrasenia = screen.getByPlaceholderText("Contraseña*");
      const textInputContraseniaConf = screen.getByPlaceholderText(
        "Confirmar Contraseña*"
      );
      const textInputTelefono = screen.getByPlaceholderText("Teléfono*");

      expect(textInputNombre).toBeInTheDocument;
      expect(textInputDNI).toBeInTheDocument;
      expect(textInputApellido).toBeInTheDocument;
      expect(textInputCorreo).toBeInTheDocument;
      expect(textInputContrasenia).toBeInTheDocument;
      expect(textInputContraseniaConf).toBeInTheDocument;
      expect(textInputTelefono).toBeInTheDocument;
    });

    it("Should show the `Crear Cuenta` button", () => {
      render(<RegisterForm></RegisterForm>);
      const button = screen.queryByRole("button", { name: "Crear Cuenta" });
      expect(button).toBeInTheDocument;
    });

    it("Should show the error messages when there is no valid content inside the inputs", async () => {
      render(<RegisterForm></RegisterForm>);

      const errorMessage = screen.queryByText("Completa los campos requeridos");
      const button = screen.queryByLabelText(
        "crear cuenta"
      ) as HTMLButtonElement;
      fireEvent.click(button);

      await waitFor(() => expect(errorMessage).toBeVisible);
    });
  });
});
