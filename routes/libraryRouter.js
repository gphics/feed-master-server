const express = require("express");

const libraryController = require("../controllers/libraryController");

const libraryRouter = express.Router();

libraryController.forEach(({ action, url, method, mid = [] }) => {
  libraryRouter[method](url, ...mid, action);
});

module.exports = libraryRouter;
