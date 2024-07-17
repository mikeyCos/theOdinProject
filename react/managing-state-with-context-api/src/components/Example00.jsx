import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/Example00.module.css";

const ThemeContext = createContext(null);

export default function MyApp() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <Form />
      <label>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={(e) => {
            setTheme(e.target.checked ? "dark" : "light");
          }}
        />
        Use dark mode
      </label>
    </ThemeContext.Provider>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = styles[`panel-${theme}`];
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = styles[`button-${theme}`];
  return <button className={className}>{children}</button>;
}

Panel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

Button.propTypes = {
  children: PropTypes.string,
};
