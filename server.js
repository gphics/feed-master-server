// configuring the dotenv package to allow the use of .env file
require("dotenv").config();
// connecting to the db
require("./configs/dbConnect")();
const express = require("express");
const userRouter = require("./routes/userRouter");
const formulaRouter = require("./routes/formulaRouter");
const libraryRouter = require("./routes/libraryRouter");
const nutrientRequirementRouter = require("./routes/nutrientRequirementRouter");
const cors = require("cors");
const app = express();
// userModel()
// middlewares
// parsing json

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );
// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://feed-master-client.vercel.app/"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "POST,DELETE, GET, PUT");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.enable("trust proxy");
app.use(
  cors({
    origin: "*",
  })
);
// routes
app.use("/user", userRouter);
app.use("/formula", formulaRouter);
app.use("/library", libraryRouter);
app.use("/requirements", nutrientRequirementRouter);
// error handler route
app.use((err, req, res, next) => {
  const { message, code } = err;
  console.log(err);
  res.status(code).json({ err: { code, message }, data: null });
});

app.listen(9000, () => console.log("server running at port 9000"));

// console.log(
//   "https://feed-master-client.vercel.app/" ===
//     "https://feed-master-client.vercel.app/"
// );
