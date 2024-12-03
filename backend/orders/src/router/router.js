const express = require("express");
const router = express.Router();
const {
  orderDetails,
  getOrders,
  getOrderById,
} = require("../controller/controller");

router.post("/order", orderDetails);
router.get("/orders", getOrders);
router.get("/order/:id", getOrderById);

module.exports = { router };
