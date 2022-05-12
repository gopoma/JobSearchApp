const express = require("express");
const { verifyToken, employerAdminValidation } = require("../middleware/authMiddleware");
const OfferService = require("../services/offers");

function offers(app) {
  const router = express.Router();
  const offerServ = new OfferService();
  app.use("/api/offers", verifyToken);
  app.use("/api/offers", router);

  router.get("/", async (req, res) => {
    const offers = await offerServ.getAll();
    return res.status(200).json(offers);
  });

  router.get("/categories", async (req, res) => {
    const offers = await offerServ.listByCategorie(req.body.categorie);
    return res.status(200).json(offers);
  });

  router.get("/countries", async (req, res) => {
    const offers = await offerServ.listByCountry(req.body.country);
    return res.status(200).json(offers);
  });

  router.get("/:id", async (req, res) => {
    const offer = await offerServ.get(req.params.id);
    return res.status(200).json(offer);
  });

  router.post("/", employerAdminValidation, async (req, res) => {
    const offer = await offerServ.create(req.body);
    return res.status(201).json(offer);
  });

  router.put("/:id", employerAdminValidation, async (req, res) => {
    const offer = await offerServ.update(req.params.id, req.body);
    return res.status(201).json(offer);
  });

  router.delete("/:id", employerAdminValidation, async (req, res) => {
    const offer = await offerServ.delete(req.params.id);
    return res.status(202).json(offer);
  });

  router.post("/addApplicant", async (req, res) => {
    const offer = await offerServ.addApplicant(req.body.idOffer, req.body.idApplicant);
    return res.status(201).json(offer);
  });
}

module.exports = offers;
