import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Filters from "./Filters";
import { FoodContext } from "../context/FoodContext";

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        meals: [{ strArea: "Indian" }, { strArea: "Chinese" }],
      }),
  })
);

describe("Filters Component", () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear previous mock calls before each test
  });

  test("renders area and sort select options correctly", async () => {
    const setAreaFilter = jest.fn();
    const setSortOrder = jest.fn();

    render(
      <FoodContext.Provider value={{ setAreaFilter, setSortOrder }}>
        <Filters />
      </FoodContext.Provider>
    );

    // Wait for the select options to appear
    await waitFor(() => {
      expect(screen.getByText(/Indian/i)).toBeInTheDocument();
      expect(screen.getByText(/Chinese/i)).toBeInTheDocument();
    });

    // Check the presence of select elements
    expect(screen.getAllByRole("combobox")[0]).toBeInTheDocument(); // Area select
    expect(screen.getAllByRole("combobox")[1]).toBeInTheDocument(); // Sort select
  });

  test("calls setAreaFilter when an area is selected", async () => {
    const setAreaFilter = jest.fn();
    const setSortOrder = jest.fn();

    render(
      <FoodContext.Provider value={{ setAreaFilter, setSortOrder }}>
        <Filters />
      </FoodContext.Provider>
    );

    // Wait for the select elements to appear
    await waitFor(() => screen.getAllByRole("combobox"));

    // Get the area select element and change its value
    const areaSelect = screen.getAllByRole("combobox")[0];
    fireEvent.change(areaSelect, { target: { value: "Indian" } });

    // Expect setAreaFilter to be called with "Indian"
    expect(setAreaFilter).toHaveBeenCalledWith("Indian");
  });

  test("calls setSortOrder when sorting option is selected", async () => {
    const setAreaFilter = jest.fn();
    const setSortOrder = jest.fn();

    render(
      <FoodContext.Provider value={{ setAreaFilter, setSortOrder }}>
        <Filters />
      </FoodContext.Provider>
    );

    // Wait for the select elements to appear
    await waitFor(() => screen.getAllByRole("combobox"));

    // Get the sort select element and change its value
    const sortSelect = screen.getAllByRole("combobox")[1];
    fireEvent.change(sortSelect, { target: { value: "desc" } });

    // Expect setSortOrder to be called with "desc"
    expect(setSortOrder).toHaveBeenCalledWith("desc");
  });
});
