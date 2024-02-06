const errorGenerator = require("../../../configs/errorGenerator");
const nutrientRequirementModel = require("../../../models/nutrientRequirementModel");

module.exports = async (req, res, next) => {
  try {
     const { id } = req.params;
  const { auth_token } = req.query;
    const nutrientRequirement = await nutrientRequirementModel.findById(id);
    
  if (!nutrientRequirement) {
    return next(errorGenerator("nutrient requirement does not exist", 404));
  }
  res.json({ data: {auth_token, data:nutrientRequirement}, err: null });
  } catch (error) {
    const isCast = String(error.message).includes("Cast to ObjectId failed for value");
    // console.log(typeof error.message)
    // next(errorGenerator(error.message))
    next(errorGenerator(isCast ?"inavlid id":error.message))
  }
 

};
