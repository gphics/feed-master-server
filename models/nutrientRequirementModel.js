const mongoose = require("mongoose");

const nutrientRequirementSchema = new mongoose.Schema(
  {
    name: String,
    stage: String,
    requirements: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "nutrient_requirements",
  nutrientRequirementSchema
);
