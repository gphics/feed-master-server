const bcryptCompare = require("../../../configs/encryption/bcryptCompare");
const bcryptHash = require("../../../configs/encryption/bcryptHash");
const jwtSign = require("../../../configs/encryption/jwtSign");
const jwtVerify = require("../../../configs/encryption/jwtVerify");
const errorGenerator = require("../../../configs/errorGenerator");
const userModel = require("../../../models/userModel");

module.exports = async (req, res, next) => {
  const { auth_token } = req.query;
  const { oldPassword, newPassword } = req.body;
  // input validation start
  // validating existence
  if (!oldPassword || !newPassword) {
    return next(errorGenerator("Both old and new password must be provided"));
  }
  // checking if the old and new password are not the same
  if (oldPassword === newPassword) {
    return next(errorGenerator("Both old and new password cannot be the same"));
  }
  // validating completeness
  if (newPassword.length < 6 || oldPassword.length < 6) {
    return next(errorGenerator("password length cannot be less than six"));
  }
  // input validation end

  const { data, err } = jwtVerify(auth_token);

  if (err) {
    return next(errorGenerator(err));
  }
  // getting the user
  const user = await userModel.findOne({ email: data.email });
  const check = await bcryptCompare(oldPassword, user.password);
  if (!check) {
    return next(errorGenerator("The old password provided is incorrect"));
  }
  const token = jwtSign({email:data.email})
  const encrpytedPassword = await bcryptHash(newPassword);
  user.password = encrpytedPassword;
  await user.save();
  res.json({
    data: { data: "password updated successfully", auth_token: token },
    err: null,
  });
};
