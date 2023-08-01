import { AppBarProps } from "@mui/material";
import { render, screen } from "@testing-library/react";
import GeneralHeader from "./general-header";
import mediaQuery from "css-mediaquery";
import { theme } from "@/styles/material-theme";
import { DataUser } from "../../../context/UserDataContext";
import {
  userData,
  setUserData,
  setModalFlag,
  modalFlag,
} from "../../../mocks/contextData";

const router: any = jest.spyOn(require("next/router"), "useRouter");

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

const customRender = (variant : any) => {
  const wrapper = ({ children }: any) => (
    <DataUser.Provider
      value={{ userData, setUserData, modalFlag, setModalFlag }}
    >
      {children}
    </DataUser.Provider>
  );

  render(
    <GeneralHeader variant={variant} />,
    { wrapper }
  );
};

describe("GeneralHeader", () => {
  describe('when rendering with variant "index"', () => {
    beforeEach(() => {
      router.asPath = "/";
      router.mockImplementation(() => ({
        asPath: router.asPath,
        push: jest.fn(),
      }));
    })
    it("should render with primary color", () => {
      window.matchMedia = createMatchMedia(theme.breakpoints.values.laptop);
      customRender("index" )
      const appBarElement = screen.getByTestId("appbar");
      expect(appBarElement).toHaveStyle({ backgroundColor: "primary" });
    });

    it("should render the logo with primary color", () => {
      window.matchMedia = createMatchMedia(theme.breakpoints.values.laptop);
      customRender("index" )
      const logoElement = screen.getByTestId("logo");

      expect(logoElement).toHaveAttribute("fill", "#C1FD35");
    });
  });

  describe('when rendering with variant "signIn"', () => {
    beforeEach(() => {
      router.asPath = "/";
      router.mockImplementation(() => ({
        asPath: router.asPath,
        push: jest.fn(),
      }));
    })
    it("should render with secondary color", () => {
      customRender("signIn" )
      const appBarElement = screen.getByTestId("appbar");
      expect(appBarElement).toHaveStyle({ backgroundColor: "secondary" });
    });

    it("should render the logo with secondary color", () => {
      customRender("signIn")
      const logoElement = screen.getByTestId("logo");
      expect(logoElement).toHaveAttribute("fill", "#201F22");
    });
  });

  describe('when rendering with variant "home"', () => {
    beforeEach(() => {
      router.asPath = "/";
      router.mockImplementation(() => ({
        asPath: router.asPath,
        push: jest.fn(),
      }));
    })
    it("should render with secondary color", () => {
      customRender("home")
      const appBarElement = screen.getByTestId("appbar");
      expect(appBarElement).toHaveStyle({ backgroundColor: "secondary" });
    });

    it("should render the logo with secondary color", () => {
      customRender("home")
      const logoElement = screen.getByTestId("logo");
      expect(logoElement).toHaveAttribute("fill", "#C1FD35");
    });
  });
});
