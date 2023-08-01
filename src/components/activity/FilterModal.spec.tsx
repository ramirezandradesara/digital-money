import { render, screen } from "@testing-library/react";
import FilterModal from "./FilterModal";
import "@testing-library/jest-dom";
import {
  ActivityContext,
  IFilterInfo,
} from "../../context/activity/ActivityContext";

describe("------- Filter Modal -------", () => {
  describe("Testing filters: ", () => {
    const periodOptions: any = ["Hoy"];
    const amountOptions: any = ["Money"];
    const operationOptions: any = ["Egresos"]
    const mockFilterInfo: IFilterInfo = {
      operation: '',
      period: '',
      amount: '',
      search: '',
    };
    const mockDispatch = jest.fn();
    const mockContextValue = {
        filterInfo: mockFilterInfo,
        dispatch: mockDispatch,
      };

    const customRenderOperation = () => {
      const wrapper = ({ children }: any) => (
        <ActivityContext.Provider value={mockContextValue}>
          {children}
        </ActivityContext.Provider>
      );
      render(
        <FilterModal
          filterOptions={operationOptions}
          filterType="OPERATION"
        />,
        { wrapper }
      );
    };

    const customRenderAmount = () => {
      const wrapper = ({ children }: any) => (
        <ActivityContext.Provider value={mockContextValue}>
          {children}
        </ActivityContext.Provider>
      );
      render(
        <FilterModal
          filterOptions={amountOptions}
          filterType="AMOUNT"
        />,
        { wrapper }
      );
    };

    const customRenderPeriod = () => {
      const wrapper = ({ children }: any) => (
        <ActivityContext.Provider value={mockContextValue}>
          {children}
        </ActivityContext.Provider>
      );
      render(
        <FilterModal
          filterOptions={periodOptions}
          filterType="PERIOD"
        />,
        { wrapper }
      );
    };

    it("Should render the corresponding filter for Operation", async () => {
      customRenderOperation();
      expect(screen.getByText('Egresos')).toBeInTheDocument();
    });

    it("Should render the corresponding filter for Ammount", async () => {
      customRenderAmount();
      expect(screen.getByText('Money')).toBeInTheDocument();
    });

    it("Should render the corresponding filter for Period", async () => {
      customRenderPeriod();
      expect(screen.getByText('Hoy')).toBeInTheDocument();
    });
  });
});

