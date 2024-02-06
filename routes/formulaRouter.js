const formulaController = require("../controllers/formulaController");

const express = require("express");

const formulaRouter = express.Router();

formulaController.forEach(({ action, url, method, mid = [] }) => {
  formulaRouter[method](url,...mid, action);
});

module.exports = formulaRouter;
