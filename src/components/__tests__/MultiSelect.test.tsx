import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import MultiSelect from "@/components/MultiSelect";

describe("MultiSelect component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  const defaultProps = {
    options: ["option1", "option2", "option3"],
    value: [],
    onChange: jest.fn(),
    placeholder: "Select options",
  };

  it("renders with default props", () => {
    render(<MultiSelect {...defaultProps} />);

    expect(screen.getByText("Select options")).toBeTruthy();

    const container = screen.getByRole("combobox");
    expect(container).toBeTruthy();
    expect(container.getAttribute("aria-expanded")).toBe("false");
    expect(container.getAttribute("aria-haspopup")).toBe("listbox");
  });

  it("renders with custom props", () => {
    const customProps = {
      ...defaultProps,
      value: [],
      placeholder: "Custom placeholder",
      maxWidth: "200px",
    };

    render(<MultiSelect {...customProps} />);

    expect(screen.getByText("Custom placeholder")).toBeTruthy();
  });

  it("toggles dropdown when clicked", () => {
    render(<MultiSelect {...defaultProps} />);

    const container = screen.getByRole("combobox");

    fireEvent.click(container);
    expect(container.getAttribute("aria-expanded")).toBe("true");

    fireEvent.click(container);
    expect(container.getAttribute("aria-expanded")).toBe("false");
  });

  it("selects and deselects options", () => {
    render(<MultiSelect {...defaultProps} />);

    const container = screen.getByRole("combobox");

    fireEvent.click(container);

    const option1 = screen.getByText("OPTION1");
    fireEvent.click(option1);
    expect(defaultProps.onChange).toHaveBeenCalled();

    defaultProps.onChange([]);

    fireEvent.click(option1);
    expect(defaultProps.onChange).toHaveBeenCalledWith([]);
  });

  it("removes selected options", () => {
    const customProps = {
      ...defaultProps,
      value: ["option1"],
    };

    render(<MultiSelect {...customProps} />);

    const removeButton = screen.getByRole("button", { name: "Remove" });
    fireEvent.click(removeButton);

    expect(defaultProps.onChange).toHaveBeenCalledWith([]);
  });

  it("closes dropdown when clicking outside", () => {
    render(<MultiSelect {...defaultProps} />);

    const container = screen.getByRole("combobox");

    fireEvent.click(container);

    act(() => {
      const clickOutside = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
      });
      document.dispatchEvent(clickOutside);
    });

    expect(container.getAttribute("aria-expanded")).toBe("false");
  });
});
