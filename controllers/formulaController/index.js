const permitIfAuth = require("../../middlewares/permitIfAuth");
const create = require("./main/create");
const formulaDelete = require("./main/formulaDelete");
const myFormula = require("./main/myFormula");
const read = require("./main/read");
const update = require("./main/update");


module.exports = [
  {
    action: create,
    url: "/create",
    method: "post",
    mid:[permitIfAuth]
  },
  {
    action: formulaDelete,
    url: "/:id",
    method: "delete",
    mid:[permitIfAuth]
  },
  {
    action: update,
    url: "/:id",
    method: "put",
    mid:[permitIfAuth]
  },
  {
    action: read,
    url: "/:id",
    method: "get",
    mid:[permitIfAuth]
  },
  {
    action: myFormula,
    url: "",
    method: "get",
    mid:[permitIfAuth]
  },
];
