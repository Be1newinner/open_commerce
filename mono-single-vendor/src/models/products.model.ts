import { model, Schema, Document } from "mongoose";

// Define the ProductType interface
interface ProductType extends Document {
  name: string;
  category: string;
  mrp: number;
  stock: number;
  sku: string;
  rating: number;
  description: string;
  price: number;
  discount: number;
  tax: number;
}

// Define the Product Schema
const productBaseSchema = new Schema<ProductType>({
  price: { type: Number, required: true, default: 0 },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
});

const productSchema = new Schema<ProductType>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    mrp: { type: Number, required: true },
    stock: { type: Number, required: true },
    sku: { type: String, required: true },
    rating: { type: Number, default: 0 },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

productSchema.add(productBaseSchema);

// Define the Product Model with proper typing
const ProductModel = model<ProductType>("Product", productSchema);

export { productBaseSchema, ProductModel, ProductType };
