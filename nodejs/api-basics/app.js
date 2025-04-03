const express = require("express");
const models = require("./src/models/index");
const routes = require("./src/routes");

const port = 3000;
const app = express();

// curl -w "\n" -X GET http://localhost:3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.context = { models, currentUser: models.users[1] };
  next();
});

app.use("/session", routes.session);
app.use("/messages", routes.messages);
app.use("/user", routes.user);
app.use("/", routes.index);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
