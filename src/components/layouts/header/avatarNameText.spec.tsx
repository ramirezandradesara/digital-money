import AvatarNameText from "./avatarNameText";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DataUser } from "../../../context/UserDataContext";
import mediaQuery from "css-mediaquery";
import mockRouter from "next-router-mock";
import { userData } from "../../../mocks/contextData";

describe("AvatarNameText ", () => {
  const userDataNull = null;
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

  const customRender = () => {
    const wrapper = ({ children }: any) => (
      <DataUser.Provider value={{ userData }}>{children}</DataUser.Provider>
    );

    render(<AvatarNameText />, { wrapper });
  };
  const customRenderNullData = () => {
    const wrapper = ({ children }: any) => (
      <DataUser.Provider value={{ userDataNull }}>{children}</DataUser.Provider>
    );

    render(<AvatarNameText />, { wrapper });
  };

  it("should render user first name and last name ", async () => {
    window.matchMedia = createMatchMedia(1200);
    customRender();
    await waitFor(() => {
      expect(screen.getByText(/luis alvarez/i)).toBeInTheDocument();
    });
  });
  it("should redirect to dashboard ", async () => {
    window.matchMedia = createMatchMedia(1200);
    router.asPath = "/dashboard";
    router.mockImplementation(() => ({
      asPath: router.asPath,
      push: jest.fn(),
    }));
    customRender();
    await waitFor(() => {
      expect(screen.getByText(/luis alvarez/i)).toBeInTheDocument();
      mockRouter.push("/dashboard");
      fireEvent.click(screen.getByText(/luis alvarez/i));
      expect(mockRouter.asPath).toEqual("/dashboard");
    });
  });
  it("should render with desktop styles", async () => {
    window.matchMedia = createMatchMedia(1200);
    customRender();
    await waitFor(() => {
      expect(screen.getByTestId("container-avatar-name-text")).toHaveStyle({
        display: "flex",
        color: "white",
      });
      expect(screen.getByText(/luis alvarez/i)).toHaveStyle({
        "font-size": "13pt",
        "font-weight": 500,
      });
    });
  });
  it("should change styles to mobile mediaquery ", async () => {
    window.matchMedia = createMatchMedia(400);
    customRender();

    await waitFor(() => {
      expect(screen.getByTestId("container-avatar-name-text")).toHaveStyle({
        display: "column",
        "justify-content": "flex-end",
        color: "rgb(156, 39, 176)",
      });
      expect(screen.getByText(/luis alvarez/i)).toHaveStyle({
        "font-size": "10pt",
        "font-weight": 500,
      });
    });
  });
  it("should render Skeleton component ", async () => {
    window.matchMedia = createMatchMedia(1200);
    customRenderNullData();
    await waitFor(() => {
      expect(
        screen.getByTestId("skeleton-avatar-name-text")
      ).toBeInTheDocument();
    });
  });
});
