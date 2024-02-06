const jwtVerify = require("../../../configs/encryption/jwtVerify")
const errorGenerator = require("../../../configs/errorGenerator")
const userModel = require("../../../models/userModel")


module.exports = async (req, res, next) => {
    const { auth_token } = req.query;
    const {
      data,
      err,
    } = jwtVerify(auth_token);
    if (err) {
        return next(errorGenerator(err))
    }

    const user = await userModel.findOne({ email:data.email }).populate("formulas")
    res.json({data:{data:user.formulas, auth_token}, err:null})
}