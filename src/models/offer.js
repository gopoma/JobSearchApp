const { mongoose } = require("../config/db");
const { Schema, model } = mongoose;

const offerSchema = new Schema({
  title: String,
  description: String,
  categories: [String],
  applicants: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ]
});

const OfferModel = model("offers", offerSchema);

module.exports = OfferModel;
