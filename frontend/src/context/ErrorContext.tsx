import React, { Context, createContext, Dispatch, useReducer } from "react";

export interface Error {
  statusCode: string;
  message: string;
}

export const setError = (error: Error, dispatch?: React.Dispatch<any>) => {
  let dp = dispatch;
  if (!dp) {
    dp = ErrorContext.dispatch;
  }
  dp({ type: "setError", payload: error });
};

export const clearError = (dispatch: React.Dispatch<any>) => {
  dispatch({ type: "clearError" });
};

type ErrorContextState = {
  error: Error;
};

const initialState: ErrorContextState = {
  error: null,
};

export type ErrorActionTypes =
  | { type: "setError"; payload: Error }
  | { type: "clearError" };

const ErrorContext = createContext<[ErrorContextState, React.Dispatch<any>]>(
  null
) as Context<[ErrorContextState, Dispatch<any>]> & {
  dispatch: React.Dispatch<any>;
};

let reducer = (
  state: ErrorContextState,
  action: ErrorActionTypes
): ErrorContextState => {
  switch (action.type) {
    case "setError":
      return {
        ...state,
        error: action.payload,
      };
    case "clearError":
      return {
        ...state,
        error: null,
      };
    default: {
      return { ...state };
    }
  }
};

function ErrorContextProvider(props) {
  let [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ErrorContext.Provider value={[state, dispatch]}>
      {props.children}
    </ErrorContext.Provider>
  );
}

export { ErrorContext, ErrorContextProvider };
