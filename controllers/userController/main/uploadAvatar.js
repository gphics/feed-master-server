const {
  configuredCloudinary,
} = require("../../../configs/configuredCloudiary");
const jwtVerify = require("../../../configs/encryption/jwtVerify");
const errorGenerator = require("../../../configs/errorGenerator");
const userModel = require("../../../models/userModel");

module.exports = async (req, res, next) => {
  const { auth_token } = req.query;
  // getting user email
  const { data, err } = jwtVerify(auth_token);
  if (err) {
    return next(errorGenerator(err));
  }
  // getting the user
  const user = await userModel.findOne({ email: data.email });
  const { public_id: prev } = user.avatar;
  const file = req.file;
  // validation start
  // file existence
  if (!file) {
    return next(errorGenerator("image must be provided"));
  }
  // checking mimetype
  const { mimetype } = file;
  if (
    mimetype !== "image/jpeg" &&
    mimetype !== "image/jpg" &&
    mimetype !== "image/png"
  ) {
    return next(errorGenerator(`${mimetype} image format not supported`));
  }
  // validation end
  // destroying the image if public id exists
  if (prev) {
    await configuredCloudinary.uploader.destroy(prev);
  }
  const imageData = await configuredCloudinary.uploader.upload(file.path, {
    folder: "farm-master",
  });
  const { public_id, secure_url } = imageData;
  user.avatar = {
    url: secure_url,
    public_id,
  };

  await user.save();

  res.json({ data:{data: "upload successful", auth_token}, err: null });
};
