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
import ForwarderService from "services/ForwarderService";
import Forwarder, { ForwarderId } from "types/Forwarder";
import { Toast } from "types/Toast";

export const reload = async (accountContext: AccountContextState) => {
  if (accountContext.loginState === "LOGGED_OUT") {
    return;
  }

  const resp = await ForwarderService.listForwarders();
  const forwarderData = resp.items;

  ForwarderContext.dispatch({
    type: "forwarderReady",
    payload: forwarderData,
  });
};

export const addForwarder = async (
  forwarder: Partial<Forwarder>
): Promise<Forwarder> => {
  const s = await ForwarderService.addForwarder(forwarder);

  ForwarderContext.dispatch({
    type: "addForwarder",
    payload: s,
  });

  addToast(
    new Toast({ message: "Successfully added a forwarder", type: "success" })
  );

  return s;
};

export const updateForwarder = async (
  id: ForwarderId,
  forwarder: Partial<Forwarder>
): Promise<Forwarder> => {
  const s = await ForwarderService.updateForwarder(id, forwarder);

  ForwarderContext.dispatch({
    type: "updateForwarder",
    payload: s,
  });

  addToast(
    new Toast({
      message: "Successfully updated the forwarder",
      type: "success",
    })
  );

  return s;
};

export const deleteForwarder = async (id: ForwarderId): Promise<boolean> => {
  await ForwarderService.deleteForwarder(id);

  ForwarderContext.dispatch({
    type: "deleteForwarder",
    payload: id,
  });

  addToast(
    new Toast({
      message: "Successfully deleted the forwarder",
      type: "success",
    })
  );

  return true;
};

type ForwarderContextState = {
  forwardersLoaded: boolean;
  forwarders: Forwarder[];
};

const initialState: ForwarderContextState = {
  forwarders: [],
  forwardersLoaded: false,
};

export type ForwarderActionTypes =
  | { type: "forwarderReady"; payload: Forwarder[] }
  | { type: "updateForwarder"; payload: Forwarder }
  | { type: "addForwarder"; payload: Forwarder }
  | { type: "deleteForwarder"; payload: ForwarderId };

const ForwarderContext = createContext<
  [ForwarderContextState, React.Dispatch<any>]
>(null) as Context<[ForwarderContextState, Dispatch<any>]> & {
  dispatch: React.Dispatch<any>;
};

let reducer = (
  state: ForwarderContextState,
  action: ForwarderActionTypes
): ForwarderContextState => {
  switch (action.type) {
    case "forwarderReady":
      return { ...state, forwarders: action.payload, forwardersLoaded: true };
    case "updateForwarder":
      const forwarders = state.forwarders;
      const forwarderIndex = forwarders.findIndex(
        (s) => s.id === action.payload.id
      );
      forwarders[forwarderIndex] = action.payload;
      return { ...state, forwarders: [...forwarders] };
    case "addForwarder":
      return { ...state, forwarders: [...state.forwarders, action.payload] };
    case "deleteForwarder":
      const idx = state.forwarders.findIndex((s) => s.id === action.payload);
      state.forwarders.splice(idx, 1);
      return { ...state };
    default: {
      return { ...state, forwarders: [] };
    }
  }
};

function ForwarderContextProvider(props) {
  let [state, dispatch] = useReducer(reducer, initialState);
  let [accountContext] = useContext(AccountContext);

  useEffect(() => {
    if (!state.forwardersLoaded) {
      reload(accountContext);
    }
  }, [state, accountContext]); // The empty array causes this effect to only run on mount

  return (
    <ForwarderContext.Provider value={[state, dispatch]}>
      {props.children}
    </ForwarderContext.Provider>
  );
}

export { ForwarderContext, ForwarderContextProvider };
