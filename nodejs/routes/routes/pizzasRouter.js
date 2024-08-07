import { Router } from "express";

const pizzasRouter = (config) => {
  const router = Router();
  const { root } = config;

  router.get("/", (req, res) => {
    res.sendFile("public/views/pizzas/pizza.html", { root });
  });

  router.get("/:type", (req, res) => {
    const { type } = req.params;
    res.sendFile(`public/views/pizzas/${type}.html`, { root });
  });

  return router;
};

export default pizzasRouter;
