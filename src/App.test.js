import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/Table", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

jest.mock("./components/Chart", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

test("renders page heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/live air quality monitoring/i);
  expect(headingElement).toBeInTheDocument();
});
