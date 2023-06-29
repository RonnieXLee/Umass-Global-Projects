import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

it("renders without crashing", function() {
  render(<Card />);
});

it("matches snapshot", function() {
  const { container } = render(<Card />);
  expect(container).toMatchSnapshot();
});
