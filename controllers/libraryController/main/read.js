const libraryModel = require("../../../models/libraryModel");

module.exports = async (req, res, next) => {
    const { auth_token } = req.query;
  const ingredients = await libraryModel.find();
  res.json({ data: {data:ingredients, auth_token}, err: null });
};
