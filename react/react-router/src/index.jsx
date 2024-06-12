import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import routes from "./components/routes";
import "./styles/index.css";

// const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* <RouterProvider router={router} /> */}
  </React.StrictMode>
);
