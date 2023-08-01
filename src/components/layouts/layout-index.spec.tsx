import { render, screen } from "@testing-library/react";
import IndexLayout from "./layout-index";
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
    <IndexLayout>
      <h1>Test Text</h1>
    </IndexLayout>,
    { wrapper }
  );
};

describe("GeneralLayout", () => {
  describe("When render default", () => {
    it("should render children components", () => {
      router.asPath = "/register";
      router.mockImplementation(() => ({
        asPath: router.asPath,
        push: jest.fn(),
      }));
      customRender();

      const h1 = screen.getByText("Test Text");
      expect(h1).toBeInTheDocument();
    });
  });
});
