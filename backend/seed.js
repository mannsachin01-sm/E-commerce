const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Product = require("./models/product_model");
dotenv.config();
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/db1";
mongoose
  .connect(MONGO_URL)
  .then(async () => {
    console.log("Connected to MongoDB for seeding...");
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log("Seeding database with Products.json...");
      const productsData = JSON.parse(fs.readFileSync("Products.json", "utf8"));
      await Product.insertMany(productsData);
      console.log("Database seeded successfully!");
    } else {
      console.log("Database already has products. Skipping seed.");
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  });
