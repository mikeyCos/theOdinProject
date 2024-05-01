import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Button from "./components/Button.jsx";
import clickHandler from "./events/clickHandler.js";
import Profile from "./components/Profile.jsx";
import Gallery from "./components/Gallery.jsx";
import AProfile from "./components/AProfile.jsx";
import "./index.css";
import "./styles/gallery.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Button superDuperClickHandler={clickHandler} />
    <Button text="Do not click me!" color="Red" />
    <Button fontSize={24} />
    <Profile />
    <Gallery />
    <AProfile />
  </React.StrictMode>
);
