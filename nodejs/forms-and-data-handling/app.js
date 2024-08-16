const express = require("express");
const path = require("path");
const usersRouter = require("./routes/usersRouter");

const app = express();
const PORT = process.env.PORT || 3000;

console.log(__dirname);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use("/", usersRouter);

app.listen(PORT, () => console.log(`Application running on port: ${PORT}`));
