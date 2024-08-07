import express from "express";
import dotenv from "dotenv";
import pizzasRouter from "./routes/pizzasRouter.js";
import tickersRouter from "./routes/tickersRouter.js";

dotenv.config();

const { dirname } = import.meta;
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile("./public/views/index.html", { root: dirname });
});

app.get("/home", (req, res) => {
  res.status(301);
  res.redirect("/");
});

app.use("/pizza", pizzasRouter({ root: dirname }));
app.use("/ticker", tickersRouter({ root: dirname }));

app.listen(port, () => console.log("Express server running..."));
