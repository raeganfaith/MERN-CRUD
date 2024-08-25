import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //allows us to accept JSON data in the req.body

// Prefix for the endpoints routes
app.use("/api/products", productRoutes);

// This function will execute if the backend runs: Enter npm run dev on backend terminal
app.listen(PORT, () => {
  connectDB();
  // This message log indicates that the backend is running
  console.log("Server started at http://localhost:" + PORT);
});
