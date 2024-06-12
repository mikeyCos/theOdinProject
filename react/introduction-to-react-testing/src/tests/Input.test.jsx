import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Input from "../components/Input";

describe("Input component", () => {
  it("Check input value has updated", async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole("textbox");
    await user.type(input, "hello");

    expect(input.value).toBe("hello");
  });

  it("Check if onChange callback is called when input value is changed", async () => {
    const onChangeHandler = vi.fn();
    const user = userEvent.setup();
    render(<Input onChange={onChangeHandler} />);
    const input = screen.getByRole("textbox");
    const text = "Hamburger";
    await user.type(input, text);

    expect(onChangeHandler).toHaveBeenCalledTimes(text.length);
  });
});
