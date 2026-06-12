const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user_model");

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/db1";

mongoose.connect(MONGO_URL).then(async () => {
  const users = await User.find();
  console.log("Users in DB:", users);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
