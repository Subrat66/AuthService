const { response } = require("express");
const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const user = await userService.createUser({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      data: user,
      success: true,
      message: "Successfully created an user",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create an user",
      err: error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await userService.deleteUser(userId);

    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully deleted an user",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to delete an user",
      err: error,
    });
  }
};

const get = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUser(userId);

    return res.status(201).json({
      data: user,
      success: true,
      message: "Successfully fetched the user",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the user",
      err: error,
    });
  }
};

module.exports = {
  create,
  destroy,
  get,
};
