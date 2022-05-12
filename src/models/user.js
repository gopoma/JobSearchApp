const { mongoose: { Schema, model } } = require("../config/db");

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    enum: ["applicant", "employer", "admin"]
  }
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
