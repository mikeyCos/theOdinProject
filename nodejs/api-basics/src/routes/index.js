const { Router } = require("express");

const index = new Router();

index.get("/", (req, res) => {
  return res.send("Received a GET HTTP method");
});

index.post("/", (req, res) => {
  return res.send("Received a POST HTTP method");
});

index.put("/", (req, res) => {
  return res.send("Received a PUT HTTP method");
});
index.delete("/", (req, res) => {
  return res.send("Received a DELETE HTTP method");
});

module.exports = index;
