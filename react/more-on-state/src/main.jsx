import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import TrafficLight from "./components/TrafficLight.jsx";
import TravelPlan from "./components/TravelPlan.jsx";
import MailClient from "./components/MailClient.jsx";
import InboxClient from "./components/InboxClient.jsx";
import SyncedInputs from "./components/SyncedInputs.jsx";
import FilterableList from "./components/FilterableList.jsx";
import Person from "./components/Person.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <TrafficLight />
    <TravelPlan />
    <MailClient />
    <InboxClient />
    <SyncedInputs />
    <FilterableList />
    <Person />
  </React.StrictMode>
);
