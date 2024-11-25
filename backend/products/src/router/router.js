const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductBySku,
  upload,
} = require("../controller/controller");
const router = express.Router();

router.post("/product", upload.array("image"), createProduct);
router.get("/product", getAllProducts);
router.get("/product/:sku", getProductBySku);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;
