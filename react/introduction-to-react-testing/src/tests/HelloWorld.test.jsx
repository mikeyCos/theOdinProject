import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HelloWorld from "../components/HelloWorld";

describe("HelloWorld component", () => {
  it("Renders correct HelloWorld", () => {
    const { container } = render(<HelloWorld />);
    expect(container).toMatchSnapshot();
  });

  it("Renders correct headings", () => {
    const { getAllByRole } = render(<HelloWorld />);
    const headings = getAllByRole("heading").map(
      (heading) => heading.textContent
    );

    // Headings should have textContent of "Hello World" and "testing"
    expect(
      headings.reduce((accumulator, currentHeading) => {
        return accumulator && /(hello world)|(testing)/i.test(currentHeading);
      }, true)
    ).toBeTruthy();
  });
});
