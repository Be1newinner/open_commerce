const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductBySku,
  upload,
  uploadImage,
} = require("../controller/controller");
const router = express.Router();

router.post("/createproduct", upload.single("image"), createProduct);
router.get("/product", getAllProducts);
// router.get("/product/:id", getProductById);
router.get("/product/:sku", getProductBySku);
router.put("/updateproduct/:id", updateProduct);  
router.delete("/deleteproduct/:id", deleteProduct);

router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;
