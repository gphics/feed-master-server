const errorGenerator = require("../../../configs/errorGenerator");
const nutrientRequirementModel = require("../../../models/nutrientRequirementModel");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { auth_token } = req.query;
    const nutrientRequirement =
      await nutrientRequirementModel.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );

    if (!nutrientRequirement) {
      return next(errorGenerator("nutrient requirement does not exist"));
    }
    res.json({ data: {auth_token, data:nutrientRequirement}, err: null });
  } catch (error) {
    next(errorGenerator(error.message));
  }
};
