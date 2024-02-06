const permitIfAuth = require("../../middlewares/permitIfAuth");
const create = require("./main/create");
const nutDelete = require("./main/nutDelete");
const read = require("./main/read");
const single = require("./main/single");
const update = require("./main/update");

module.exports = [
  {
    action: create,
    url: "/create",
    method: "post",
    mid: [permitIfAuth],
  },
  {
    action: nutDelete,
    url: "/:id",
    method: "delete",
    mid: [permitIfAuth],
  },
  {
    action: single,
    url: "/:id",
    method: "get",
    mid: [permitIfAuth],
  },
  {
    action: read,
    url: "",
    method: "get",
    mid: [permitIfAuth],
  },
  {
    action: update,
    url: "/:id",
    method: "put",
    mid: [permitIfAuth],
  },
];
