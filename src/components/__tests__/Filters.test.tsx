import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import Filters from "@/components/Filters";

describe("Filters component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const defaultProps = {
    startDate: "2025-05",
    categories: [],
    onFilterChange: jest.fn(),
    onResetFilters: jest.fn(),
  };

  it("renders with default props", () => {
    render(<Filters {...defaultProps} />);

    const dateInput = screen.getByLabelText("Start Date");
    expect(dateInput).toBeTruthy();
    expect(dateInput.getAttribute("value")).toBe("2025-05");
    expect(screen.getByText("Select categories")).toBeTruthy();
    expect(screen.getByText("Categories")).toBeTruthy();
    expect(screen.getByText("You can select multiple categories")).toBeTruthy();
  });

  it("renders with custom props", () => {
    const customProps = {
      ...defaultProps,
      startDate: "2025-06",
      categories: ["c1", "c2"],
    };

    render(<Filters {...customProps} />);

    const dateInput = screen.getByLabelText("Start Date");
    expect(dateInput.getAttribute("value")).toBe("2025-06");

    expect(screen.getByText("C1")).toBeTruthy();
    expect(screen.getByText("C2")).toBeTruthy();
  });

  it("handles month input change", () => {
    render(<Filters {...defaultProps} />);

    const dateInput = screen.getByLabelText("Start Date");
    fireEvent.change(dateInput, { target: { value: "2025-07" } });

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith("2025-07", []);
  });

  it("handles category selection through MultiSelect", () => {
    render(<Filters {...defaultProps} />);

    const multiSelect = screen.getByTestId("category-filter");
    fireEvent.click(multiSelect);

    const categoryOption = screen.getByText("C1");
    fireEvent.click(categoryOption);

    jest.runAllTimers();

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith("2025-05", ["c1"]);
  });

  it("handles category removal", () => {
    const customProps = {
      ...defaultProps,
      categories: ["c1"],
    };

    render(<Filters {...customProps} />);

    const removeButton = screen.getByRole("button", { name: "Remove" });
    fireEvent.click(removeButton);

    jest.runAllTimers();

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith("2025-05", []);
  });

  describe("reset filters button", () => {
    it("calls onResetFilters when clicked", () => {
      render(
        <Filters {...defaultProps} startDate="2025-05" categories={["c1"]} />,
      );

      const resetButton = screen.getByRole("button", {
        name: /reset filters/i,
      });
      fireEvent.click(resetButton);

      expect(defaultProps.onResetFilters).toHaveBeenCalledTimes(1);
    });

    it("is enabled when category filter is applied", () => {
      render(<Filters {...defaultProps} startDate="" categories={["c1"]} />);

      const resetButton = screen.getByRole("button", {
        name: /reset filters/i,
      }) as HTMLButtonElement;
      expect(resetButton.disabled).toBe(false);
    });

    it("has the correct class names for styling", () => {
      render(
        <Filters {...defaultProps} startDate="2025-05" categories={["c1"]} />,
      );

      const resetButton = screen.getByRole("button", {
        name: /reset filters/i,
      });
      const classList = resetButton.getAttribute("class") || "";
      expect(classList.includes("bg-teal-20")).toBe(true);
      expect(classList.includes("text-white")).toBe(true);
      expect(classList.includes("hover:bg-teal-10")).toBe(true);
    });

    it("contains the refresh icon", () => {
      render(
        <Filters {...defaultProps} startDate="2025-05" categories={["c1"]} />,
      );

      const resetButton = screen.getByRole("button", {
        name: /reset filters/i,
      });
      const svg = resetButton.querySelector("svg");
      expect(svg).toBeTruthy();
      expect(svg?.getAttribute("class")?.includes("lucide-refresh-cw")).toBe(
        true,
      );
    });
  });

  it("maintains state consistency when both inputs change", () => {
    render(<Filters {...defaultProps} />);

    const dateInput = screen.getByLabelText("Start Date");
    fireEvent.change(dateInput, { target: { value: "2025-07" } });

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith("2025-07", []);

    const multiSelect = screen.getByTestId("category-filter");
    fireEvent.click(multiSelect);
    const categoryOption = screen.getByText("C1");
    fireEvent.click(categoryOption);

    jest.runAllTimers();

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith("2025-07", ["c1"]);

    expect(defaultProps.onFilterChange).toHaveBeenCalledTimes(2);
    expect(defaultProps.onFilterChange.mock.calls[0]).toEqual(["2025-07", []]);
    expect(defaultProps.onFilterChange.mock.calls[1]).toEqual([
      "2025-07",
      ["c1"],
    ]);
  });
});
