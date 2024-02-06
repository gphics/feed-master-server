const errorGenerator = require("../../../configs/errorGenerator");
const libraryModel = require("../../../models/libraryModel");

module.exports = async (req, res, next) => {
  try {
    const { name } = req.params;
    const { auth_token } = req.query;
    const ingredient = await libraryModel.findOneAndUpdate(
      { name },
      { ...req.body },
      { new: true }
    );
    if (!ingredient) {
      return next(
        errorGenerator(`ingredient with the name ${name} does not exist`)
      );
    }
    res.json({ data: {data:ingredient, auth_token} });
  } catch (error) {
    next(errorGenerator(error.message));
  }
};
