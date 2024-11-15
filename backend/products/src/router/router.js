const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductBySku,
} = require("../controller/controller");
const router = express.Router();

router.post("/createproduct", createProduct);
router.get("/product", getAllProducts);
// router.get("/product/:id", getProductById);
router.get("/product/:sku", getProductBySku);
router.put("/updateproduct/:id", updateProduct);
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
