const UserRepository = require("../repository/user-repository");

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
}

module.exports = UserService;
