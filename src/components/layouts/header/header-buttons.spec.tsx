import { render, getByText, fireEvent, screen } from "@testing-library/react";

import mockRouter from "next-router-mock";
import HeaderButtons from "./header-buttons";

jest.mock("next/router", () => require("next-router-mock"));
//global.localStorage.setItem('token','asdasdasdsad');
const router: any = jest.spyOn(require("next/router"), "useRouter");

describe("HeaderButtons", () => {
  describe("When index render", () => {
    it("should render index buttons", () => {
      const component = render(<HeaderButtons variant="index" />);
      const btnIngresar = component.getByText("Ingresar");
      const btnCrear = component.getByText("Crear cuenta");
      expect(btnIngresar).toBeInTheDocument();
      expect(btnCrear).toBeInTheDocument();
    });
    it("should navigate to login", () => {
      mockRouter.push("/");
      const component = render(<HeaderButtons variant="index" />);
      const btnIngresar = component.getByText("Ingresar");
      fireEvent.click(btnIngresar);
      expect(mockRouter.asPath).toEqual("/login");
    });
    /* it('should navigate to register'); */
  });
  describe("When signIn render", () => {
    it("should render signIn button", () => {
      router.mockImplementationOnce(() => ({
        asPath: "/register",
      }));
      const component = render(<HeaderButtons variant="signIn" />);
      const btnIngresar = component.getByText("Iniciar sesion");
      expect(btnIngresar).toBeInTheDocument();
    });
    it("should navigate to login", () => {
      router.asPath = "/register";
      router.mockImplementationOnce(() => ({
        asPath: router.asPath,
        push: jest.fn(),
      }));
      mockRouter.push("/login");
      const component = render(<HeaderButtons variant="signIn" />);
      const btnIngresar = component.getByText("Iniciar sesion");
      fireEvent.click(btnIngresar);
      expect(mockRouter.asPath).toEqual("/login");
    });
  });
  //   describe("When home render", () => {
  //     global.localStorage.removeItem("token");
  //     it("should render home button", () => {
  //       global.localStorage.setItem("token", "asdasdasdsad");
  //       const component = render(<HeaderButtons variant="home" />);
  //       const btnIngresar = component.getByText("Cerrar sesión");
  //       expect(btnIngresar).toBeInTheDocument();
  //     });
  //   });
});
