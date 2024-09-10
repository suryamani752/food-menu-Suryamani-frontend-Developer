import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

const mockItem = {
  strMeal: "Test Meal",
  strCategory: "Test Category",
  strArea: "Test Area",
  strInstructions: "Test Instructions",
  strMealThumb: "test-image.jpg",
};

describe("Modal Component", () => {
  test("renders the modal content correctly", () => {
    render(<Modal item={mockItem} onClose={jest.fn()} />);

    expect(screen.getByText("Test Meal")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText("Test Area")).toBeInTheDocument();
  });

  test("calls onClose when clicking outside modal or pressing the Close button", () => {
    const onClose = jest.fn();
    const { container } = render(<Modal item={mockItem} onClose={onClose} />);

    fireEvent.mouseDown(container.firstChild); // Click outside modal
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Close")); // Click on Close button
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
