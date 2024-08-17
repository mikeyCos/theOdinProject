const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const indexRouter = require("./routes/indexRouter.js");

dotenv.config();

const PORT = process.env.PORT || 9999;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/", indexRouter);

app.listen(PORT, () => console.log(`App running on port: ${PORT}.`));
