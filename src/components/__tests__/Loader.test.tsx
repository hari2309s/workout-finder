import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import Loader from "@/components/Loader";

describe("Loader component", () => {
  it("renders with default message and spinner", () => {
    render(<Loader />);

    const spinner = screen.getByRole("status", { name: /loading/i });
    expect(spinner).toBeDefined();
    expect(spinner.className).toContain("animate-spin");
    expect(spinner.className).toContain("border-teal-90");
    expect(spinner.className).toContain("border-t-teal-50");

    const message = screen.getByText("Loading workouts...");
    expect(message).toBeDefined();
    expect(message.className).toContain("text-teal-dark-50");
  });

  it("accepts custom message prop", () => {
    render(<Loader message="Fetching workouts..." />);

    const message = screen.getByText("Fetching workouts...");
    expect(message).toBeDefined();
    expect(message.className).toContain("text-teal-dark-50");
  });

  it("accepts custom className prop", () => {
    render(<Loader className="bg-teal-90 p-8" />);

    const loader = screen.getByRole("status").closest("div")?.parentElement;
    expect(loader).toBeDefined();
    expect(loader?.className).toContain("bg-teal-90");
    expect(loader?.className).toContain("p-8");
  });

  it("is vertically and horizontally centered", () => {
    render(<Loader />);

    const loader = screen.getByRole("status").closest("div")?.parentElement;
    expect(loader).toBeDefined();
    expect(loader?.className).toContain("flex");
    expect(loader?.className).toContain("items-center");
    expect(loader?.className).toContain("justify-center");
  });
});
