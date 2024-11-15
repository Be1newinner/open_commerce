const Categories = require("../models/useModels");

const createCategory = async (req, res) => {
  try {
    const category = new Categories({
      name: req.body.name,
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();

    if(!categories) {
      return res.status(404).json({ message: "Categories not found" });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.name = req.body.name;
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Categories.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
