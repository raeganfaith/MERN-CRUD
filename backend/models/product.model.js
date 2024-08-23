import mongoose from 'mongoose';

// Create a product schema
const productSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
});
