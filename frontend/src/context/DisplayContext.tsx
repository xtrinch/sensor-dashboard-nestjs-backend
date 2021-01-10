import { AccountContext, AccountContextState } from "context/AccountContext";
import { addToast } from "context/ToastContext";
import React, {
  Context,
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";
import DisplayService from "services/DisplayService";
import Display, { DisplayId } from "types/Display";
import { Toast } from "types/Toast";

export const reload = async (accountContext: AccountContextState) => {
  if (accountContext.loginState === "LOGGED_OUT") {
    return;
  }

  const resp = await DisplayService.listDisplays();
  const displayData = resp.items;

  DisplayContext.dispatch({
    type: "displayReady",
    payload: displayData,
  });
};

export const addDisplay = async (
  display: Partial<Display>
): Promise<Display> => {
  const s = await DisplayService.addDisplay(display);

  DisplayContext.dispatch({
    type: "addDisplay",
    payload: s,
  });

  addToast(
    new Toast({ message: "Successfully added a display", type: "success" })
  );

  return s;
};

export const updateDisplay = async (
  id: DisplayId,
  display: Partial<Display>
): Promise<Display> => {
  const s = await DisplayService.updateDisplay(id, display);

  DisplayContext.dispatch({
    type: "updateDisplay",
    payload: s,
  });

  addToast(
    new Toast({ message: "Successfully updated the display", type: "success" })
  );

  return s;
};

export const deleteDisplay = async (id: DisplayId): Promise<boolean> => {
  await DisplayService.deleteDisplay(id);

  DisplayContext.dispatch({
    type: "deleteDisplay",
    payload: id,
  });

  addToast(
    new Toast({ message: "Successfully deleted the display", type: "success" })
  );

  return true;
};

type DisplayContextState = {
  displaysLoaded: boolean;
  displays: Display[];
};

const initialState: DisplayContextState = {
  displays: [],
  displaysLoaded: false,
};

export type DisplayActionTypes =
  | { type: "displayReady"; payload: Display[] }
  | { type: "updateDisplay"; payload: Display }
  | { type: "addDisplay"; payload: Display }
  | { type: "deleteDisplay"; payload: DisplayId };

const DisplayContext = createContext<
  [DisplayContextState, React.Dispatch<any>]
>(null) as Context<[DisplayContextState, Dispatch<any>]> & {
  dispatch: React.Dispatch<any>;
};

let reducer = (
  state: DisplayContextState,
  action: DisplayActionTypes
): DisplayContextState => {
  switch (action.type) {
    case "displayReady":
      return { ...state, displays: action.payload, displaysLoaded: true };
    case "updateDisplay":
      const displays = state.displays;
      const displayIndex = displays.findIndex(
        (s) => s.id === action.payload.id
      );
      displays[displayIndex] = action.payload;
      return { ...state, displays: [...displays] };
    case "addDisplay":
      return { ...state, displays: [...state.displays, action.payload] };
    case "deleteDisplay":
      const idx = state.displays.findIndex((s) => s.id === action.payload);
      state.displays.splice(idx, 1);
      return { ...state };
    default: {
      return { ...state, displays: [] };
    }
  }
};

function DisplayContextProvider(props) {
  let [state, dispatch] = useReducer(reducer, initialState);
  let [accountContext] = useContext(AccountContext);

  useEffect(() => {
    if (!state.displaysLoaded) {
      reload(accountContext);
    }
  }, [state, accountContext]); // The empty array causes this effect to only run on mount

  return (
    <DisplayContext.Provider value={[state, dispatch]}>
      {props.children}
    </DisplayContext.Provider>
  );
}

export { DisplayContext, DisplayContextProvider };
