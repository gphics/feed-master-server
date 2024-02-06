const errorGenerator = require("../configs/errorGenerator");

module.exports = async (req, res, next) => {
  const { password, email } = req.body;

  // validating user input start
  if (!email || !password) {
    return next(errorGenerator("email and password must be provided"));
  }
  if (password.length < 6) {
    return next("password length must be greater than five");
  }
  // validating user input end

  next();
};
