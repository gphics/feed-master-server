module.exports = (
  requiredCrudeProtein,
  requiredQuantity,
  fixedQuantity = 0,
  fixedCpQuantity = 0
) => {
  // converting percentage cp to kg of the required quantity
  const cpQuantity = (requiredCrudeProtein / 100) * requiredQuantity;
  // gettiing the quantity of feed that will contribute to the overall crude protein
  const netFeedQuantity = requiredQuantity - fixedQuantity;
  // getting the left cp after subtracting the fixed cp
  const netFeedCp = cpQuantity - fixedCpQuantity;
  // the final cp to be used
  const finalFeedCp = (netFeedCp / netFeedQuantity) * 100;

  return {
    data: { cpQuantity, netFeedCp, netFeedQuantity, finalFeedCp },
    err: null,
  };
};

/*
{
  "name":"Broiler starter feed",
  "requiredQuantity":100,
  "requiredCrudeProtein":23,
  "note":"hello world",
  "input":[
    {"name":"maize", "cp":9, "price":400},
    {"name":"sorghum", "cp":12, "price":300}, 
    {"name":"cassava peel", "cp":5.6, "price":150},
    {"name":"soybean meal", "cp":45, "price":890 },
    {"name":"groundnut cake", "cp":34, "price":500},
    {"name":"premix", "cp":0, "price":50, "quantity":3},
    {"name":"calcium", "cp":0, "price":250, "quantity":3},
     
    {"name":"antibiotics", "cp":0, "price":50, "quantity":3},
    {"name":"salt", "cp":0, "price":50, "quantity":1}
    ]
}
*/
