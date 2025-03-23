import { Request, Response } from "express";
import { ProductModel } from "../models/products.model.ts";

interface Product {
  name: string;
  category: string;
  price: number;
  mrp: number;
  stock: number;
  sku: string;
  description?: string;
  rating?: number;
}

// Fetch All Products
async function GetListOfProducts(req: Request, res: Response): Promise<void> {
  try {
    const data = await ProductModel.find({}, "-_id").lean();

    if (!data || data.length === 0) {
      res.status(404).json({
        error: "Products not found",
        message: "No products available",
        data: null,
      });
      return;
    }

    res.status(200).json({
      error: null,
      message: "Products fetched successfully!",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: (error as Error).message,
      message: "Failed to fetch products",
      data: null,
    });
  }
}

// Fetch Single Product by SKU
async function GetSingleProduct(req: Request, res: Response): Promise<void> {
  try {
    const { sku } = req.params;
    const data = await ProductModel.findOne({ sku }).lean();

    if (!data) {
      res.status(404).json({
        error: "Product not found",
        message: "No product found with the given SKU",
        data: null,
      });
      return;
    }

    res.status(200).json({
      error: null,
      message: "Product fetched successfully!",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: (error as Error).message,
      message: "Failed to fetch product",
      data: null,
    });
  }
}

// Add Multiple Products
async function AddListOfProductsController(req: Request, res: Response): Promise<void> {
  try {
    const products: Product[] = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      res.status(400).json({
        error: "Invalid input",
        message: "Product list is required",
        data: null,
      });
      return;
    }

    const data = await ProductModel.insertMany(products);

    res.status(201).json({
      error: null,
      message: "Products added successfully!",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: (error as Error).message,
      message: "Failed to add products",
      data: null,
    });
  }
}

// Add Single Product
async function AddSingleProductController(req: Request, res: Response): Promise<void> {
  try {
    const { name, category, price, mrp, stock, sku, description }: Product = req.body;

    if (!name || !category || !price || !mrp || !stock || !sku) {
      res.status(400).json({
        error: "Missing required fields",
        message: "Please provide all required details",
        data: null,
      });
      return;
    }

    const data = await ProductModel.create({
      name,
      category,
      price,
      mrp,
      stock,
      sku,
      rating: 0,
      description,
    });

    res.status(201).json({
      error: null,
      message: "Product added successfully!",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: (error as Error).message,
      message: "Failed to add product",
      data: null,
    });
  }
}

// Update Single Product by SKU
async function UpdateSingleProductController(req: Request, res: Response): Promise<void> {
  try {
    const { name, category, price, mrp, stock, sku, description, rating }: Partial<Product> = req.body;

    if (!sku) {
      res.status(400).json({
        error: "SKU is required",
        message: "SKU must be provided to update a product",
        data: null,
      });
      return;
    }

    if (!(name || category || price || mrp || stock || description || rating)) {
      res.status(400).json({
        error: "Invalid update data",
        message: "At least one field must be provided to update a product",
        data: null,
      });
      return;
    }

    const updatedData = await ProductModel.findOneAndUpdate(
      { sku },
      { name, category, price, mrp, stock, description, rating },
      { new: true }
    );

    if (!updatedData) {
      res.status(404).json({
        error: "Product not found",
        message: "No product found with the given SKU",
        data: null,
      });
      return;
    }

    res.status(200).json({
      error: null,
      message: "Product updated successfully!",
      data: updatedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: (error as Error).message,
      message: "Failed to update product",
      data: null,
    });
  }
}

// Delete Product by SKU
async function deleteProductByID(req: Request, res: Response): Promise<void> {
  try {
    const { sku } = req.params;

    const deletedProduct = await ProductModel.findOneAndDelete({ sku });

    if (!deletedProduct) {
      res.status(404).json({
        error: "Product not found",
        message: "No product found with the given SKU",
        data: null,
      });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: (error as Error).message,
      message: "Failed to delete product",
      data: null,
    });
  }
}

export {
  GetListOfProducts,
  GetSingleProduct,
  AddListOfProductsController,
  AddSingleProductController,
  UpdateSingleProductController,
  deleteProductByID,
};
