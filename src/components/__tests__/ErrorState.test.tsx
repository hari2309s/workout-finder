import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect } from "@jest/globals";
import ErrorState from "@/components/ErrorState";

describe("ErrorState component", () => {
  const defaultProps = {
    title: "Connection Error",
    message:
      "Unable to connect to the server. Please check your internet connection.",
    icon: <div data-testid="error-icon" className="h-6 w-6" />,
    onRetry: jest.fn(),
  };

  it("renders with default props", () => {
    render(<ErrorState />);

    expect(screen.getByText("Something went wrong")).toBeDefined();
    expect(
      screen.getByText("We encountered an error while loading this content."),
    ).toBeDefined();

    const container = screen.getByText("Something went wrong").closest("div");
    expect(container?.className).toContain("flex");
    expect(container?.className).toContain("flex-col");
    expect(container?.className).toContain("items-center");
    expect(container?.className).toContain("justify-center");
    expect(container?.className).toContain("p-8");
    expect(container?.className).toContain("text-center");
  });

  it("renders with custom props", () => {
    render(<ErrorState {...defaultProps} />);

    expect(screen.getByText("Connection Error")).toBeDefined();
    expect(
      screen.getByText(
        "Unable to connect to the server. Please check your internet connection.",
      ),
    ).toBeDefined();

    expect(screen.getByTestId("error-icon")).toBeDefined();
    expect(screen.getByTestId("error-icon").className).toContain("w-6");
    expect(screen.getByTestId("error-icon").className).toContain("h-6");
  });

  it("renders retry button when onRetry is provided", () => {
    render(<ErrorState {...defaultProps} />);

    const retryButton = screen.getByRole("button", { name: "Try again" });
    expect(retryButton).toBeDefined();
    expect(retryButton.className).toContain("mt-6");
    expect(retryButton.className).toContain("px-4");
    expect(retryButton.className).toContain("py-2");
    expect(retryButton.className).toContain("text-sm");
    expect(retryButton.className).toContain("font-medium");
    expect(retryButton.className).toContain("text-white");
    expect(retryButton.className).toContain("bg-red-600");
    expect(retryButton.className).toContain("rounded-md");
  });

  it("calls onRetry when retry button is clicked", () => {
    const onRetryMock = jest.fn();
    render(<ErrorState {...defaultProps} onRetry={onRetryMock} />);

    const retryButton = screen.getByRole("button", { name: "Try again" });
    fireEvent.click(retryButton);

    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });

  it("does not render retry button when onRetry is not provided", () => {
    render(<ErrorState title="Error" message="An error occurred" />);

    expect(screen.queryByRole("button", { name: "Try again" })).toBeNull();
  });
});
