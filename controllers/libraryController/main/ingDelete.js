const errorGenerator = require("../../../configs/errorGenerator");
const libraryModel = require("../../../models/libraryModel");

module.exports = async (req, res, next) => {
  const { name } = req.params;
    const { auth_token } = req.query;
  const ingredient = await libraryModel.findOneAndDelete({ name });
  if (!ingredient) {
    return next(
      errorGenerator(`ingredient with the name ${name} does not exist`)
    );
  }
  res.json({ data: {auth_token, data:"deleted successfully"}, err: null });
};
