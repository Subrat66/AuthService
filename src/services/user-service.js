const UserRepository = require("../repository/user-repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");

const userRepository = new UserRepository();

class UserService {
  async createUser(data) {
    try {
      const password = data.password;
      const hashedPassword = await bcrypt.hash(password, 7);
      data.password = hashedPassword;

      const user = await userRepository.createUser(data);
      return user;
    } catch (error) {
      console.log("Something went wrong at the service layer");
      throw { error };
    }
  }

  async signIn(email, plainPassword) {
    try {
      const user = await userRepository.getByEmail(email);

      const isPasswordMatching = await this.checkPassword(
        plainPassword,
        user.password
      );

      if (!isPasswordMatching) {
        console.log("Incorrect password");
        throw { err: "Incorrect password" };
      }

      const token = this.createToken({ email: user.email, id: user.id });
      return token;
    } catch (error) {
      console.log("Something went wrong in the sign in process");
      throw error;
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

  async getUserById(userId) {
    try {
      const user = await userRepository.getUserById(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong at the service layer");
      throw { error };
    }
  }

  async checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      const result = await bcrypt.compare(
        userInputPlainPassword,
        encryptedPassword
      );
      return result;
    } catch (error) {
      console.log("Password not matched");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid token" }; // response = { email: '--', id: -, iat: --, exp: -- }
      }

      const user = await userRepository.getUser(response.id);
      if (!user) {
        throw { error: "User does not exist for this corresponding token" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the auth process");
      throw error;
    }
  }

  createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, {
        expiresIn: "1d",
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

  async isAdmin(userId) {
    try {
      const response = await userRepository.isAdmin(userId);
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation", error);
      throw error;
    }
  }
}

module.exports = UserService;
