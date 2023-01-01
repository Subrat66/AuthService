const validateUserAuth = (req, res, next) => {
  if (!req.email || !req.password) {
    return res.status(400).json({
      data: {},
      success: false,
      message: "Something went wrong",
      err: "Email or password missing in the request",
    });
  }
  next();
};

module.exports = {
  validateUserAuth,
};