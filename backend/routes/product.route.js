import express from "express";
import Product from './../models/product.model.js';
import mongoose from "mongoose";

const router = express.Router();

// GET ALL PRODUCTS ENDPOINT
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// POST ENDPOINT
router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in deleting product", error.message);
    res.status(404).json({ success: false, message: "Product not found" });
  }
});

export default router;
