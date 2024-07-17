import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/Example02.module.css";

const ThemeContext = createContext(null);
const CurrentUserContext = createContext(null);

export default function MyApp() {
  const [theme, setTheme] = useState("light");
  return (
    <MyProviders theme={theme} setTheme={setTheme}>
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
    </MyProviders>
  );
}

function MyProviders({ children, theme, setTheme }) {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        {children}
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
  const canLogin = firstName !== "" && lastName !== "";
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

MyProviders.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  theme: PropTypes.string,
  setTheme: PropTypes.func,
};

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
