import { render, screen } from "@testing-library/react";
import Chart from "./Chart";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

jest.mock("apexcharts", () => {
  return {
    exec: () => {
      return null;
    },
  };
});

const values = [
  {
    city: "Bengaluru",
    aqi: 190.39330187909115,
    updated: "2021-08-19T11:40:25.129Z",
  },
  {
    city: "Chennai",
    aqi: 143.54146931605436,
    updated: "2021-08-19T11:40:23.070Z",
  },
];

test("renders chart heading", () => {
  render(<Chart values={[...values]} />);
  const headingElement = screen.getByText(/comparison chart/i);
  expect(headingElement).toBeInTheDocument();
});
