const express = require("express");
const nutrientRequirementsController = require("../controllers/nutrientRequirementsController");

const nutrientRequirementRouter = express.Router();

nutrientRequirementsController.forEach(({ action, method, url, mid = [] }) => {
  nutrientRequirementRouter[method](url, ...mid, action);
});

module.exports = nutrientRequirementRouter;
