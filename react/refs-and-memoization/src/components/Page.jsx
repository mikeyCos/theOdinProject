import { useRef } from "react";

export default function Page() {
  const inputRef = useRef(null);

  const onClickHandler = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <nav>
        <button onClick={onClickHandler}>Search</button>
      </nav>
      <input ref={inputRef} placeholder="Looking for something?" />
    </>
  );
}
