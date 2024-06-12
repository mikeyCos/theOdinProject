/* Following
 * https://academind.com/tutorials/testing-react-apps
 */
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UserStage from "../components/UserStage";

window.fetch = vi.fn(() => {
  const user = { name: "Jack", email: "jack@email.com" };

  return Promise.resolve({
    json: () => Promise.resolve(user),
  });
});

describe("UserStage component", () => {
  it("Renders correct text while API request is in progress", async () => {
    const { getByText } = render(<UserStage />);
    const loading = getByText("Loading...");
    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText("Loading..."));
  });

  it("Renders correct user's name", async () => {
    render(<UserStage />);
    const userName = await screen.findByText("Jack");
    expect(userName).toBeInTheDocument();
  });

  it("Renders correct text when fetch fails", async () => {
    window.fetch.mockImplementationOnce(() => {
      return Promise.reject({ message: "API is down" });
    });

    render(<UserStage />);
    const errorMessage = await screen.findByText("API is down");
    expect(errorMessage).toBeInTheDocument();
  });
});
