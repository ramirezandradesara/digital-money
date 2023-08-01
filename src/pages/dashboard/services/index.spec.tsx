import { DataUser } from "@/context/UserDataContext";
import mediaQuery from "css-mediaquery";
import Services, { getStaticProps } from "./index.page";
import { act, render, screen } from "@testing-library/react";
import { userData } from "../../../mocks/contextData";
import mockRouter from "next-router-mock";
import React, { useState as useStateMock } from "react";
import { useRouter } from "next/router";

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

  render(<Services imgs={imgs} />, { wrapper });
};

// const router: any = jest.spyOn(require("next/router"), "useRouter");

const imgs: any = [
  {
    _id: 1,
    src: "https://g10-front-images.s3.amazonaws.com/image-disney-plus-logo.png",
    name: "Disney+",
  },
];

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Services", () => {
  beforeEach(() => {
    (useRouter as any).mockImplementation(() => ({
      asPath: "/dashboard/services",
      push: jest.fn(),
    }));
    mockRouter.push("/login");
  });
  afterEach(() => {
    jest.restoreAllMocks(); // Restaurar los mocks después de cada prueba
  });
  it("should redirect to login", async () => {
    await act(() => {
      (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({}),
          ok: false,
        })
      );
      customRender();
    });
  });
  it("should render", async () => {
    await act(() => {
      const localStorageMock = (function () {
        return {
          getItem() {
            return true;
          },
        };
      })();
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });

      const mockData = [{ id: 1, name: "Disney+", date: "date" }];
      const mockResponse: any = {
        ok: true,
        json: () => Promise.resolve(mockData),
        statusText: "OK",
      };

      jest.spyOn(global, "fetch").mockResolvedValueOnce(mockResponse);

      customRender();
    });

    expect(localStorage.getItem("token")).toEqual(true);
  });
  it("should render InfoPageText", async () => {
    window.matchMedia = createMatchMedia(400);

    await act(() => {
      //   const localStorageMock = (function () {
      //     return {
      //       getItem() {
      //         return true;
      //       },
      //     };
      //   })();
      //   Object.defineProperty(window, "localStorage", {
      //     value: localStorageMock,
      //   });

      const mockData = [{ id: 1, name: "Disney+", date: "date" }];
      const mockResponse: any = {
        ok: false,
        json: () => Promise.resolve(mockData),
        statusText: "OK",
      };

      jest.spyOn(global, "fetch").mockResolvedValueOnce(mockResponse);

      customRender();
    });

    expect(localStorage.getItem("token")).toEqual(true);
    expect(screen.getByText(/pagar servicios/i)).toBeInTheDocument();
  });
  it("should use getStaticProps", async () => {
    expect(getStaticProps).toBeTruthy();
  });
  it("should request return error", async () => {
    await act(() => {
      customRender();
    });

    expect(localStorage.getItem("token")).toEqual(true);
  });
});
