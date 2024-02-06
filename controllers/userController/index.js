const { upload } = require("../../configs/configuredCloudiary");
const authValidator = require("../../middlewares/authValidator");
const dontPermitIfAuth = require("../../middlewares/dontPermitIfAuth");
const isUserExist = require("../../middlewares/isUserExist");
const permitIfAuth = require("../../middlewares/permitIfAuth");
const login = require("./main/login");
const logout = require("./main/logout");
const read = require("./main/read");
const register = require("./main/register");
const update = require("./main/update");
const updateEmail = require("./main/updateEmail");
const updatePassword = require("./main/updatePassword");
const uploadAvatar = require("./main/uploadAvatar");
dontPermitIfAuth;
module.exports = [
  {
    action: update,
    url: "/update",
    method: "put",
    mid: [permitIfAuth],
  },
  {
    action: read,
    url: "",
    method: "get",
    mid: [permitIfAuth],
  },
  {
    action: updatePassword,
    url: "/update-password",
    method: "put",
    mid: [permitIfAuth],
  },
  {
    action: updateEmail,
    url: "/update-email",
    method: "put",
    mid: [permitIfAuth, isUserExist],
  },
  {
    action: uploadAvatar,
    url: "/upload-avatar",
    method: "post",
    mid: [permitIfAuth, upload.single("avatar")],
  },

  {
    action: logout,
    url: "/logout",
    method: "get",
    mid: [permitIfAuth],
  },
  {
    action: register,
    url: "/register",
    method: "post",
    mid: [dontPermitIfAuth, authValidator, isUserExist],
  },
  {
    action: login,
    url: "/login",
    method: "post",
    mid: [dontPermitIfAuth, authValidator],
  },
];
