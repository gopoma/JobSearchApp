const OfferModel = require("../models/offer");

class OfferService {
  async getAll() {
    try {
      const offers = OfferModel.find();

      return offers;
    } catch(error) {
      console.log(error);
    }
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
    const offer = await OfferModel.findByIdAndUpdate(id, data, { new: true });

    return offer;
  }

  async delete(id) {
    const offer = await OfferModel.findByIdAndDelete(id);

    return offer;
  }
}

module.exports = OfferService;
