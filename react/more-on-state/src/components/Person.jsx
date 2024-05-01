import { useState } from "react";
import "../styles/person.css";

export default function Person() {
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  const fullName =
    person.firstName +
    (person.lastName.length > 0 && person.firstName.length > 0
      ? " " + person.lastName
      : person.lastName);

  const onChangeHandler = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  return (
    <div className="person">
      {fullName.length > 0 && <h2>{fullName}</h2>}
      {person.age.length > 0 && <h2>{person.age} years old</h2>}
      <Input
        label="First name: "
        attributes={{ type: "text", name: "firstName" }}
        value={person.firstName}
        onChangeHandler={onChangeHandler}
      />
      <Input
        label="Last name: "
        attributes={{ type: "text", name: "lastName" }}
        value={person.lastName}
        onChangeHandler={onChangeHandler}
      />
      <Input
        label="Age: "
        attributes={{ type: "number", min: "0", name: "age" }}
        value={person.age}
        onChangeHandler={onChangeHandler}
      />
    </div>
  );
}

function Input({ label, attributes, value, onChangeHandler }) {
  return (
    <>
      <label>
        {label}
        <input {...attributes} value={value} onChange={onChangeHandler}></input>
      </label>
    </>
  );
}
