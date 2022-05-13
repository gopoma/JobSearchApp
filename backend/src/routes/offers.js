const express = require("express");
const { verifyToken, employerAdminValidation } = require("../middleware/authMiddleware");
const OfferService = require("../services/offers");

function normalizeIdPublisher(req, res, next) {
  req.body.idPublisher = req.user.id;
  return next();
}

function offers(app) {
  const router = express.Router();
  const offerServ = new OfferService();
  app.use("/api/offers", verifyToken);
  app.use("/api/offers", router);

  router.get("/", async (req, res) => {
    const offers = await offerServ.getAll();
    return res.status(200).json(offers);
  });

  router.get("/salary", async (req, res) => {
    const offers = await offerServ.listBySalary(req.query.min, req.query.max);
    return res.status(200).json(offers);
  });

  router.get("/categories", async (req, res) => {
    const offers = await offerServ.listByCategorie(req.query.categorie);
    return res.status(200).json(offers);
  });

  router.get("/countries", async (req, res) => {
    const offers = await offerServ.listByCountry(req.query.country);
    return res.status(200).json(offers);
  });

  router.get("/:id", async (req, res) => {
    const offer = await offerServ.get(req.params.id);
    return res.status(200).json(offer);
  });

  router.post("/", employerAdminValidation, normalizeIdPublisher, async (req, res) => {
    const offer = await offerServ.create(req.body);
    return res.status(offer.error ? 400 : 201).json(offer);
  });

  router.post("/addApplicant", async (req, res) => {
    const offer = await offerServ.addApplicant(req.body.idOffer, req.body.idApplicant);
    return res.status(201).json(offer);
  });

  router.post("/:idOffer/addComment", async (req, res) => {
    const result = await offerServ.addComment(req.params.idOffer, req.user.id, req.body.content);
    return res.status(201).json(result);
  });

  router.put("/:id", employerAdminValidation, async (req, res) => {
    const offer = await offerServ.update(req.user, req.params.id, req.body);
    return res.status(offer.error ? 403 : 201).json(offer);
  });

  router.delete("/:id", employerAdminValidation, async (req, res) => {
    const offer = await offerServ.delete(req.user, req.params.id);
    return res.status(offer.error ? 403 : 201).json(offer);
  });
}

module.exports = offers;
