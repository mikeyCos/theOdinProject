import { useState } from "react";

export default function Form() {
  //   let [firstName, setFirstName] = useState("");
  //   let [lastName, setLastName] = useState("");
  let [name, setName] = useState({ firstName: "", lastName: "" });

  function handleFirstNameChange(e) {
    setName({ ...name, firstName: e.target.value });
    // setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setName({ ...name, lastName: e.target.value });
    // setLastName(e.target.value);
  }

  function handleReset() {
    // setFirstName("");
    // setLastName("");
    setName({ firstName: "", lastName: "" });
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        placeholder="First name"
        value={name.firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={name.lastName}
        onChange={handleLastNameChange}
      />
      <h1>
        Hi, {name.firstName} {name.lastName}
      </h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
