import React, { Context, createContext, Dispatch, useReducer } from "react";
import { Toast } from "types/Toast";

export const addToast = (toast: Toast) => {
  ToastContext.dispatch({ type: "addToast", payload: toast });

  setTimeout(() => {
    removeToast(toast);
  }, 5000);
};

export const removeToast = (toast: Toast) => {
  ToastContext.dispatch({ type: "removeToast", payload: toast });
};

type ToastContextState = {
  toasts: Toast[];
};

const initialState: ToastContextState = {
  toasts: [],
};

export type ToastActionTypes =
  | { type: "addToast"; payload: Toast }
  | { type: "removeToast"; payload: Toast };

const ToastContext = createContext<[ToastContextState, React.Dispatch<any>]>(
  null
) as Context<[ToastContextState, Dispatch<any>]> & {
  dispatch: React.Dispatch<any>;
};

let reducer = (
  state: ToastContextState,
  action: ToastActionTypes
): ToastContextState => {
  switch (action.type) {
    case "addToast":
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case "removeToast":
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload.id),
      };
    default: {
      return { ...state };
    }
  }
};

function ToastContextProvider(props) {
  let [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ToastContext.Provider value={[state, dispatch]}>
      {props.children}
    </ToastContext.Provider>
  );
}

export { ToastContext, ToastContextProvider };
