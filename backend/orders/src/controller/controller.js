const { Orders } = require("../models/useModels");
async function orderDetails(req, res) {
  try {
    const {
      userID,
      productDetails,
      quantities,
      shippingAddress,
      paymentMethod,
    } = req.body;

    const orderSch = new Orders({
      userID,
      productDetails,
      quantities,
      shippingAddress,
      paymentMethod,
    });
    console.log("hi");

    const result = await orderSch.save();
    console.log("Data", result);
    res.end();
  } catch (error) {
    console.log(error);
  }
}
module.exports = { orderDetails };
