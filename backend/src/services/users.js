const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
class User {
  async getAll() {
    try {
      const users = await UserModel.find().populate("applications._id");
      return users;
    } catch(error) {
      console.log(error);
    }
  }

  async get(idUser, role) {
    try {
      const userData = await UserModel.find({ _id: idUser });

      if(role === "admin") {
        return userData[0];
      }

      const user = userData[0];
      return {
        _id: user._id,
        name: user.name,
        birthday: user.birthday,
        profilePic: user.profilePic,
        email: user.email,
        role: user.role
      };
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
      if(data.email && !data.email.match(/^[0-9a-zA-Z]+(\.[a-zA-Z]+)*@[a-zA-Z]+(\.[a-zA-Z]+)*$/)) {
        return {
          error: true,
          messages: [`The email ${data.email} is not valid!`]
        }
      }

      if(data.password) {
        data.password = await this.#encrypt(data.password);
      }
      const user = await UserModel.create(data);

      return user;
    } catch(error) {
      const messages = Object.keys(error.errors).map(key => error.errors[key].message);

      return {
        error: true,
        messages
      }
    }
  }

  async update(id, data) {
    try {
      if(data.password) {
        data.password = await this.#encrypt(data.password);
      }
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
