const express = require("express");
const { normalizeRole } = require("../middleware/authMiddleware");
const AuthService = require("../services/auth");

function auth(app) {
  const router = express.Router();
  const authServ = new AuthService();
  app.use("/api/auth", router);

  router.post("/login", async (req, res) => {
    const result = await authServ.logIn(req.body);

    return res.status(result.error ? 400 : 200).json(result);
  });

  router.post("/signup", normalizeRole, async (req, res) => {
    const result = await authServ.signUp(req.body);

    return res.status(result.error ? 400 : 200).json(result);
  });
}

module.exports = auth;
