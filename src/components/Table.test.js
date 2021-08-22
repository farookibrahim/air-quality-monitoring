import { render, screen } from "@testing-library/react";
import Table from "./Table";

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

test("renders page heading", () => {
  render(<Table values={[...values]} />);
  const tableColumnOneHeading = screen.getByText(/city/i);
  expect(tableColumnOneHeading).toBeInTheDocument();
  const tableColumnTwoHeading = screen.getByText(/current aqi/i);
  expect(tableColumnTwoHeading).toBeInTheDocument();
  const tableColumnThreeHeading = screen.getByText(/last updated/i);
  expect(tableColumnThreeHeading).toBeInTheDocument();
});
