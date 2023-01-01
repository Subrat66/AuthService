const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");

const userRepository = new UserRepository();

class UserService {
  async createUser(data) {
    try {
      const user = await userRepository.createUser(data);
      return user;
    } catch (error) {
      console.log("Something went wrong at the service layer");
      throw { error };
    }
  }

  async deleteUser(userId) {
    try {
      const response = await userRepository.deleteUser(userId);
      return response;
    } catch (error) {
      console.log("Something went wrong at the service layer");
      throw { error };
    }
  }

  async getUser(userId) {
    try {
      const user = await userRepository.getUser(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong at the service layer");
      throw { error };
    }
  }

  createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, {
        expiresIn: "1h",
      });
      return token;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation", error);
      throw error;
    }
  }
}

module.exports = UserService;
