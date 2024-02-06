const bcrypt = require("bcrypt");
module.exports = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const encoded = await bcrypt.hash(data, salt);
  return encoded;
};
