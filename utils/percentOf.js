const numFix = require("./numFix");

module.exports = (percent, absolutValue) => {
  return (percent / 100) * absolutValue;
};
