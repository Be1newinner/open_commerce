import { Request, Response } from "express";
import JSONResponse from "../utils/JsonResponse.ts";
import { ProductModel } from "../models/product.model.ts";

export const ProductsListController = (req: Request, res: Response) => {
  try {
    const response = JSONResponse({
      status_code: 200,
      message: "Products fetched successfully!",
    });

    res.json(response);
    return;
  } catch (error: unknown) {
    console.error(error);

    const errMessage =
      error instanceof Error ? error.message : "Unknown Error!";

    const response = JSONResponse({
      status_code: 500,
      message: errMessage,
    });

    res.status(500).json(response);
    return;
  }
};

export const AddNewProductController = async (req: Request, res: Response) => {
  try {
    const { sku, title, description, price, mrp, image, images, variants } =
      req.body;

    if (!title || !price || !sku) {
      return res.status(400).json(
        JSONResponse({
          status_code: 400,
          message: "title, sku, and price are required!",
        })
      );
    }

    const product = new ProductModel({
      sku,
      title,
      description,
      price,
      mrp,
      image,
      images,
      variants,
    });

    const resp = await product.save();

    res.status(201).json(
      JSONResponse({
        status_code: 201,
        message: "Product added successfully!",
        meta: { id: resp._id },
      })
    );
  } catch (error: unknown) {
    console.error(error);

    let statusCode = 500;
    let errMessage = "Unknown Error!";

    if (error instanceof Error) {
      errMessage = error.message;
    }

    // Handle MongoDB Duplicate Key Error (E11000)
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as Record<string, unknown>).code === 11000
    ) {
      statusCode = 409;
      errMessage = `Product with SKU '${error?.keyValue?.sku}' already exists!`;
    }

    res.status(statusCode).json(
      JSONResponse({
        status_code: statusCode,
        message: errMessage,
      })
    );
  }
};
