const { mongoose } = require("../config/db");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  idOffer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "offers",
    required: [true, "Please provide idOffer"]
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Please provide idUser"]
  },
  content: String
})

const CommentModel = model("comments", commentSchema);

module.exports = CommentModel;
