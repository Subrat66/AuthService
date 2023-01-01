const express = require("express");
const router = express.Router();

const { AuthRequestValidators } = require("../../middlewares/index");
const UserController = require("../../controllers/user-controller");

router.post(
  "/user/signup",
  AuthRequestValidators.validateUserAuth,
  UserController.create
);
router.post(
  "/user/signin",
  AuthRequestValidators.validateUserAuth,
  UserController.signIn
);
router.delete("/user/:id", UserController.destroy);
router.get("/user/:id", UserController.get);

module.exports = router;
