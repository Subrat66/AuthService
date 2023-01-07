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

const getById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);

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

const signIn = async (req, res) => {
  try {
    const result = await userService.signIn(req.body.email, req.body.password);
    return res.status(201).json({
      data: result,
      success: true,
      message: "Sign in done successfully",
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

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.verifyToken(token);

    return res.status(200).json({
      data: response,
      success: true,
      message: "User is authenticated and token is valid",
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

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      data: response,
      success: true,
      message: "Successfully fetched whether user is authenticated or not",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Something went wrong",
      err: error,
    });
  }
};

module.exports = {
  create,
  destroy,
  getById,
  signIn,
  isAuthenticated,
  isAdmin,
};
