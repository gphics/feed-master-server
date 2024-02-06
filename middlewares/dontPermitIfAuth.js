const errorGenerator = require("../configs/errorGenerator");

module.exports = async (req, res, next) => {
  const { auth_token } = req.query;

  if (auth_token) {
    return next(errorGenerator("you are authenticated already"));
  }

  next();
};
