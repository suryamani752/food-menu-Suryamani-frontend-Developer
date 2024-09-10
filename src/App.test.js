import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App"; 

describe("App Component", () => {
  test("renders header, filters, and pagination correctly", async () => {
    render(<App />);

    // Check if the header, filters, and pagination are rendered
    expect(screen.getByText(/Food Menu/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Area/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort A-Z/i)).toBeInTheDocument();

    // Check for food items
    expect(await screen.findByText(/Pizza/i)).toBeInTheDocument();
    expect(await screen.findByText(/Burger/i)).toBeInTheDocument();
  });
});
