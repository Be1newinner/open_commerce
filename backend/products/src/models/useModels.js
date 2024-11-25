const { urlencoded } = require("express");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  store: {
    type: String,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("products", productSchema);

// const Media = mongoose.model("media", mediaSchema);

module.exports = { Product };
