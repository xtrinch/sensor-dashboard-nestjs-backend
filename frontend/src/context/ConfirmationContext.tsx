import React, { Context, createContext, Dispatch, useReducer } from "react";

export const openConfirmation = (
  onConfirm: Function,
  onClose?: Function,
  content?: string
) => {
  ConfirmationContext.dispatch({
    type: "openConfirmation",
    payload: {
      onConfirm,
      onClose,
      content,
    },
  });
};

export const closeConfirmation = () => {
  ConfirmationContext.dispatch({ type: "closeConfirmation" });
};

export const confirm = async (state: ConfirmationContextState) => {
  ConfirmationContext.dispatch({ type: "closing" });

  if (state.onConfirm) {
    try {
      await state.onConfirm();
    } catch (e) {
      ConfirmationContext.dispatch({ type: "closeConfirmation" });
      throw e;
    }
  }

  ConfirmationContext.dispatch({ type: "closeConfirmation" });
};

export const close = async (state: ConfirmationContextState) => {
  ConfirmationContext.dispatch({ type: "closing" });

  if (state.onClose) {
    await state.onClose();
  }

  ConfirmationContext.dispatch({ type: "closeConfirmation" });
};

type ConfirmationContextState = {
  onConfirm: Function;
  onClose: Function;
  loading: boolean;
  content: string;
  open: boolean;
};

const initialState: ConfirmationContextState = {
  onConfirm: null,
  onClose: null,
  loading: false,
  content: "",
  open: false,
};

export type ConfirmationActionTypes =
  | {
      type: "openConfirmation";
      payload: { onConfirm: Function; onClose?: Function; content?: string };
    }
  | { type: "closeConfirmation" }
  | { type: "closing" };

const ConfirmationContext = createContext<
  [ConfirmationContextState, React.Dispatch<any>]
>(null) as Context<[ConfirmationContextState, Dispatch<any>]> & {
  dispatch: React.Dispatch<any>;
};

let reducer = (
  state: ConfirmationContextState,
  action: ConfirmationActionTypes
): ConfirmationContextState => {
  switch (action.type) {
    case "openConfirmation":
      return {
        ...state,
        ...action.payload,
        open: true,
      };
    case "closeConfirmation":
      return {
        ...state,
        onConfirm: undefined,
        onClose: undefined,
        loading: false,
        open: false,
      };
    case "closing":
      return {
        ...state,
        loading: true,
      };
    default: {
      return { ...state };
    }
  }
};

function ConfirmationContextProvider(props) {
  let [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ConfirmationContext.Provider value={[state, dispatch]}>
      {props.children}
    </ConfirmationContext.Provider>
  );
}

export { ConfirmationContext, ConfirmationContextProvider };
