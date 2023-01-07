const { User, Role } = require("../models/index");

class UserRepository {
  async createUser(data) {
    try {
      const user = await User.create(data);
      return {
        id: user.id,
        email: user.email,
      };
    } catch (error) {
      console.log("Something went wrong at the repository");
      throw { error };
    }
  }

  async deleteUser(userId) {
    try {
      const response = await User.destroy({
        where: {
          id: userId,
        },
      });
      return response;
    } catch (error) {
      console.log("Something went wrong at the repository");
      throw { error };
    }
  }

  async getUserById(userId) {
    try {
      // const user = await User.findOne({
      //   where: {
      //     id: userId,
      //   },
      // });

      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("Something went wrong at the repository");
      throw { error };
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      return user;
    } catch (error) {
      console.log("Something went wrong at the repository");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      const response = await user.hasRole(adminRole);
      return response;
    } catch (error) {
      console.log("Something went wrong at the repository");
      throw error;
    }
  }
}

module.exports = UserRepository;
