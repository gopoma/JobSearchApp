const OfferModel = require("../models/offer");
const UserModel = require("../models/user");
class OfferService {
  async getAll() {
    try {
      const offers = OfferModel.find();
      return offers;
    } catch(error) {
      console.log(error);
    }
  }

  async listByCategorie(categorie) {
    const offers = await OfferModel.find({ categories: { $regex:  `.*${categorie}.*` } });
    return offers;
  }

  async listByCountry(country) {
    const offers = await OfferModel.find({ countries: { $regex: `.*${country}.*` } });
    return offers;
  }

  async get(idOffer) {
    const offer = await OfferModel.find({ _id: idOffer });
    return offer[0];
  }

  async create(data) {
    try {
      const offer = OfferModel.create(data);
      return offer;
    } catch(error) {
      console.log(error);
    }
  }

  async update(id, data) {
    try {
      const offer = await OfferModel.findByIdAndUpdate(id, data, { new: true });
      return offer;
    } catch(error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const offer = await OfferModel.findByIdAndDelete(id);
      return offer;
    } catch(error) {
      console.log(error);
    }
  }

  async addApplicant(idOffer, idApplicant) {
    try {
      const result = await OfferModel.updateOne({ _id: idOffer }, { $push: { applicants: { _id: idApplicant } } });
      await UserModel.updateOne({ _id: idApplicant }, { $push: { applications: { _id: idOffer } } });
      return result;
    } catch(error) {
      console.log(error);
    }
  }
}

module.exports = OfferService;
