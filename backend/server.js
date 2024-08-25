import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json()); //allows us to accept JSON data in the req.body

// GET ALL PRODUCTS ENDPOINT
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// POST ENDPOINT
app.post("/api/products", async (req, res) => {
  const product = req.body; // user will send this data

  // check if the requirements is empty.
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  // if the user pass the requirements then it can now create a new product based on the user data.
  const newProduct = Product(product);

  try {
    await newProduct.save(); //save it to the database
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating the product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// UPDATE ENDPOINT
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  // Check if the id exists
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// DELETE ENDPOINT
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in deleting product", error.message);
    res.status(404).json({ success: false, message: "Product not found" });
  }
});

// This function will execute if the backend runs: Enter npm run dev on backend terminal
app.listen(5000, () => {
  connectDB();
  // This message log indicates that the backend is running
  console.log("Server started at http://localhost:5000");
});
