const errorGenerator = require("../configs/errorGenerator");
const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(errorGenerator("email must be provided"));
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return next();
  }
  next(errorGenerator("user already exist"));
};
