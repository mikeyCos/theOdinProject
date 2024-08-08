import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send(err.message);
});

const middleware1 = (req, res, next) => {
  console.log("Middleware 1");
  next(); // Pass control to the next middleware
};

const middleware2 = (req, res, next) => {
  console.log("Middleware 2");
  res.send("Response from Middleware 2");
  // request-response cycle ends here
};

const middleware3 = (req, res, next) => {
  console.log("Middleware 3");
  res.send("Response from Middleware 3");
};

app.use(middleware1);
app.use(middleware2);
app.use(middleware3);
app.use("/users", userRouter);

app.listen(port, () => console.log(`Server running on port: ${port}`));
