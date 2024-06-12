import { useState } from "react";

const IncrementButton = () => {
  const [counter, setCounter] = useState(0);
  return (
    <button onClick={() => setCounter((counter) => counter + 1)}>
      {counter}
    </button>
  );
};

export default IncrementButton;
