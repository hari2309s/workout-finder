import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import WorkoutList, { WorkoutListProps } from "../WorkoutList";
import { Workout } from "@/types";

describe("WorkoutList component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const mockWorkout: Workout = {
    id: "1",
    name: "Morning Yoga",
    description: "A relaxing yoga session to start your day.",
    startDate: "2025-05-04",
    category: "yoga",
  };

  const defaultProps: WorkoutListProps = {
    workouts: [],
    isLoading: false,
    error: null,
    filtersSet: false,
  };

  it("renders loading state", () => {
    render(<WorkoutList {...defaultProps} isLoading={true} />);

    const loader = screen.getByRole("status", { name: /loading/i });
    expect(loader).toBeDefined();
    expect(screen.queryByText("No workouts found")).toBeNull();
    expect(screen.queryByText("Failed to load workouts")).toBeNull();
  });

  it("renders error state without retry button", () => {
    const error = new Error("Network error");
    render(<WorkoutList {...defaultProps} error={error} />);

    expect(screen.getByText("Failed to load workouts")).toBeTruthy();
    expect(
      screen.getByText("We couldn't load the workouts. Please try again."),
    ).toBeTruthy();
    const elements = screen.getAllByText(/try again/i);
    expect(elements.length).toBe(1); // Only the paragraph should exist
    expect(elements[0].tagName).toBe("P");
  });

  it("renders error state with retry button", () => {
    const error = new Error("Network error");
    const onRetry = jest.fn();
    render(<WorkoutList {...defaultProps} error={error} onRetry={onRetry} />);

    expect(screen.getByText("Failed to load workouts")).toBeTruthy();
    expect(
      screen.getByText("We couldn't load the workouts. Please try again."),
    ).toBeTruthy();
    const elements = screen.getAllByText(/try again/i);
    const retryButton = elements.find((el) => el.tagName === "BUTTON");
    expect(retryButton).toBeTruthy();
  });

  it("triggers onRetry when retry button is clicked in error state", () => {
    const error = new Error("Network error");
    const onRetry = jest.fn();
    render(<WorkoutList {...defaultProps} error={error} onRetry={onRetry} />);

    const elements = screen.getAllByText(/try again/i);
    const retryButton = elements.find((el) => el.tagName === "BUTTON");
    expect(retryButton).toBeTruthy();
    fireEvent.click(retryButton!);

    expect(onRetry).toHaveBeenCalled();
  });

  describe("Empty state", () => {
    it("renders empty state without filters", () => {
      render(<WorkoutList {...defaultProps} />);

      expect(screen.getByText("No workouts found")).toBeTruthy();
      expect(
        screen.getByText("Try adjusting your filters or search criteria."),
      ).toBeTruthy();
      expect(
        screen.queryByRole("button", { name: /reset filters/i }),
      ).toBeNull();
    });

    it("renders empty state with filters and reset button", () => {
      const onResetFilters = jest.fn();
      render(
        <WorkoutList
          {...defaultProps}
          filtersSet={true}
          onResetFilters={onResetFilters}
        />,
      );

      expect(screen.getByText("No workouts found")).toBeTruthy();
      expect(
        screen.getByText("Try adjusting your filters or search criteria."),
      ).toBeTruthy();
      const resetButton = screen.getByRole("button", {
        name: /reset filters/i,
      });
      expect(resetButton).toBeTruthy();

      fireEvent.click(resetButton);
      expect(onResetFilters).toHaveBeenCalled();
    });

    it("renders workout cards when workouts are provided", () => {
      const workouts = [
        mockWorkout,
        { ...mockWorkout, id: "2", name: "Evening Run" },
      ];
      render(<WorkoutList {...defaultProps} workouts={workouts} />);

      const list = screen.getByRole("list");
      expect(list).toBeTruthy();
      expect(screen.getByText("Morning Yoga")).toBeTruthy();
      expect(screen.getByText("Evening Run")).toBeTruthy();
      expect(screen.getAllByTestId("workout-card")).toHaveLength(2);
    });
  });
});
