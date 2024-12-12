const { v4: uuidv4 } = require("uuid");
const { Product } = require("../models/useModels");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { uploadFile } = require("../config/s3url");

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  storage: multer.memoryStorage(),
});

const createProduct = async (req, res) => {
  try {
    if (!req.file || req.file.length === 0) {
      return res.status(400).json({ message: "No image file uploaded." });
    }
    const s3Key = `sofy/products/${uuidv4()}${path.extname(
      req.file.originalname
    )}`;

    // Upload the file to S3
    await uploadFile(req.file.buffer.toString("base64"), s3Key);

    // Construct the S3 URL
    let s3Url = `https://aws-ap-south-1-008971631073-shipsar-demo-pipe.s3.ap-south-1.amazonaws.com/${s3Key}`;

    const product = new Product({
      sku: req.body.sku,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      image: s3Url,
      category: req.body.category,
      store: req.body.store,
      reviews: req.body.reviews,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { limit = 8, page = 1 } = req.query;
    const products = await Product.find()
      .limit(limit)
      .skip((page - 1) * limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getAllProductsByCategory = async (req, res) => {
//   try {
//     const { category } = req.body;

//     console.log("Category:", category);

//     const products = await Product.find({ category });
//     console.log("Products:", products);

//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getProductBySku = async (req, res) => {
  try {
    const product = await Product.findOne({ sku: req.params.sku });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded." });
    }

    const imagePath = `/uploads/products/${req.file.filename}`;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        sku: req.body.sku,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        image: imagePath,
        category: req.body.category,
        store: req.body.store,
        reviews: req.body.reviews,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductBySku,
  updateProduct,
  deleteProduct,
  upload,
};
