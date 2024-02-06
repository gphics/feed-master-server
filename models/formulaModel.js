const mongoose = require("mongoose");

const formulaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    output: { type: Object, required: true },
    input: { type: Array, required: true },
    requiredQuantity: { type: Number, required: true },
    requiredCrudeProtein: { type: Number, required: true },
    mixingRatio: {
      type: Object,
      default: { energySource: "", proteinSourece: "" },
    },
    creator: { ref: "user", type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

module.exports = mongoose.model("formulas", formulaSchema);
