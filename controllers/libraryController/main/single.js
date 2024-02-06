const errorGenerator = require("../../../configs/errorGenerator");
const libraryModel = require("../../../models/libraryModel");

module.exports = async (req, res, next) => {
  const { name } = req.params;
    const { auth_token } = req.query;
  const ingredient = await libraryModel.findOne({ name });
  if (!ingredient) {
    return next(errorGenerator(`feed ingredient ${name} does not exist`));
  }
  res.json({ data: {data:ingredient, auth_token}, err: null });
};
