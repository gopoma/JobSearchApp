const OfferModel = require("../models/offer");
const UserModel = require("../models/user");
class OfferService {
  async getAll() {
    try {
      const offers = OfferModel.find().populate("applicants", "name email role");
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
      const offer = await OfferModel.create(data);
      return offer;
    } catch(error) {
      const messages = Object.keys(error.errors).map(key => error.errors[key].message);

      return {
        error: true,
        messages
      };
    }
  }

  async update(user, idOffer, data) {
    try {
      const aux = await this.get(idOffer);
      if(!(aux.idPublisher.toString() === user.id) && user.role !== "admin") {
        return {
          error: true,
          messages: ["Why did you try to modify another's offer D:?"]
        }
      }

      const offer = await OfferModel.findByIdAndUpdate(idOffer, data, { new: true });
      return offer;
    } catch(error) {
      console.log(error);
    }
  }

  async delete(user, idOffer) {
    try {
      const aux = await this.get(idOffer);
      if(!aux) {
        return {
          error: true,
          messages: ["That offer doesn't exist!"]
        }
      }
      if(!(aux.idPublisher.toString() === user.id) && user.role !== "admin") {
        return {
          error: true,
          messages: ["Why did you try to delete another's offer D:?"]
        }
      }

      const offer = await OfferModel.findByIdAndDelete(idOffer);
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
