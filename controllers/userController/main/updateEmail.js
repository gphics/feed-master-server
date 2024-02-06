const jwtSign = require("../../../configs/encryption/jwtSign");
const jwtVerify = require("../../../configs/encryption/jwtVerify");
const errorGenerator = require("../../../configs/errorGenerator");
const userModel = require("../../../models/userModel");
const cookieOptions = require("../../../utils/cookieOptions");

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * This route uses two middlewares
 * The first middleware is permitIfAuth
 * The second middleware is isUserExist that takes
 * the email in the request body and check if the email already exist
 * if yes, an error is thrown
 * if no, the user get permitted
 */
module.exports = async (req, res, next) => {
  // getting the email stored in the cookie
  const { auth_token } = req.query;
  const { data, err } = jwtVerify(auth_token);

  if (err) {
    return next(errorGenerator("err"));
  }
  // getting the new email
  const { email } = req.body;
  // finding the user and updating the email
  const user = await userModel.findOneAndUpdate(
    { email: data.email },
    { email },
    { new: true }
  );

  const token = jwtSign({ email });

  res.json({
    data: { data: "email updated successfully", auth_token: token },
    err: null,
  });
};
