import { useState } from "react";
import "../styles/syncedInputs.css";

export default function SyncedInputs() {
  const [text, setText] = useState("");

  //   function handleChange(e) {
  //     setText(e.target.value);
  //   }

  return (
    <div className="synced_inputs">
      <Input
        label="First input"
        text={text}
        onChangeHandler={(text) => setText(text)}
      />
      <Input
        label="Second input"
        text={text}
        onChangeHandler={(text) => setText(text)}
      />
    </div>
  );
}

function Input({ label, text, onChangeHandler }) {
  return (
    <label>
      {label}{" "}
      <input value={text} onChange={(e) => onChangeHandler(e.target.value)} />
    </label>
  );
}
