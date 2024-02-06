const libraryModel = require("../../../models/libraryModel");

module.exports = async (req, res, next) => {
    const { auth_token } = req.query;
  const library = await libraryModel.find();
  const store = [];
  library.forEach((elem) => {
    const obj = { name: "", cp: 0 };
    elem.nutritionalValues.forEach((item) => {
      if (item.name === "crude protein") {
        obj.cp = item.value;
      }
    });
    obj.name = elem.name;
    store.push(obj);
  });
  store.sort((a, b) => {
    if (a.name[0] < b.name[0]) {
      return -1;
    }
    return 1;
  });
  res.json({ data: {auth_token, data:store}, err: null });
};
