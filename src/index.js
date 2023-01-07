const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");

const ApiRoutes = require("./routes/index");
// const UserService = require("./services/user-service");
const { User, Role } = require("./models/index");

const db = require("./models/index");
const app = express();

const setupAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", ApiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }

    // const userService = new UserService();
    // const newToken = userService.createToken({
    //   email: "kumar@admin.com",
    //   id: 2,
    // });
    // console.log(newToken);

    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imt1bWFyQGFkbWluLmNvbSIsImlkIjoyLCJpYXQiOjE2NzI2MDE5NjIsImV4cCI6MTY3MjYwNTU2Mn0.VBO6yr2cCTw9kROuYNXaX4mnSs8UsyHDlBsvwXYSFLk";
    // const response = userService.verifyToken(token);
    // console.log(response);
  });
};

setupAndStartServer();
