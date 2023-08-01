import { createContext, Dispatch, useMemo, useReducer } from "react";

export interface IFilterInfo {
  operation: string;
  period: string;
  amount: string;
  search: string;
}

export const filterInitialState: IFilterInfo = {
  operation: "",
  period: "",
  amount: "",
  search: "",
};

type Operation = {
  type: "OPERATION";
  payload: string;
};
type Period = {
  type: "PERIOD";
  payload: string;
};
type Amount = {
  type: "AMOUNT";
  payload: string;
};
type Search = {
  type: "SEARCH";
  payload: string;
};
type DeleteFilters = {
  type: "DELETE_FILTERS";
};

type TReducerAction = Operation | Period | Amount | Search | DeleteFilters;

const filterInfoReducer = (state: IFilterInfo, action: TReducerAction) => {
  switch (action.type) {
    case "OPERATION":
      return {
        ...state,
        operation: action.payload,
      };
    case "PERIOD":
      return {
        ...state,
        period: action.payload,
      };
    case "AMOUNT":
      return {
        ...state,
        amount: action.payload,
      };
    case "SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    case "DELETE_FILTERS":
      return {
        operation: "",
        period: "",
        amount: "",
        search: "",
      };
    default:
      return state;
  }
};

export interface IActivityContext {
  filterInfo: IFilterInfo;
  dispatch: Dispatch<TReducerAction>;
}

export const ActivityContext = createContext<IActivityContext | undefined>(
  undefined
);

export default function ActivityProvider({ children }: any) {
  const [filterInfo, dispatch] = useReducer(
    filterInfoReducer,
    filterInitialState
  );
  const value = useMemo(
    () => ({
      filterInfo,
      dispatch,
    }),
    [filterInfo, dispatch]
  );

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}
