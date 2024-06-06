import { useEffect, useState } from "react";

/* Demo from
 * https://dmitripavlutin.com/react-useeffect-infinite-loop/
 */
export default function InputChanges() {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);
  //   Infinite loop
  //   useEffect(() => setCount(count + 1));

  const onChange = ({ target }) => {
    setValue(target.value);
    setCount(count + 1);
  };

  return (
    <section>
      <input type="text" value={value} onChange={onChange} />
      <div>Number of changes: {count}</div>
    </section>
  );
}
