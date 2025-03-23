import { Request, Response } from "express";
import { AddressModel } from "../models/address.models.ts";
import { CartModel, CartType } from "../models/carts.model.ts";
import { OrderModel } from "../models/orders.model.ts";

interface GenerateOrderRequestBody {
  address: string;
  shippingFee: number;
}

interface AuthenticatedRequest extends Request {
  locals: {
    uid: string;
  };
}

const getOrderDetailsByID = (_: Request, res: Response) => {
  try {
    
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message,
      message: "Unable to retrieve Order Detail",
      data: null,
    });
  }
};

const getAllOrdersByUID = (_: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message,
      message: "Unable to retrieve orders",
      data: null,
    });
  }
};

const updateOrderByID = (_: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message,
      message: "Unable to update order detail",
      data: null,
    });
  }
};

const generateOrder = async (req: Request, res: Response) => {
  try {
    const { address, shippingFee }: GenerateOrderRequestBody = req.body;
    const { uid } = (req as AuthenticatedRequest).locals;

    if (!address || shippingFee === undefined) {
      res.status(400).json({
        error: "Missing required fields",
        message: "Address and shipping fee are required",
        data: null,
      });
      return;
    }

    if (!uid) {
      res.status(401).json({
        error: "Unauthorized",
        message: "User authentication failed",
        data: null,
      });
      return;
    }

    const cartData: Partial<CartType> | null = await CartModel.findById(uid)
      .select({
        discount: true,
        total: true,
        subtotal: true,
        items: true,
        tax: true,
        _id: false,
      })
      .lean();

    if (!cartData) {
      res.status(400).json({
        error: "Cart Not Found",
        message: "Cart Doesn't Exist for this User!",
        data: null,
      });
      return;
    }

    const addressData = await AddressModel.findOne({ _id: address, uid })
      .select("name phone address1 address2 city state zipcode -_id")
      .lean();

    if (!addressData) {
      res.status(400).json({
        error: "Invalid Address",
        message: "This Address Doesn't Exist for this User!",
        data: null,
      });
      return;
    }

    const orderResponse = await OrderModel.create({
      address: addressData,
      items: cartData.items,
      uid,
      shippingFee,
      subtotal: cartData.subtotal,
      tax: cartData.tax,
      discount: cartData.discount,
    });

    await CartModel.findByIdAndDelete(uid);

    res.status(201).json({
      error: null,
      message: "Order generated successfully!",
      data: orderResponse,
    });
  } catch (error) {
    console.error("Error in generateOrder:", error);
    res.status(500).json({
      error: (error as Error).message,
      message: "Unable to generate Order!",
      data: null,
    });
  }
};

export {
  getOrderDetailsByID,
  getAllOrdersByUID,
  updateOrderByID,
  generateOrder,
};
