import { fireEvent, render, screen } from "@testing-library/react";
import SideMenuMobile from "./sideMenuMobile";
import { DataUser } from "../../../context/UserDataContext";
import { setModalFlag } from "../../../mocks/contextData";

const customRender = () => {
  const wrapper = ({ children }: any) => (
    <DataUser.Provider value={{ setModalFlag }}>{children}</DataUser.Provider>
  );

  render(<SideMenuMobile />, { wrapper });
};

const router: any = jest
  .spyOn(require("next/router"), "useRouter")
  .mockImplementation(() => ({
    asPath: "/dashboard",
    push: jest.fn(),
  }));

describe("SideMenuMobile", () => {
  it("should hide", () => {
    customRender();
    expect(screen.getByTestId("hide-side-menu-mobile")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("hide-side-menu-mobile"));
  });
});
