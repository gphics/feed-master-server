const jwt = require("jsonwebtoken");
module.exports = (value) => {
  const encoded = jwt.sign({ data: value }, process.env.API_SECRET, {
    expiresIn: +process.env.TIME,
  });
  return encoded;
};


