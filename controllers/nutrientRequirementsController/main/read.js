const nutrientRequirementModel = require("../../../models/nutrientRequirementModel");

module.exports = async (req, res, next) => {
    const { auth_token } = req.query;
  const nutrientRequirements = await nutrientRequirementModel.find();
  res.json({ data: {data:nutrientRequirements, auth_token}, err: null });
};
