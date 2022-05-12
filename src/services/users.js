const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
class User {
  async getAll() {
    try {
      const users = await UserModel.find();
      return users;
    } catch(error) {
      console.log(error);
    }
  }

  async get(idUser) {
    try {
      const user = await UserModel.find({ _id: idUser });
      return user[0];
    } catch(error) {
      console.log(error);
    }
  }

  async getByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch(error) {
      console.log(error);
    }
  }

  async create(data) {
    try {
      console.log(data);
      if(data.password) {
        data.password = await this.#encrypt(data.password);
      }
      const user = await UserModel.create(data);

      return user;
    } catch(error) {
      if(error.code === 11000) {
        const message = `The email ${error.keyValue.email} is already in use`;

        return {
          error: true,
          message
        }
      }
    }
  }

  async update(id, data) {
    try {
      const user = await UserModel.findByIdAndUpdate(id, data, { new: true});
      return user;
    } catch(error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const user = await UserModel.findByIdAndDelete(id);
      return user;
    } catch(error) {
      console.log(error);
    }
  }

  async #encrypt(str) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(str, salt);

      return hash;
    } catch(error) {
      console.log(error);
    }
  }
}

module.exports = User;
