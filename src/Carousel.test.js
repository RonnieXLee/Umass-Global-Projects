import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", function () {
  // Test that the Carousel component renders without crashing
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});

it("matches snapshot", function () {
  // Test that the rendered Carousel component matches the snapshot
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  expect(container).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  // Test that the Carousel advances when the right arrow is clicked
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("hides and shows arrows appropriately", function () {
  // Test that the arrows are hidden or shown appropriately when navigating the Carousel
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  const rightArrow = container.querySelector(".bi-arrow-right-circle");

  // expect the left arrow to be missing, but the right button to be present.
  expect(leftArrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  // move forward, expect both arrow to exist
  fireEvent.click(rightArrow);
  // expect the left arrow to be missing, but the right button to be present.
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  // move forward again, expect only the right arrow to be missing
  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).toHaveClass("hidden");
});

it("works when you click on the left arrow", function () {
  // Test that the Carousel goes back when the left arrow is clicked
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  const rightArrow = container.querySelector(".bi-arrow-right-circle");

  // move to the right
  fireEvent.click(rightArrow);

  // move back to the left, expect the first image to show
  fireEvent.click(leftArrow);
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});
