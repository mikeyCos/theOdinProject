/* Following
 * https://academind.com/tutorials/testing-react-apps
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import IncrementDecrement from "../components/IncrementDecrement";

describe("IncrementDecrement component", () => {
  it("Counter is incremented on increment button click", async () => {
    const user = userEvent.setup();
    render(<IncrementDecrement />);
    const counter = screen.getByTestId("counter");
    const incrementBtn = screen.getByText("Increment");
    await user.click(incrementBtn);
    await user.click(incrementBtn);

    expect(counter.textContent).toEqual("2");
  });

  it("Counter is decremented on decrement button click", async () => {
    const user = userEvent.setup();
    render(<IncrementDecrement />);
    const counter = screen.getByTestId("counter");
    const decrementBtn = screen.getByText("Decrement");

    await user.click(decrementBtn);
    await user.click(decrementBtn);

    expect(counter.textContent).toEqual("-2");
  });
});
