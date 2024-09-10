import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FoodItemCard from "./FoodItemCard";

const mockItem = {
  strMeal: "Spaghetti Bolognese",
  strMealThumb: "test-image.jpg",
};

// Mock function for handling clicks
const mockOnClick = jest.fn();

describe("FoodItemCard Component", () => {
  test("renders food item details correctly", () => {
    render(<FoodItemCard item={mockItem} onClick={mockOnClick} />);

    // Check for item details
    expect(screen.getByText(/Spaghetti Bolognese/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Spaghetti Bolognese/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating:/i)).toBeInTheDocument();
  });

  test("calls onClick with the correct item when clicked", () => {
    render(<FoodItemCard item={mockItem} onClick={mockOnClick} />);

    // Simulate a click event
    fireEvent.click(screen.getByText(/Spaghetti Bolognese/i));

    // Check if onClick is called with the correct item
    expect(mockOnClick).toHaveBeenCalledWith(mockItem);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
