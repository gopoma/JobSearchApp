const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtSecret } = require("../config");
const UserService = require("./users");

class Auth {
  async logIn(data) {
    const { email, password } = data;

    const userServ = new UserService();
    const user = await userServ.getByEmail(email);

    if(user && await this.#compare(password, user.password)) {
      return this.#getUserData(user);
    }

    return {
      error: true,
      message: "Las credenciales son incorrectas"
    };
  }

  async signUp(data) {
    if(data.password) {
      data.password = await this.#encrypt(data.password);
    }

    const userServ = new UserService();
    const user = await userServ.create(data);

    if(user.error) {
      return user;
    }

    return this.#getUserData(user);
  }

  #getUserData(user) {
    const userData = {
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.id
    };
    const token = this.#createToken(userData);

    return {
      user: userData,
      token
    };
  }

  #createToken(payload) {
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "7d"
    });

    return token;
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

  async #compare(str, hash) {
    return await bcrypt.compare(str, hash);
  }
}

module.exports = Auth;
