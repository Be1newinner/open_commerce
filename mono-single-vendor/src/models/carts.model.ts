import { model, Schema, Document } from "mongoose";
import { productBaseSchema } from "../models/products.model.ts";

interface CartPricing {
  subtotal: number;
  tax: number;
  discount: number;
}

interface CartItem {
  _id: Schema.Types.ObjectId;
  qty: number;
  subtotal: number;
}

interface CartDocument extends Document, CartPricing {
  _id: Schema.Types.ObjectId; 
  items: CartItem[];
  total: number;
}

const CartPricingSchema = new Schema<CartPricing>({
  subtotal: { type: Number, required: true, min: 0, default: 0 },
  tax: { type: Number, required: true, min: 0, default: 0 },
  discount: { type: Number, required: true, min: 0, default: 0 },
});

const cartItemSchema = new Schema<CartItem>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
    qty: { type: Number, required: true, min: 0, default: 0 },
    subtotal: { type: Number, required: true, min: 0, default: 0 },
  },
  {
    autoIndex: true,
    _id: false,
  }
);

cartItemSchema.add(productBaseSchema);

const CartSchema = new Schema<CartDocument>(
  {
    items: { type: [cartItemSchema], required: true },
    _id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    total: { type: Number, required: true, min: 0, default: 0 },
  },
  {
    autoIndex: true,
    _id: false,
    timestamps: true,
  }
);

CartSchema.add(CartPricingSchema);

export type CartType = CartDocument;

const CartModel = model<CartDocument>("Cart", CartSchema);

export { CartPricingSchema, cartItemSchema, CartModel };
