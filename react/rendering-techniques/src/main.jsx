import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ProfessionList from "./components/ProfessionList.jsx";
import VegetableList from "./components/VegetableList.jsx";
import PizzaList from "./components/PizzaList.jsx";
import PackingList from "./components/PackingList.jsx";
import DrinkList from "./components/DrinkList.jsx";
import PeopleList from "./components/PeopleList.jsx";
import ScientistList from "./components/ScientistList.jsx";
import RecipesList from "./components/RecipeList.jsx";
import Poem from "./components/Poem.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ProfessionList />
    <VegetableList />
    <PizzaList />
    <PackingList />
    <DrinkList />
    <PeopleList />
    <ScientistList />
    <RecipesList />
    <Poem />
  </React.StrictMode>
);
