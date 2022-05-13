const CommentModel = require("../models/comment");

class CommentService {
  async create(idOffer, idUser, content) {
    const comment = await CommentModel.create({idOffer, idUser, content});
    return comment;
  }
}

module.exports = CommentService;
