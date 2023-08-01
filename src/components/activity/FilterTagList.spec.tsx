import { render, screen } from "@testing-library/react";
import FilterTagList from "./FilterTagList";
import "@testing-library/jest-dom";
import { ActivityContext } from "../../context/activity/ActivityContext";

describe("------- Filter Tag List -------", () => {
    describe("Testing Filter Tag List: ", () => {
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
            <FilterTagList />
            </ActivityContext.Provider>
        );
        });
    
        it("should render text 'Filtros aplicados:'", () => {
        const text = screen.getByText("Filtros aplicados:");
        expect(text).toBeInTheDocument();
        });
    });
    }   );

