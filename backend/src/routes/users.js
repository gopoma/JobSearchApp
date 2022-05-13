const express = require("express");
const {
  verifyToken,
  adminValidation
} = require("../middleware/authMiddleware");
const UserService = require("../services/users");

function users(app) {
  const router = express.Router();
  const userServ = new UserService();

  app.use("/api/users", verifyToken);
  app.use("/api/users", router);

  router.get("/", adminValidation, async (req, res) => {
    const users = await userServ.getAll();
    return res.status(200).json(users);
  });

  router.get("/:id", async (req, res) => {
    const user = await userServ.get(req.params.id, req.user.role);
    return res.status(200).json(user);
  });

  router.post("/", adminValidation, async (req, res) => {
    const user = await userServ.create(req.body);
    return res.status(user.error ? 400 : 201).json(user);
  });

  router.put("/:id", adminValidation, async (req, res) => {
    const user = await userServ.update(req.params.id, req.body);
    return res.status(201).json(user);
  });

  router.delete("/:id", adminValidation, async (req, res) => {
    const user = await userServ.delete(req.params.id);
    return res.status(202).json(user);
  });
}

module.exports = users;
