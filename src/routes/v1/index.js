const express = require("express");
const router = express.Router();

const { AuthRequestValidators } = require("../../middlewares/index");
const UserController = require("../../controllers/user-controller");

router.post(
  "/signup",
  AuthRequestValidators.validateUserAuth,
  UserController.create
);

router.post(
  "/signin",
  AuthRequestValidators.validateUserAuth,
  UserController.signIn
);

router.delete("/user/:id", UserController.destroy);

router.get("/user/:id", UserController.getById);

router.get("/user/isAuthenticated", UserController.isAuthenticated);

router.get(
  "/isAdmin",
  AuthRequestValidators.validateIsAdminRequest,
  UserController.isAdmin
);

module.exports = router;
