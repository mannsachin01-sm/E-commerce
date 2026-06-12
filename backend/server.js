const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderAndPaymentRoutes");

dotenv.config(); // Load environment variables before using them

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Support both ports
    methods: "POST, GET, PATCH, PUT, DELETE, HEAD",
    credentials: true,
  })
);

// Load recommendation data safely
let productsData = { title: [], image: [] };
let similarityMatrix = [];

try {
  productsData = JSON.parse(fs.readFileSync("products_dict.json", "utf8"));
  similarityMatrix = JSON.parse(fs.readFileSync("similarity.json", "utf8"));

  if (!Array.isArray(productsData.title) || !Array.isArray(productsData.image)) {
    throw new Error("Invalid products_dict.json format");
  }

  if (!Array.isArray(similarityMatrix)) {
    throw new Error("Invalid similarity.json format");
  }
} catch (error) {
  console.error("Error loading recommendation data:", error.message);
}

// Recommendation function
function recommend(productName) {
  const productIndex = productsData.title.indexOf(productName);
  if (productIndex === -1) {
    return { error: "Product not found" };
  }

  const distances = similarityMatrix[productIndex];
  if (!Array.isArray(distances)) {
    return { error: "Invalid similarity data" };
  }

  const productsList = distances
    .map((distance, index) => ({ index, distance }))
    .sort((a, b) => b.distance - a.distance)
    .slice(1, 6); // Top 5 recommendations

  const recommendedProducts = productsList
    .map((item) => ({
      title: productsData.title[item.index] || "Unknown Product",
      image: productsData.image[item.index] || "default.jpg",
    }))
    .filter((product) => product.title !== "Unknown Product");

  return recommendedProducts;
}

// Recommendation route
app.get("/api/recommend", (req, res) => {
  const { productName } = req.query;
  if (!productName) {
    return res.status(400).json({ error: "Product name is required" });
  }
  const recommendations = recommend(productName);
  res.json(recommendations);
});

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", orderRoutes);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Node server is running on: http://localhost:${PORT}`);
});
