const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// export const configuredCloudinary = cloudinary.config({});
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const ms = new Date().getMilliseconds();
    cb(null, `${ms + file.originalname}`);
  },
});
const upload = multer({ storage });

module.exports = { upload, configuredCloudinary: cloudinary };
