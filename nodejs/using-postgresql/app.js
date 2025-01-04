const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter.js");
const env = require("./utils/environment");

const PORT = env.port || 9999;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/", indexRouter);

app.listen(PORT, () => console.log(`App running on port: ${PORT}.`));
