const express = require("express");
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controller/controller");
const router = express.Router();

router.post("/createcategory", createCategory);
router.get("/categories", getAllCategories);
router.put("/updatedcategory/:id", updateCategory);
router.delete("/deletecategory/:id", deleteCategory);

module.exports = router;
