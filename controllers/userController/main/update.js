const jwtVerify = require("../../../configs/encryption/jwtVerify");
const errorGenerator = require("../../../configs/errorGenerator");
const userModel = require("../../../models/userModel");

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * This controller uses the permitIfAuth middleware
 */
module.exports = async (req, res, next) => {
  const { auth_token } = req.query
  const { firstname, lastname, contact, location } = req.body;
  // req.body validation start
  if (!firstname && !lastname && !contact && !location) {
    return next(errorGenerator("at least a field must be filed"));
  }
  // req.body validation end
  const { data, err } = jwtVerify(auth_token);
  if (err) {
    return next(errorGenerator(err));
  }
  const user = await userModel.findOneAndUpdate(
    { email: data.email },
    { firstname, location, contact, lastname },
    { new: true }
  );
  res.json({ data: {data: "update successful", auth_token}, err: null });
};
