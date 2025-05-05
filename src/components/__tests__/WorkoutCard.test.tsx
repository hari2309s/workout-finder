import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types";

describe("WorkoutCard component", () => {
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

  it("renders workout details", () => {
    render(<WorkoutCard workout={mockWorkout} />);

    expect(screen.getByText("Morning Yoga")).toBeTruthy();
    expect(
      screen.getByText("A relaxing yoga session to start your day."),
    ).toBeTruthy();
    expect(screen.getByText("YOGA")).toBeTruthy();
    expect(screen.getByRole("button", { name: /explore/i })).toBeTruthy();
    expect(screen.getByTestId("chevron-right")).toBeTruthy();
  });

  it("truncates long description", () => {
    const longDescriptionWorkout = {
      ...mockWorkout,
      description:
        "This is a very long description that exceeds the character limit for the workout card and should be truncated appropriately to ensure it fits within the design constraints.",
    };
    render(<WorkoutCard workout={longDescriptionWorkout} />);

    const description = screen.getByText(
      /This is a very long description.*\.\.\./,
    );
    expect(description).toBeTruthy();
    expect(description.textContent?.length).toBeLessThanOrEqual(103); // 100 chars + "..."
  });

  it("formats start date correctly", () => {
    render(<WorkoutCard workout={mockWorkout} />);

    const dateElement = screen.getByText(/Start:\s*04\.05\.2025/);
    expect(dateElement).toBeTruthy();
  });

  it("renders as a link to workout details", () => {
    render(<WorkoutCard workout={mockWorkout} />);

    const link = screen.getByTestId("workout-card").closest("a");
    expect(link).not.toBeNull();
    expect(link!.getAttribute("href")).toBe("/workout/1");
  });

  it("renders tag with correct category", () => {
    render(<WorkoutCard workout={mockWorkout} />);

    const tag = screen.getByLabelText("YOGA");
    expect(tag).toBeTruthy();
    expect(tag.getAttribute("class")).toContain("bg-foreground");
  });
});
