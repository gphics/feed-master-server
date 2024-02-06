const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      default: null,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    lastname: {
      default: null,
      type: String,
    },
    location: {
      default: null,
      type: String,
    },
    contact: {
      default: null,
      type: Number,
    },
    avatar: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dtu3jive9/image/upload/v1704574084/farm-master/tvix5ykok6o855mgrucz.jpg",
      },
      public_id: { default: null, type: String },
    },
    formulas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "formulas",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
