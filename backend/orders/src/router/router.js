const express = require("express");
const router = express.Router();
const { orderDetails } = require("../controller/controller");

router.post("/order", orderDetails);
module.exports = { router };
