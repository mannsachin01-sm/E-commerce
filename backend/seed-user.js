const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/user_model");

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/db1";

mongoose.connect(MONGO_URL).then(async () => {
  console.log("Connected to MongoDB for user seeding...");
  const email = "test@example.com";
  const existing = await User.findOne({ email });
  if (!existing) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    const newUser = new User({
      username: "testuser",
      email,
      phone: "1234567890",
      password: hashedPassword,
      isAdmin: "false"
    });
    await newUser.save();
    console.log("Test user created successfully!");
  } else {
    console.log("Test user already exists.");
  }
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
