const permitIfAuth = require("../../middlewares/permitIfAuth");
const create = require("./main/create");

const getBasicData = require("./main/getBasicData");
const ingDelete = require("./main/ingDelete");
const read = require("./main/read");
const single = require("./main/single");
const update = require("./main/update");

module.exports = [
  { action: create, method: "post", url: "/create", mid: [permitIfAuth] },
  {
    action: getBasicData,
    method: "get",
    url: "/basic-data",
    mid: [permitIfAuth],
  },
  { action: update, method: "put", url: "/update/:name", mid: [permitIfAuth] },
  { action: read, method: "get", url: "", mid: [permitIfAuth] },
  { action: single, method: "get", url: "/:name", mid: [permitIfAuth] },
  { action: ingDelete, method: "delete", url: "/:name", mid: [permitIfAuth] },
];
