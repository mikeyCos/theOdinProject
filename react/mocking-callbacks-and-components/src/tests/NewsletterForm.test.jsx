import { describe, expect, it, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsletterForm from "../components/NewsletterForm";

describe("NewsletterForm component", () => {
  it("An email input is rendered", () => {
    render(<NewsletterForm />);
    const emailInput = screen.getByTestId("email");
    expect(emailInput).toBeInTheDocument();
  });

  it("An submit button is rendered", () => {
    render(<NewsletterForm />);
    const submitButton = screen.getByTestId("submit");
    expect(submitButton).toBeInTheDocument();
  });

  it("The submit handler is called", async () => {
    const updateNewsletter = vi.fn();
    const user = userEvent.setup();
    const email = "some_persons@email.com";
    render(<NewsletterForm updateNewsletter={updateNewsletter} />);

    const emailInput = screen.getByTestId("email");
    const submitButton = screen.getByTestId("submit");

    await user.type(emailInput, email);
    await user.click(submitButton);

    expect(updateNewsletter).toHaveBeenCalled();
  });

  it('The email input value should be "some_persons@email.com"', async () => {
    const updateNewsletter = vi.fn();
    const user = userEvent.setup();
    const email = "some_persons@email.com";

    render(<NewsletterForm updateNewsletter={updateNewsletter} />);

    const emailInput = screen.getByTestId("email");

    await user.type(emailInput, email);

    expect(emailInput.value).toBe("some_persons@email.com");
  });

  it("User can sign up for the newsletter", async () => {
    const updateNewsletter = vi.fn();
    const user = userEvent.setup();
    const email = "some_persons@email.com";

    render(<NewsletterForm updateNewsletter={updateNewsletter} />);

    const emailInput = screen.getByTestId("email");
    const submitButton = screen.getByTestId("submit");

    await user.type(emailInput, email);
    await user.click(submitButton);

    expect(updateNewsletter).toHaveBeenCalledWith(email);
  });
});
