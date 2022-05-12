const { mongoose } = require("../config/db");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    enum: ["applicant", "employer", "admin"],
    default: "applicant"
  },
  applications: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "offers"
      }
    }
  ]
});

const UserModel = model("users", userSchema);

module.exports = UserModel;
