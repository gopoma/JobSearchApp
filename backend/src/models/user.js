const { mongoose } = require("../config/db");
const { Schema, model } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    trim: true
  },
  birthday: Date,
  profilePic: String,
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
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
userSchema.plugin(uniqueValidator);

const UserModel = model("users", userSchema);

module.exports = UserModel;
