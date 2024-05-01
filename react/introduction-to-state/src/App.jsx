import { useState } from "react";
import "./App.css";
import Gallery from "./components/Gallery";
import Form from "./components/Form";
import FeedbackForm from "./components/FeedbackForm";

const COLORS = ["pink", "green", "purple", "lightblue", "lightcoral"];

export default function App() {
  const [backgroundColor, setBackgroundColor] = useState(COLORS[0]);
  const btnClickHandler = (color) => () => {
    setBackgroundColor(color);
  };

  return (
    <div className="app" style={{ backgroundColor }}>
      {COLORS.map((color) => (
        <button
          type="button"
          key={color}
          onClick={btnClickHandler(color)}
          className={backgroundColor === color ? "selected" : ""}
        >
          {color}
        </button>
      ))}
      <Gallery />
      <Gallery />
      <Form />
      <FeedbackForm />
    </div>
  );
}
