import { render, screen } from "@testing-library/react";
import RegisterSuccess from "./success.page";
import "@testing-library/jest-dom/extend-expect";

describe("RegisterSuccess", () => {
  describe("when rendering the page", () => {
    it("should render the title", () => {
      render(<RegisterSuccess />);

      const successTitle = screen.getByText("Registro Exitoso");
      expect(successTitle).toBeInTheDocument();
    });

    it("should render the continue button", () => {
      render(<RegisterSuccess />);

      const continueButton = screen.getByText("Continuar");
      expect(continueButton).toBeInTheDocument();
    });
  });
});
