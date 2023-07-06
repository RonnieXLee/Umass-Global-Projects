import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";

it("renders without crashing", function () {
  render(<NewTodoForm />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<NewTodoForm />);
  expect(asFragment()).toMatchSnapshot();
});

it("runs the createTodo function on form submit", function () {
  const createMock = jest.fn();
  const { getByText, getByLabelText } = render(
    <NewTodoForm createTodo={createMock} />
  );

  const taskInput = getByLabelText("Task:");
  const createButton = getByText("Add a todo!");

  fireEvent.change(taskInput, { target: { value: "Test Task" } });
  fireEvent.click(createButton);

  expect(createMock).toHaveBeenCalledWith({
    task: "Test Task",
    id: expect.any(String),
  });
});
