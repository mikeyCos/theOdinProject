import { useState, useEffect } from "react";

export default function MessageForm() {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setShowForm(false);
    sendMessage(message);
  }

  if (!showForm) {
    return (
      <section>
        <h1>Thanks for using our services!</h1>
        <button
          onClick={() => {
            setMessage("");
            setShowForm(true);
          }}
        >
          Open chat
        </button>
      </section>
    );
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" disabled={message === ""}>
          Send
        </button>
      </form>
    </section>
  );
}

function sendMessage(message) {
  console.log("Sending message: " + message);
}
