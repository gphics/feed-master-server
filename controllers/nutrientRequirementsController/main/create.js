const errorGenerator = require("../../../configs/errorGenerator");
const nutrientRequirementModel = require("../../../models/nutrientRequirementModel");

module.exports = async (req, res, next) => {
  const {auth_token} = req.query
  const { name, stage, requirements } = req.body;
  if (!name || !stage || !requirements) {
    return next(errorGenerator("all field must be provided"));
  }

  const nutrientRequirement = await nutrientRequirementModel.create({
    name,
    stage,
    requirements,
  });
  res.json({ data: {data:nutrientRequirement, auth_token}, err: null });
};
