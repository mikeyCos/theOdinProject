import express from "express";
import fs from "fs";
import path from "path";

const tickersRouter = (config) => {
  const router = express.Router();
  const { root } = config;

  router.get("/", (req, res) => {
    res.sendFile("./public/views/tickers/tickers.html", { root });
  });

  router.get("/search", (req, res) => {
    const { search_results } = req.query;

    fs.readFile(
      path.join(root, `/public/views/tickers/${search_results}.html`),
      "utf-8",
      (err, content) => {
        if (err)
          return res.sendFile("./public/views/tickers/404.html", { root });
        res.send(content);
      }
    );
  });

  return router;
};

export default tickersRouter;
