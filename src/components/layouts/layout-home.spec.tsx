import { render, screen } from "@testing-library/react";
import HomeLayout from "./layout-home";
import { DataUser } from "../../context/UserDataContext";

const modalFlag = false;

const setModalFlag = jest.fn();

const router: any = jest.spyOn(require("next/router"), "useRouter");

const customRender = () => {
  const wrapper = ({ children }: any) => (
    <DataUser.Provider value={{ modalFlag, setModalFlag }}>
      {children}
    </DataUser.Provider>
  );

  render(
    <HomeLayout>
      <h1>Test text</h1>
    </HomeLayout>,
    { wrapper }
  );
};

describe("GeneralLayout", () => {
  describe("When render default", () => {
    it("should render children components", () => {
      router.asPath = "/dashboard";
      router.mockImplementation(() => ({
        asPath: router.asPath,
        push: jest.fn(),
      }));
      customRender();
      const h1 = screen.getByText("Test text");
      expect(h1).toBeInTheDocument();
    });
  });
});
