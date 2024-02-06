const bcryptCompare = require("../../../configs/encryption/bcryptCompare");
const jwtSign = require("../../../configs/encryption/jwtSign");
const errorGenerator = require("../../../configs/errorGenerator");
const userModel = require("../../../models/userModel");
const cookieOptions = require("../../../utils/cookieOptions");

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * This route uses two middlewares
 * 1) The dontPermitIfAuth middleware
 * 2) The authValidator middleware that validate the req.body contents
 */
module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  // getting the user from the database
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(errorGenerator("user does not exist"));
  }
  const validate = await bcryptCompare(password, user.password);
  if (!validate) {
    return next(errorGenerator("invalid credentials"));
  }
  //   creating the jwt token
  const token = jwtSign({ email });

  res.json({
    data: { auth_token: token, data: "logged in successfully" },
    err: null,
  });
};
