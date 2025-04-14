const express = require("express");
const jwt = require("jsonwebtoken"); // https://www.npmjs.com/package/jsonwebtoken

const port = 3000;

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world!",
  });
});

// curl -w "\n" -X POST http://localhost:3000/api/post -H 'Authorization: Bearer <access_token>'
app.post("/api/post", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created",
        data,
      });
    }
  });
});

// curl -w "\n" -X POST http://localhost:3000/api/post
app.post("/api/login", (req, res) => {
  // Normally, make a request to the path and authenticate
  // Mock user
  const user = {
    id: 1,
    username: "Bobby",
    email: "bobby@gmail.com",
  };

  jwt.sign({ user }, "secretKey", { expiresIn: "30s" }, (err, token) => {
    res.json({
      token,
    });
  });
  // Front end wil need to save the token in local storage
});

// Token format
// Authorization: Bearer <access_token>

// Middleware
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    req.token = token;
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.listen(3000, () => {
  console.log(`App listening on port ${port}`);
});
