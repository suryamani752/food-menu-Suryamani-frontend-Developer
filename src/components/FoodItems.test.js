import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FoodItems from "./FoodItems";

const mockItems = [
  { idMeal: "1", strMeal: "Pizza" },
  { idMeal: "2", strMeal: "Burger" },
];

describe("FoodItems Component", () => {
  test("renders food items correctly", () => {
    render(<FoodItems items={mockItems} onItemClick={() => {}} />);

    expect(screen.getByText(/Pizza/i)).toBeInTheDocument();
    expect(screen.getByText(/Burger/i)).toBeInTheDocument();
  });

  test('displays "No items found" if no items are available', () => {
    render(<FoodItems items={[]} onItemClick={() => {}} />);

    expect(screen.getByText(/No items found/i)).toBeInTheDocument();
  });

  test("calls onItemClick when an item is clicked", () => {
    const handleItemClick = jest.fn();

    render(<FoodItems items={mockItems} onItemClick={handleItemClick} />);

    // Click on the first item
    fireEvent.click(screen.getByText(/Pizza/i));

    // Check if onItemClick was called
    expect(handleItemClick).toHaveBeenCalled();
  });
});
