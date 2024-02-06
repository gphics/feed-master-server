const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
  {
    name: String,
    img_url: String,
    description: Array,
    categories: Array,
    nutritionalValues: Array,
    nutritionalAttributes: Array,
    potentialConstraints: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("library", librarySchema);
