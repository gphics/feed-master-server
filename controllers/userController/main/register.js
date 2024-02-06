const bcryptHash = require("../../../configs/encryption/bcryptHash");
const jwtSign = require("../../../configs/encryption/jwtSign");
const errorGenerator = require("../../../configs/errorGenerator");
const userModel = require("../../../models/userModel");
const cookieOptions = require("../../../utils/cookieOptions");
/**
 *
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * This route uses three middlewares
 * 1) The dontPermitIfAuth middleware
 * 2) The authValidator middleware that validate the req.body contents
 * 3) The isUserExist middleware that reject the operation if the user already exist
 */
module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // hashing the received password
    const hashedPassword = await bcryptHash(password);
    // creating the user
    await userModel.create({
      email,
      password: hashedPassword,
    });
    // generating jwt token
    const token = jwtSign({ email });

    res.json({
      data: { data: "user registration successful", auth_token:token },
      err: null,
    });
  } catch (error) {
    next(errorGenerator(error.message));
  }
};
