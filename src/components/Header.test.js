import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { FoodContext } from "../context/FoodContext";

describe("Header Component", () => {
  test("renders the header and input correctly", () => {
    const setSearchTerm = jest.fn();
    const error = null;

    render(
      <FoodContext.Provider value={{ setSearchTerm, error }}>
        <Header />
      </FoodContext.Provider>
    );

    expect(screen.getByText(/Food Menu/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search food.../i)).toBeInTheDocument();
  });

  test("calls setSearchTerm on input change", () => {
    const setSearchTerm = jest.fn();
    const error = null;

    render(
      <FoodContext.Provider value={{ setSearchTerm, error }}>
        <Header />
      </FoodContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search food.../i), {
      target: { value: "Pasta" },
    });

    expect(setSearchTerm).toHaveBeenCalledWith("Pasta");
  });

  test("displays error message if error exists", () => {
    const setSearchTerm = jest.fn();
    const error = "No results found";

    render(
      <FoodContext.Provider value={{ setSearchTerm, error }}>
        <Header />
      </FoodContext.Provider>
    );

    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });
});
