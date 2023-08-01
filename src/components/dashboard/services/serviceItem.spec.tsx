import { DataUser } from "../../../context/UserDataContext";
import { render, screen } from "@testing-library/react";
import ServiceItem from "./ServiceItem";
import mediaQuery from "css-mediaquery";

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

const service: any = {
  id: 1,
  name: "Disney+",
  date: "date",
};

const imgs: any = [
  { id: 1, name: "Disney+", date: "date" },
  { id: 2, name: "Netflix", date: "date" },
];

const customRender = () => {
  const wrapper = ({ children }: any) => (
    <DataUser.Provider value={{}}>{children}</DataUser.Provider>
  );

  render(<ServiceItem imgs={imgs} service={service} />, { wrapper });
};

describe("ServiceItem", () => {
  it("should render service name", () => {
    customRender();
    expect(screen.getByText(/seleccionar/i)).toBeInTheDocument();
    expect(screen.getByText(/disney+/i)).toBeInTheDocument();
  });
  it("should change to mobile styles", () => {
    window.matchMedia = createMatchMedia(400);
    customRender();
    expect(screen.getByText(/seleccionar/i)).toHaveStyle({
      "font-size": "14px",
    });
    expect(screen.getByText(/disney+/i)).toHaveStyle({
      "font-size": "13px",
    });
    expect(screen.getByText(/disney+/i)).toHaveStyle({
      "font-size": "13px",
    });
    expect(screen.getByTestId("image-container-service-item")).toBeInTheDocument();
    expect(screen.getByTestId("image-container-service-item")).toHaveStyle({
        "max-height": "40px",
        "max-width": "70px",
        "min-height": "40px",
        "min-width": "70px",
      });
      expect(screen.getByTestId("second-container-service-item")).toBeInTheDocument();
    expect(screen.getByTestId("second-container-service-item")).toHaveStyle({
        "gap": "8px", 
      });
      
  });
});
