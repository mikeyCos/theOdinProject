import { useState } from "react";

export default function ChangeHeading() {
  const [heading, setHeading] = useState("Magnificent Monkeys");
  const clickHandler = () => setHeading("Radical Parrots");

  return (
    <section id="change-heading">
      <h1>{heading}</h1>
      <button type="button" onClick={clickHandler}>
        Change heading
      </button>
    </section>
  );
}
