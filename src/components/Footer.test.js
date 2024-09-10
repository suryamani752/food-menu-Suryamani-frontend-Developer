import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  test("renders footer text correctly", () => {
    render(<Footer />);

    expect(
      screen.getByText(/© 2024 Food Menu App Designed By Suryamani Kumar/i)
    ).toBeInTheDocument();
  });
});
