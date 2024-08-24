import mongoose from "mongoose";

// Create a product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

// Product model, create a collection labelled as 'Product' using the productSchema
const Product = mongoose.model("Product", productSchema);

// To use this in different files
export default Product;
