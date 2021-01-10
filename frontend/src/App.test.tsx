import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders sensors page", () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/added sensors/i);
  expect(titleElement).toBeInTheDocument();
});
