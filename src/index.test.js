import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// jest.mock('react-dom', () => ({render: jest.fn()}))

jest.mock("react-dom", () => {
  return {
    render: jest.fn(),
  };
});

// test('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<React.StrictMode><App /></React.StrictMode>);
//     global.document.getElementById = (id) => id ==='root' && div
//     expect(ReactDOM.render).toHaveBeenCalledWith(<React.StrictMode><App /></React.StrictMode>)
// });

test("renders without crashing", () => {
  // Create and append to document body
  // an HTML element with id = root
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);

  // Requires index.js so that react-dom render method is called
  require("./index.js");

  // Asserts render was called with <App />
  // and HTML element with id = root
  expect(ReactDOM.render).toHaveBeenCalledWith(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root
  );
});
