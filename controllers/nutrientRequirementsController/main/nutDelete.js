const errorGenerator = require("../../../configs/errorGenerator");
const nutrientRequirementModel = require("../../../models/nutrientRequirementModel");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { auth_token } = req.query;
  const nut = await nutrientRequirementModel.findByIdAndDelete(id);

  if (!nut) {
    return next(errorGenerator("nutrient requirement does not exist"));
  }
  res.json({ data: {auth_token, data: "deleted successfully"}, err: null });
};
