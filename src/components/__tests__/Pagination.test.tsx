import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import Pagination from "@/components/Pagination";

describe("Pagination component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    totalItems: 200,
    onPageChange: jest.fn(),
  };

  it("renders with default props", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByLabelText("Go to first page")).toBeTruthy();
    expect(screen.getByLabelText("Go to previous page")).toBeTruthy();
    expect(screen.getByLabelText("Go to next page")).toBeTruthy();
    expect(screen.getByLabelText("Go to last page")).toBeTruthy();

    expect(screen.getByLabelText("Go to page 1")).toBeTruthy();
    expect(screen.getByLabelText("Go to page 2")).toBeTruthy();
    expect(screen.getByLabelText("Go to page 3")).toBeTruthy();
    expect(screen.getByText("...")).toBeTruthy();
    expect(screen.getByLabelText("Go to page 10")).toBeTruthy();

    expect(screen.getByText(/Showing 1 to 20 of 200 workouts/)).toBeTruthy();

    expect(
      screen.getByLabelText("Go to first page").getAttribute("disabled"),
    ).toBe("");
    expect(
      screen.getByLabelText("Go to previous page").getAttribute("disabled"),
    ).toBe("");
  });

  it("renders with middle page selected", () => {
    const customProps = {
      ...defaultProps,
      currentPage: 5,
    };

    render(<Pagination {...customProps} />);

    expect(screen.getByLabelText("Go to page 1")).toBeTruthy();
    expect(screen.getAllByText("...").length).toBe(2);
    expect(screen.getByLabelText("Go to page 3")).toBeTruthy();
    expect(screen.getByLabelText("Go to page 4")).toBeTruthy();
    expect(screen.getByLabelText("Go to page 5")).toBeTruthy();
    expect(screen.getByLabelText("Go to page 6")).toBeTruthy();
    expect(screen.getByLabelText("Go to page 7")).toBeTruthy();
    expect(screen.getByLabelText("Go to page 10")).toBeTruthy();

    const activePage = screen.getByLabelText("Go to page 5");
    expect(activePage.getAttribute("class")).toContain("bg-teal-0");
    expect(activePage.getAttribute("class")).toContain("text-white");
    expect(activePage.getAttribute("class")).toContain("font-semibold");
    expect(activePage.getAttribute("class")).toContain("border-2");
    expect(activePage.getAttribute("class")).toContain("border-teal-20");
  });

  it("renders with last page selected", () => {
    const customProps = {
      ...defaultProps,
      currentPage: 10,
    };

    render(<Pagination {...customProps} />);

    expect(
      screen.getByLabelText("Go to next page").getAttribute("disabled"),
    ).toBe("");
    expect(
      screen.getByLabelText("Go to last page").getAttribute("disabled"),
    ).toBe("");
  });

  it("handles first page navigation", () => {
    const customProps = {
      ...defaultProps,
      currentPage: 5,
    };

    render(<Pagination {...customProps} />);
    const firstPageButton = screen.getByLabelText("Go to first page");

    fireEvent.click(firstPageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it("handles previous page navigation", () => {
    const customProps = {
      ...defaultProps,
      currentPage: 5,
    };

    render(<Pagination {...customProps} />);
    const prevPageButton = screen.getByLabelText("Go to previous page");

    fireEvent.click(prevPageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
  });

  it("handles next page navigation", () => {
    render(<Pagination {...defaultProps} />);
    const nextPageButton = screen.getByLabelText("Go to next page");

    fireEvent.click(nextPageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it("handles last page navigation", () => {
    render(<Pagination {...defaultProps} />);
    const lastPageButton = screen.getByLabelText("Go to last page");

    fireEvent.click(lastPageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(10);
  });

  it("handles specific page selection", () => {
    render(<Pagination {...defaultProps} />);
    const pageButton = screen.getByLabelText("Go to page 3");

    fireEvent.click(pageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it("does not trigger onPageChange for ellipsis", () => {
    const customProps = {
      ...defaultProps,
      currentPage: 5,
    };

    render(<Pagination {...customProps} />);
    const ellipsis = screen.getAllByText("...")[0];

    fireEvent.click(ellipsis);
    expect(defaultProps.onPageChange).not.toHaveBeenCalled();
  });

  it("hides when there is only one page", () => {
    const singlePageProps = {
      ...defaultProps,
      totalPages: 1,
      totalItems: 15,
    };

    render(<Pagination {...singlePageProps} />);

    expect(screen.queryByLabelText("Go to page 1")).toBeNull();
    expect(screen.queryByText("...")).toBeNull();
    expect(screen.queryByText("Showing 1 to 15 of 15 workouts")).toBeNull();
    expect(screen.queryByLabelText("Go to first page")).toBeNull();
    expect(screen.queryByLabelText("Go to previous page")).toBeNull();
    expect(screen.queryByLabelText("Go to next page")).toBeNull();
    expect(screen.queryByLabelText("Go to last page")).toBeNull();
  });
});
