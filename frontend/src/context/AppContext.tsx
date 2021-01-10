import React, { Context, createContext, Dispatch, useReducer } from "react";
import DomainTypeEnum from "types/DomainTypeEnum";
import { DateRange, DateRangeEnum, DateRegex } from "utils/date.range";

export const drawerToggle = () => {
  AppContext.dispatch({ type: "toggle" });
};

export const setDomain = (domain: DomainTypeEnum) => {
  AppContext.dispatch({ type: "setDomain", payload: domain });
};

type AppContextState = {
  menuOpen: boolean;
  groupBy: DateRangeEnum;
  date: DateRegex;
  domain: DomainTypeEnum;
};

const initialState: AppContextState = {
  menuOpen: false,
  groupBy: DateRangeEnum.day,
  date: DateRange.getDateString(new Date(), DateRangeEnum.day),
  domain: DomainTypeEnum.FULL,
};

const AppContext = createContext<[AppContextState, React.Dispatch<any>]>(
  null
) as Context<[AppContextState, Dispatch<any>]> & {
  dispatch: React.Dispatch<any>;
};

let reducer = (state: AppContextState, action): AppContextState => {
  switch (action.type) {
    case "toggle":
      return { ...state, menuOpen: !state.menuOpen };
    case "setDate":
      return { ...state, date: action.payload };
    case "setGroupBy":
      return { ...state, groupBy: action.payload };
    case "setDomain":
      return { ...state, domain: action.payload };
    default: {
      return state;
    }
  }
};

function AppContextProvider(props) {
  let [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };
