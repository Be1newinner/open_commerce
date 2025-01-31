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

    // console.log({ title, description, price, mrp, image, images, variants });

    if (title && price && sku) {
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
      console.log(resp._id);

      const response = JSONResponse({
        status_code: 200,
        message: "Product added Successfully!",
        meta: {
          id: resp._id,
        },
      });

      res.json(response);
    } else {
      throw Error("title, sku and price is required!");
    }
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
