const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { PORT } = require("./utils/environment");
const { staticPaths, viewsPaths } = require("./paths/paths");

const indexRouter = require("./routers/indexRouter");
const signupRouter = require("./routers/signupRouter");
const loginRouter = require("./routers/loginRouter");
const logoutRouter = require("./routers/logoutRouter");

/* const {
  serializeUser,
  deserializeUser,
} = require("./authentication/userSerialization");
const loginStrategy = require("./authentication/loginStrategy"); */
require("./authentication/loginStrategy");

const app = express();

/* passport.use(loginStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser); */

// Specify static paths
app.use(staticPaths.map((path) => express.static(path)));

// Settings views
app.set("views", viewsPaths);
app.set("view engine", "ejs");

// What to call this block?
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Application-level
app.use((req, res, next) => {
  console.log("application-level middleware running...");
  console.log("req.session:", req.session);
  console.log("req.user:", req.user);
  res.locals.currentUser = req.user;
  next();
});

// Router-level
app.use("/", indexRouter);
app.use("/sign-up", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

// Error handling
app.use((err, req, res, next) => {
  console.log("err:", err);
  res.render("404", { title: "404 - Page Not Found" });
});

app.listen(PORT, () => console.log(`App running on port: ${PORT}.`));
