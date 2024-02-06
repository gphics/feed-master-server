const calcEachContributedCp = require("./calcEachContributedCp");
const calcEachCost = require("./calcEachCost");
const calcOverallContributedCp = require("./calcOverallContributedCp");
const calcOverallCost = require("./calcOverallCost");
const calcOverallQuantity = require("./calcOverallQuantity");

module.exports = (ingredients) => {
  // destructuring the fixedIngredients
  let { noCp, hasCp } = ingredients;
  // checking if there is no hasCp and noCp
  let err = null;
  if (noCp.length === 0 && hasCp.length === 0) {
    err = "no fixed ingredient available";
  }
  // declaring some state variables
  let noCpQuantity = 0;
  let hasCpQuantity = 0;
  let noCpCost = 0;
  let hasCpCost = 0;
  // dealing with noCp arrray
  if (noCp.length > 0) {
    noCp = calcEachCost(noCp).data;
    noCpQuantity = calcOverallQuantity(noCp).data;
    noCpCost = calcOverallCost(noCp).data;
    // noCp = noCp.map((elem) => (elem.contributedCp = 0));
  }
  // dealing with hasCp array
  if (hasCp.length > 0) {
    hasCp = calcEachCost(hasCp).data;
    hasCpQuantity = calcOverallQuantity(hasCp).data;
    hasCpCost = calcOverallCost(hasCp).data;
    hasCp = calcEachContributedCp(hasCp).data;
  }
  const overallFixedCost = noCpCost + hasCpCost;
  const overallFixedQuantity = noCpQuantity + hasCpQuantity;
  const overAllFixedContributedCp = calcOverallContributedCp(hasCp).data;
  const data = {
    noCp,
    noCpCost,
    noCpQuantity,
    hasCp,
    hasCpCost,
    hasCpQuantity,
    overallFixedCost,
    overallFixedQuantity,
    overAllFixedContributedCp,
  };
  return { data, err };
};
