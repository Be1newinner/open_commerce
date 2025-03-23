import { Request, Response } from "express";
import { Types } from "mongoose";
import { CartModel, CartType } from "../models/carts.model.ts";
import { TAX } from "../constants/rates.ts";
import { ProductModel } from "../models/products.model.ts";
import { UserModel } from "../models/users.model.ts";

type ActionType = "INCREASE" | "DECREASE";

interface modifyCartControllerBody {
  product_id: string;
  action?: ActionType;
}

interface AuthenticatedRequest extends Request {
  locals: {
    uid: string;
  };
}

// Controller: modify Item Quantity in Cart
async function modifyCartController(req: Request, res: Response) {
  try {
    const { product_id, action = "INCREASE" }: modifyCartControllerBody =
      req.body;
    const quantity = 1;
    const { uid } = (req as AuthenticatedRequest).locals;

    if (!product_id || !uid || !action || !quantity) {
      res.status(400).json({
        error: "All keys are required. product_id, uid, action, quantity!",
        data: null,
      });
      return;
    }

    const userId = new Types.ObjectId(uid);
    const productId = new Types.ObjectId(product_id);

    //  Step 1. Check if User Exists
    const userExist = await UserModel.exists({ _id: userId });
    if (!userExist) {
      res.status(404).json({ error: "User doesn't exist!", data: null });
      return;
    }

    //  Step 2. Check if Product Exists
    const product = await ProductModel.findById(productId)
      .select("price mrp discount")
      .lean();
    if (!product) {
      res.status(404).json({ error: "Product doesn't exist!", data: null });
      return;
    }

    const taxCalculated = TAX * product.price * quantity;
    const totalPrice = product.price * quantity;

    //  Step 3. Update Cart
    const factor = action === "INCREASE" ? 1 : -1;

    let updatedProduct = await CartModel.updateOne(
      { _id: userId, "items._id": productId },
      [
        {
          $set: {
            items: {
              $filter: {
                input: {
                  $map: {
                    input: "$items",
                    as: "item",
                    in: {
                      $mergeObjects: [
                        "$$item",
                        {
                          qty: {
                            $cond: {
                              if: { $eq: ["$$item._id", productId] },
                              then: {
                                $max: [{ $add: ["$$item.qty", factor] }, 0],
                              },
                              else: "$$item.qty",
                            },
                          },
                          subtotal: {
                            $cond: {
                              if: { $eq: ["$$item._id", productId] },
                              then: {
                                $max: [
                                  {
                                    $add: [
                                      "$$item.subtotal",
                                      factor * totalPrice,
                                    ],
                                  },
                                  0,
                                ],
                              },
                              else: "$$item.subtotal",
                            },
                          },
                          price: {
                            $cond: {
                              if: { $eq: ["$$item._id", productId] },
                              then: {
                                $max: [
                                  {
                                    $add: [
                                      "$$item.price",
                                      factor * (totalPrice + taxCalculated),
                                    ],
                                  },
                                  0,
                                ],
                              },
                              else: "$$item.price",
                            },
                          },
                          tax: {
                            $cond: {
                              if: { $eq: ["$$item._id", productId] },
                              then: {
                                $max: [
                                  {
                                    $add: [
                                      "$$item.tax",
                                      factor * taxCalculated,
                                    ],
                                  },
                                  0,
                                ],
                              },
                              else: "$$item.tax",
                            },
                          },
                          discount: {
                            $cond: {
                              if: { $eq: ["$$item._id", productId] },
                              then: {
                                $max: [
                                  {
                                    $add: [
                                      "$$item.discount",
                                      factor * product.discount,
                                    ],
                                  },
                                  0,
                                ],
                              },
                              else: "$$item.discount",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
                as: "item",
                cond: { $gt: ["$$item.qty", 0] },
              },
            },
            total: {
              $max: [
                { $add: ["$total", factor * (totalPrice + taxCalculated)] },
                0,
              ],
            },
            subtotal: {
              $max: [{ $add: ["$subtotal", factor * totalPrice] }, 0],
            },
            discount: {
              $max: [{ $add: ["$discount", factor * product.discount] }, 0],
            },
            tax: { $max: [{ $add: ["$tax", factor * taxCalculated] }, 0] },
          },
        },
      ],
      { upsert: false }
    );

    //  Step 4: Add a New Product in Cart if Not Found
    if (action === "INCREASE" && updatedProduct.matchedCount === 0) {
      updatedProduct = await CartModel.updateOne(
        { _id: userId },
        {
          $push: {
            items: {
              qty: quantity,
              _id: productId,
              price: totalPrice + taxCalculated,
              subtotal: totalPrice,
              discount: product.discount,
              tax: taxCalculated,
            },
          },
          $inc: {
            total: totalPrice + taxCalculated,
            subtotal: totalPrice,
            discount: product.discount,
            tax: taxCalculated,
          },
        },
        { upsert: true }
      );

      res.status(200).json({
        data: updatedProduct,
        error: null,
        message: "Item added to the cart!",
      });
    } else {
      await CartModel.deleteOne({ _id: userId, total: { $lte: 0 } });

      res.status(200).json({
        data: updatedProduct,
        error: null,
        message: "Quantity updated for product!",
      });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message, data: null });
  }
}

// Controller: Get Cart
async function getCartController(req: Request, res: Response) {
  try {
    const { uid } = (req as AuthenticatedRequest).locals;

    const data: CartType | null = await CartModel.findOne({ _id: uid }).lean();

    if (!data) {
      res.status(404).json({
        message: "No Products Found!",
        data: null,
      });
      return;
    }

    res.status(200).json({
      message: "Products Fetched Successfully!",
      data,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: (error as Error).message,
      data: null,
    });
  }
}

export { modifyCartController, getCartController };
