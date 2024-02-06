const errorGenerator = require("../../../configs/errorGenerator");
const libraryModel = require("../../../models/libraryModel");

module.exports = async (req, res, next) => {
  try {
    const {
      name,
      img_url,
      description,
      categories,
      nutritionalAttributes,
      nutritionalValues,
      potentialConstraints,
    } = req.body;
  const { auth_token } = req.query;
    // input validation start
    if (
      !name ||
      !img_url ||
      !description ||
      !categories ||
      !nutritionalAttributes ||
      !potentialConstraints ||
      !nutritionalValues
    ) {
      return next(errorGenerator("all fields are required"));
    }
    // input validation ed
    // checking if the ingredient already exist
    const check = await libraryModel.findOne({ name });
    if (check) {
      return next(errorGenerator("ingredient already exist in the library"));
    }

    const ingredient = await libraryModel.create({
      name,
      img_url,
      description,
      categories,
      nutritionalAttributes,
      nutritionalValues,
      potentialConstraints,
    });
    res.json({ data:{auth_token, data:ingredient}, err: null });
  } catch (error) {
    next(errorGenerator(error.message));
  }
};
