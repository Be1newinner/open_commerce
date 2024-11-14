const Product = require("../models/useModels");

const createProduct = async (req, res) => {
  try {
    const product = new Product({
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
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
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
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

const addProductToCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const product = new Product({
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
    });

    await product.save();

    category.products.push(product);
    await category.save();

    res.status(201).json({ message: "Product added to category", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProductInCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const product = category.products.id(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found in category" });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;

    await category.save();
    res.status(200).json({ message: "Product updated in category", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProductFromCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const product = category.products.id(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found in category" });
    }

    product.remove();
    await category.save();
    res.status(200).json({ message: "Product deleted from category" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addProductToCategory,
  updateProductInCategory,
  deleteProductFromCategory,
};
