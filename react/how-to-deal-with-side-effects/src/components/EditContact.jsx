import { useState, useEffect } from "react";

export default function EditContact(props) {
  return <FormContact key={props.savedContact.id} {...props} />;
}

function FormContact({ savedContact, onSave }) {
  const [name, setName] = useState(savedContact.name);
  const [email, setEmail] = useState(savedContact.email);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>
        Name:{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button
        onClick={() => {
          const updatedData = {
            id: savedContact.id,
            name: name,
            email: email,
          };
          onSave(updatedData);
        }}
      >
        Save
      </button>
      <button
        onClick={() => {
          setName(savedContact.name);
          setEmail(savedContact.email);
        }}
      >
        Reset
      </button>
    </form>
  );
}
