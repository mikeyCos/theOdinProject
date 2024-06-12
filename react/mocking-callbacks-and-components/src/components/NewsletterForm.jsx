import { useState } from "react";

const NewsletterForm = ({ updateNewsletter }) => {
  const [signedUp, setSignedUp] = useState(false);
  const [email, setEmail] = useState("");

  const header = signedUp ? "You're signed up!" : "Sign up for our newsletter!";
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateNewsletter(email);
    setSignedUp(true);
  };

  return (
    <form onSubmit={handleSubmit} className="newsletter">
      <span>{header}</span>
      <label>Email address</label>
      <input
        data-testid="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" data-testid="submit" disabled={!email}>
        Sign up
      </button>
    </form>
  );
};

export default NewsletterForm;
