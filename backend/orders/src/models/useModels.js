const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    // required: true,
  },

  state: {
    type: String,
    // required: true,
  },

  city: {
    type: String,
    // required: true,
  },

  pincode: {
    type: String,
    required: true,
  },

  cartItems: {
    type: Array,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  subtotal: {
    type: Number,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },

  shipping: {
    type: Number,
    required: true,
  },

  discount: {
    type: Number,
    required: true,
  },
});
const Orders = mongoose.model("orders", orderSchema);
module.exports = { Orders };
