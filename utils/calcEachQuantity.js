const createDefaultMixingRatio = require("./createDefaultMixingRatio");
const numFix = require("./numFix");
const transformMixingRatio = require("./transformMixingRatio");

module.exports = (data, mixingRatio, totalQuantity) => {
  const defaultMixingRatio = createDefaultMixingRatio(data);
  const result = { data: null, err: null };
  const ratioArr = mixingRatio
    ? transformMixingRatio(mixingRatio).data
    : defaultMixingRatio;
  if (ratioArr.length !== data.length) {
    result.err = "invalid mixing ratio";
    return result;
  }
  // calculating the total ratio
  let totalRatio = 0;
  ratioArr.forEach((elem) => {
    totalRatio += elem;
  });
  const transformed = data.map((elem, index) => {
      elem.quantity = numFix((ratioArr[index] / totalRatio) * totalQuantity);
      return elem
  });
  result.data = transformed;
  return result;
};


