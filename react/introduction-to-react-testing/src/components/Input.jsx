import { useState } from "react";

export default function Input({ onChange }) {
  const [inputValue, setInputValue] = useState("");
  const onChangeHandler =
    onChange ??
    function (e) {
      setInputValue(e.currentTarget.value);
    };

  return (
    <div>
      <input type="text" onChange={onChangeHandler} value={inputValue}></input>
    </div>
  );
}
