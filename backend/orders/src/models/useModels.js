const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userID: { type: Number, require: true, unique: true },
  productDetails: { type: String, require: true },
  quantities: { type: Number, require: true },
  shippingAddress: { type: String, require: true },
  paymentMethod: { type: String, require: true },
});
const Orders = mongoose.model("orders", orderSchema);
module.exports = { Orders };
// Accepts user ID, product details, quantities, shipping address, and payment method
