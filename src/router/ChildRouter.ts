import { Router } from "express";

export default function childRoute(): Router {
  const route = Router();
  route.get("/childs", (req, res) => res.send("Childs route"));
  route.get("/childs/:child_id", (req, res) =>
    res.send(`Childs route with id ${req.params.child_id}`),
  );

  route.post("/childs", (req, res) => {
    res.send("Childs route");
  });

  route.put("/childs/:child_id", (req, res) => {
    res.send(`Childs route with id ${req.params.child_id}`);
  });

  route.patch("/childs/:child_id", (req, res) => {
    res.send(`Childs route with id ${req.params.child_id}`);
  });

  route.delete("/childs/:child_id", (req, res) => {
    res.send(`Childs route with id ${req.params.child_id}`);
  });

  return route;
}
