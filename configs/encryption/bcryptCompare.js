const bcrypt = require("bcrypt");
module.exports = async (data, encrypted) => {
  const check = await bcrypt.compare(data, encrypted);
  return check;
};
