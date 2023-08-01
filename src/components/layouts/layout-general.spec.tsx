import { render, screen } from "@testing-library/react";
import GeneralLayout from "./layout-general";
import { DataUser } from "../../context/UserDataContext";
import {
  userData,
  setUserData,
  setModalFlag,
  modalFlag,
} from "../../mocks/contextData";

const router: any = jest.spyOn(require("next/router"), "useRouter");

const customRender = () => {
  const wrapper = ({ children }: any) => (
    <DataUser.Provider
      value={{ userData, setUserData, modalFlag, setModalFlag }}
    >
      {children}
    </DataUser.Provider>
  );

  render(
    <GeneralLayout>
      <h1>Texto Prueba</h1>
    </GeneralLayout>,
    { wrapper }
  );
};

describe("GeneralLayout", () => {
  describe("When render default", () => {
    it("should render children components", () => {
      router.asPath = "/";
      router.mockImplementation(() => ({
        asPath: router.asPath,
        push: jest.fn(),
      }));
      customRender();

      const h1 = screen.getByText("Texto Prueba");
      expect(h1).toBeInTheDocument();
    });
  });
});
