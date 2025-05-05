import React from "react";
import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import EmptyState from "@/components/EmptyState";

const defaultProps = {
  title: "No items found",
  description: "Try searching with different keywords",
  icon: <div data-testid="empty-icon" className="h-6 w-6" />,
  action: <button data-testid="action-button">Try Again</button>,
};

describe("EmptyState component", () => {
  it("renders with all props", () => {
    render(
      <div data-testid="empty-state-container">
        <EmptyState {...defaultProps} />
      </div>,
    );

    const container = screen.getByTestId("empty-state-container");
    const innerContainer = container.children[0] as HTMLElement;
    expect(innerContainer.className).toContain("flex");
    expect(innerContainer.className).toContain("items-center");
    expect(innerContainer.className).toContain("justify-center");
    expect(innerContainer.className).toContain("p-8");
    expect(innerContainer.className).toContain("text-center");

    const iconWrapper = screen.getByTestId("empty-icon")
      .parentElement as HTMLElement;
    expect(iconWrapper).toBeDefined();
    expect(iconWrapper.className).toContain("mb-4");
    expect(iconWrapper.className).toContain("text-gray-400");

    const title = screen.getByText("No items found");
    expect(title).toBeDefined();
    expect(title.className).toContain("text-lg");
    expect(title.className).toContain("font-semibold");
    expect(title.className).toContain("text-gray-900");

    const description = screen.getByText(
      "Try searching with different keywords",
    );
    expect(description).toBeDefined();
    expect(description.className).toContain("mt-2");
    expect(description.className).toContain("text-sm");
    expect(description.className).toContain("text-gray-500");
    expect(description.className).toContain("max-w-sm");

    const actionWrapper = screen.getByTestId("action-button")
      .parentElement as HTMLElement;
    expect(actionWrapper).toBeDefined();
    expect(actionWrapper.className).toContain("mt-6");
  });

  it("renders without description", () => {
    render(<EmptyState title="No items found" />);

    expect(screen.getByText("No items found")).toBeDefined();
    expect(
      screen.queryByText("Try searching with different keywords"),
    ).toBeNull();
  });

  it("renders without icon", () => {
    render(
      <EmptyState
        title="No items found"
        description="Try searching with different keywords"
      />,
    );

    expect(screen.getByText("No items found")).toBeDefined();
    expect(
      screen.getByText("Try searching with different keywords"),
    ).toBeDefined();
    expect(screen.queryByTestId("empty-icon")).toBeNull();
  });

  it("renders without action", () => {
    render(
      <EmptyState
        title="No items found"
        description="Try searching with different keywords"
      />,
    );

    expect(screen.getByText("No items found")).toBeDefined();
    expect(
      screen.getByText("Try searching with different keywords"),
    ).toBeDefined();
    expect(screen.queryByTestId("action-button")).toBeNull();
  });

  it("renders with custom styling", () => {
    render(
      <div data-testid="empty-state-container">
        <EmptyState {...defaultProps} className="custom-class" />
      </div>,
    );

    const container = screen.getByTestId("empty-state-container");
    const innerContainer = container.children[0] as HTMLElement;
    expect(innerContainer.className).toContain("custom-class");
  });

  it("applies correct spacing between elements", () => {
    render(
      <div data-testid="empty-state-container">
        <EmptyState {...defaultProps} />
      </div>,
    );

    const container = screen.getByTestId("empty-state-container");
    const innerContainer = container.children[0] as HTMLElement;
    const children = Array.from(innerContainer.children);

    expect(children[0].className).toContain("mb-4");
    expect(children[1].className).toContain("text-lg");
    expect(children[2].className).toContain("mt-2");
    expect(children[3].className).toContain("mt-6");
  });
});
