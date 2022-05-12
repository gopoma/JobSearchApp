const { mongoose } = require("../config/db");
const { Schema, model } = mongoose;

const offerSchema = new Schema({
  idPublisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "a Publisher is required"]
  },
  title: {
    type: String,
    required: [true, "Please provide title"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Please provide description"],
    trim: true
  },
  categories: [String],
  countries: [String],
  salary: Number,
  applicants: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ]
}, { timestamps: true });

const OfferModel = model("offers", offerSchema);

module.exports = OfferModel;
