const createDefaultMixingRatio = require("./createDefaultMixingRatio");
const transformMixingRatio = require("./transformMixingRatio");

// module.exports = (data, mixingRatio) => {
//   const arr = transformMixingRatio(mixingRatio);
//   const arrLength = arr.length;
//   const len = data.length;
//   if (len !== arrLength) {
//     return { data: null, err: "invalid mixing ratio" };
//   }
//   let totalRatio = 0;
//   let accumulatingRatio = 0;
//   data.forEach((elem, index) => {
//     const x = +((elem.cp / 100) * arr[index]).toFixed(2);
//     accumulatingRatio += x;
//     totalRatio += arr[index];
//   });

//   const totalCp = +((accumulatingRatio / totalRatio) * 100).toFixed(2);
//   return { data: totalCp, err: null };
// };

module.exports = (data, mixingRatio) => {
  const defaultMixingRatio = createDefaultMixingRatio(data);
  const arr = mixingRatio
    ? transformMixingRatio(mixingRatio).data
    : defaultMixingRatio;
  const arrLength = arr.length;
  const len = data.length;
  if (len !== arrLength) {
    return { data: null, err: "invalid mixing ratio" };
  }
  let totalRatio = 0;
  let accumulatingRatio = 0;
  data.forEach((elem, index) => {
    const x = (elem.cp / 100) * arr[index];
    accumulatingRatio += x;
    totalRatio += arr[index];
  });

  const totalCp = (accumulatingRatio / totalRatio) * 100
  return { data: totalCp, err: null };
};
