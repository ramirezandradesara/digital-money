import { render, screen } from "@testing-library/react";
import VerticalTabs from "./VerticalTabs";
import "@testing-library/jest-dom";
import { ActivityContext } from "../../context/activity/ActivityContext";

describe("------- Vertical Tabs -------", () => {
  describe("Testing tabs: ", () => {
    const mockDispatch = jest.fn();

    const mockIActivityContext = {
      filterInfo: {
        operation: "",
        period: "",
        amount: "",
        search: "",
      },
      dispatch: mockDispatch,
    };

    beforeEach(() => {
      render(
        <ActivityContext.Provider value={mockIActivityContext}>
          <VerticalTabs setModal={() => {}} />
        </ActivityContext.Provider>
      );
    });

    it('should render tab "Operación"', () => {
      const tab = screen.getByText("Operación");
      expect(tab).toBeInTheDocument();
    });

    it('should render tab "Período"', () => {
      const tab = screen.getByText("Período");
      expect(tab).toBeInTheDocument();
    });

    it('should render tab "Operación" selected', () => {
      const tab = screen.getByText("Operación");
      expect(tab).toHaveClass("Mui-selected");
    });
  });
});
