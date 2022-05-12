const { mongoose } = require("../config/db");
const { Schema, model } = mongoose;

const offerSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "description is required"],
    trim: true
  },
  categories: [String],
  countries: [String],
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
