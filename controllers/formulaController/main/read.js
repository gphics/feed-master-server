const errorGenerator = require("../../../configs/errorGenerator");
const formulaModel = require("../../../models/formulaModel");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { auth_token } = req.query;
  const formula = await formulaModel.findById(id);
  if (!formula) {
    return next(errorGenerator("formula does not exist"));
  }
  res.json({ data: {data:formula, auth_token}, err: null });
};
