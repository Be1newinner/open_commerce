const mongoose = require("mongoose");

// const mediaSchema = new mongoose.Schema({
//   filename: {
//     type: String,
//     required: true,
//   },

//   mediaType: {
//     type: String,
//     required: true,
//   },

//   data: {
//     type: Date,
//     default: Date.now,
//   },

//   image: {
//     type: Buffer,
//     required: true,
//   },
// });

const productSchema = new mongoose.Schema({
  sku: {
    type: Number,
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
    type: Buffer,
    required: true,
  },
});

const Product = mongoose.model("products", productSchema);

// const Media = mongoose.model("media", mediaSchema);

module.exports = { Product };
