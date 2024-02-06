
const mongoose = require("mongoose");

module.exports = async () => {
 
 
  try {
    const first = await mongoose.connect(process.env.DB_URL);
    if (first) {
      console.log("local db connected");
    }
  } catch (error) {
    console.log(error);
  }
};
