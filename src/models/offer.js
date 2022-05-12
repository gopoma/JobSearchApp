const { mongoose: { Schema, model } } = require("../config/db");

const offerSchema = new Schema({
  name: String,
  description: String,
  categories: [String]
});
