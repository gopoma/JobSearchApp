const { mongoose } = require("../config/db");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "password is required"],
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

const UserModel = model("users", userSchema);

module.exports = UserModel;
