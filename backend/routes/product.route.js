import express from "express";
import {
  deleteProduct,
  updateProduct,
  createProduct,
  getProducts,
} from "./../controllers/product.controller.js";

const router = express.Router();

// GET ALL PRODUCTS ENDPOINT
router.get("/", getProducts);

// POST ENDPOINT
router.post("/", createProduct);

// UPDATE ENDPOINT
router.put("/:id", updateProduct);

// DELETE ENDPOINT
router.delete("/:id", deleteProduct);

export default router;
