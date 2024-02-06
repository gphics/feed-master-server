const jwtVerify = require("../../../configs/encryption/jwtVerify");
const errorGenerator = require("../../../configs/errorGenerator");
const formulaModel = require("../../../models/formulaModel");
const userModel = require("../../../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { auth_token } = req.query;
    const {
      data: { email },
    } = jwtVerify(req.cookies.fmc);
    const user = await userModel.findOne({ email });

    const deleted = await formulaModel.findByIdAndDelete(id);
    if (!deleted) {
      return next(errorGenerator("formula does not exist"));
    }
    //   updating the user
    user.formulas = user.formulas.filter(
      (formula) => formula.toString() !== id
    );

    await user.save();
    res.json({ data: {data:"deleted successfully", auth_token }, err: null });
  } catch (error) {
    next(errorGenerator(error.message));
  }
};
