const jwtSign = require("../configs/encryption/jwtSign");
const jwtVerify = require("../configs/encryption/jwtVerify");
const errorGenerator = require("../configs/errorGenerator");


module.exports = async (req, res, next) => {
  const { auth_token } = req.query;

  if (!auth_token) {
    return next(errorGenerator("you are not authenticated", 401));
  }
  const verifiedToken = jwtVerify(auth_token);
  const { data, err } = verifiedToken;

  if (err) {
    return next(errorGenerator(err));
  }

  const token = jwtSign({ email: data.email });
  req.query.auth_token = token;
  next();
};
