import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomButton from "../components/CustomButton";

function setup(jsx) {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...render(jsx),
  };
}

describe("CustomButton component", () => {
  it('Renders a button with "Click me" text', () => {
    render(<CustomButton onClick={() => {}} />);
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
  });

  it("On click handler is called", async () => {
    const onClick = vi.fn();
    // const user = userEvent.setup();
    // render(<CustomButton onClick={onClick} />);

    // If a setup function is defined
    const { user } = setup(<CustomButton onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Click me" });
    await user.click(button);
    expect(onClick).toBeCalled();
  });

  it("On click handler is NOT called", async () => {
    const onClick = vi.fn();
    render(<CustomButton onClick={onClick} />);
    expect(onClick).not.toBeCalled();
  });
});
