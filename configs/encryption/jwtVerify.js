const jwt = require("jsonwebtoken");

module.exports = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.API_SECRET);
    return { data: decoded.data, err: null };
  } catch (error) {
    return { data: null, err: error.message };
  }
};
