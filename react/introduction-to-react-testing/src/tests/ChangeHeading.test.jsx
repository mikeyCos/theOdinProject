import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import ChangeHeading from "../components/ChangeHeading";

describe("ChangeHeading component", () => {
  it("Renders correct ChangeHeading", () => {
    // render(<ChangeHeading />);
    // expect(
    //   screen.getByRole("heading", { name: "Magnificent Monkeys" }).textContent
    // ).toMatch(/magnificent monkeys/i);
    const { container } = render(<ChangeHeading />);
    expect(container).toMatchSnapshot();
  });

  it("Renders radical parrots after button click", async () => {
    const user = userEvent.setup();

    render(<ChangeHeading />);
    const button = screen.getByRole("button", { name: "Change heading" });

    await user.click(button);

    expect(screen.getByRole("heading").textContent).toMatch(/radical parrots/i);
  });
});
