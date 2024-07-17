import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/Example02.module.css";

const ThemeContext = createContext(null);
const CurrentUserContext = createContext(null);

export default function Example02() {
  const [theme, setTheme] = useState("light");
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <WelcomePanel />
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
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
  );
}

function WelcomePanel() {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Panel title="Welcome">
      {currentUser !== null ? <Greeting /> : <LoginForm />}
    </Panel>
  );
}

function Greeting() {
  const { currentUser } = useContext(CurrentUserContext);
  return <p>You logged in as {currentUser.name}.</p>;
}

function LoginForm() {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const canLogin = firstName.trim() !== "" && lastName.trim() !== "";
  return (
    <>
      <label>
        First name{": "}
        <input
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last name{": "}
        <input
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <Button
        disabled={!canLogin}
        onClick={() => {
          setCurrentUser({
            name: firstName + " " + lastName,
          });
        }}
      >
        Log in
      </Button>
      {!canLogin && <i>Fill in both fields.</i>}
    </>
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

function Button({ children, disabled, onClick }) {
  const theme = useContext(ThemeContext);
  const className = styles[`button-${theme}`];
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
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
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
