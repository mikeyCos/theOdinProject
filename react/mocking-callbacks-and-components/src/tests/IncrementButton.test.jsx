import { describe, expect, it, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IncrementButton from "../components/IncrementButton";

describe("IncrementButton component", () => {
  it("Button's text content should be 1", async () => {
    const user = userEvent.setup();
    render(<IncrementButton />);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(button.textContent).toBe("1");
  });

  it("Button's text content should ", async () => {
    const user = userEvent.setup();
    render(<IncrementButton />);
    const button = screen.getByRole("button");

    await act(async () => {
      for (let i = 0; i < 3; i++) {
        await user.click(button);
      }
    });
    expect(button.textContent).toBe("3");
  });
});
