import React from "react";
import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import Tag from "@/components/Tag";

const defaultProps = {
  label: "Test",
  category: "c1",
  className: "custom-class",
  showIcon: true,
};

describe("Tag component", () => {
  it("renders with basic label", () => {
    render(<Tag {...defaultProps} />);
    const element = screen.getByText("Test");
    expect(element).toBeDefined();
    expect(element.textContent).toBe("Test");
  });

  it("applies category color based on category prop", () => {
    render(<Tag {...defaultProps} category="c1" />);
    const element = screen.getByText("Test");
    expect(element.className).toContain("bg-teal-600");
    expect(element.className).toContain("text-white");
  });

  it("falls back to default color when category is not found", () => {
    render(<Tag {...defaultProps} category="unknown" />);
    const element = screen.getByText("Test");
    expect(element.className).toContain("bg-foreground");
    expect(element.className).toContain("text-white");
  });

  it("applies additional className when provided", () => {
    render(<Tag {...defaultProps} className="custom-class" />);
    const element = screen.getByText("Test");
    expect(element.className).toContain("custom-class");
  });

  it("renders with icon when showIcon is true", () => {
    render(<Tag {...defaultProps} showIcon={true} />);
    const icon = screen.getByLabelText("Tag icon");
    expect(icon).toBeDefined();
    expect(icon.tagName).toBe("svg");
  });

  it("does not render icon when showIcon is false", () => {
    render(<Tag {...defaultProps} showIcon={false} />);
    expect(screen.queryByLabelText("Tag icon")).toBeNull();
  });

  it("sets correct aria-label", () => {
    render(<Tag {...defaultProps} label="Test" />);
    const element = screen.getByText("Test");
    expect(element.getAttribute("aria-label")).toBe("Test");
  });

  it("sets correct icon aria-label", () => {
    render(<Tag {...defaultProps} showIcon={true} />);
    const icon = screen.getByLabelText("Tag icon");
    expect(icon.getAttribute("aria-label")).toBe("Tag icon");
  });

  it("renders icon before text when showIcon is true", () => {
    render(<Tag {...defaultProps} showIcon={true} />);
    const container = screen.getByText("Test").parentElement;
    const icon = screen.getByLabelText("Tag icon");
    expect(Array.from(container!.children).indexOf(icon)).toBeLessThan(
      Array.from(container!.children).indexOf(screen.getByText("Test")),
    );
  });

  it("renders with correct padding and sizing", () => {
    render(<Tag {...defaultProps} />);
    const element = screen.getByText("Test");
    expect(element.className).toContain("px-3");
    expect(element.className).toContain("py-1");
    expect(element.className).toContain("text-xs");
  });

  it("renders with correct font weight and tracking", () => {
    render(<Tag {...defaultProps} />);
    const element = screen.getByText("Test");
    expect(element.className).toContain("font-semibold");
    expect(element.className).toContain("tracking-wide");
  });
});
