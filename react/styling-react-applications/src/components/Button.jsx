/* How to Style React Components Using CSS Modules
 * https://www.makeuseof.com/react-components-css-modules-style/
 * https://vitejs.dev/guide/features#css-modules
 */

import { useState } from "react";
import styles_button from "../styles/Button.module.css";

const Button = () => {
  const [incrementCount, setIncrementCount] = useState(0);
  const incrementHandler = () =>
    setIncrementCount((increment) => increment + 1);
  return (
    <section>
      <button className={styles_button.btn} onClick={incrementHandler}>
        Click me
      </button>
      <p>
        Count: <span>{incrementCount}</span>
      </p>
    </section>
  );
};

export default Button;
