const userController = require("../controllers/userController");

const express = require("express");

const userRouter = express.Router();

userController.forEach(({ action, url, method, mid = [] }) => {
  userRouter[method](url,...mid, action);
});

module.exports = userRouter;
