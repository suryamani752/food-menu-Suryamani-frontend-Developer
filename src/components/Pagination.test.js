import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  test("renders pagination buttons correctly", () => {
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={jest.fn()} />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("calls onPageChange when a page number is clicked", () => {
    const onPageChange = jest.fn();

    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByText("2"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
