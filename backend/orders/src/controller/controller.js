const { Orders } = require("../models/useModels");
async function orderDetails(req, res) {
  try {
    const {
      name,
      email,
      phone,
      state,
      city,
      pincode,
      cartItems,
      quantity,
      subtotal,
      total,
      shipping,
      discount,
    } = req.body;

    const order = new Orders({
      name,
      email,
      phone,
      state,
      city,
      pincode,
      cartItems,
      quantity,
      subtotal,
      total,
      shipping,
      discount,
    });

    await order.save();
    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = { orderDetails };
