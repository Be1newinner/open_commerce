// Step 1. build a Product schema ( object means structure )
// https://mongoosejs.com/docs/guide.html

import { model, Schema } from "mongoose";

// Step 2. build a Product Model ( for transaction pupose )
// https://mongoosejs.com/docs/models.html

// Data types of schema
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array
// Decimal128
// Map
// Schema
// UUID
// BigInt
// Double
// Int32

const productSchema = new Schema(
  {
    sku: {
      type: String,
      unique: true,
    },
    title: String,
    description: String,
    price: Number,
    mrp: Number,
    image: String,
    images: [String],
    variants: [
      {
        color: String,
        url: String,
      },
    ],
  },
  {
    collection: "ProductCollection",
  }
);

productSchema.path("sku").index(true);

export const ProductModel = model("Product", productSchema);
