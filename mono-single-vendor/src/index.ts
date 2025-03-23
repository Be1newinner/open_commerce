import "dotenv/config";

import express from "express";
import ConnectDB from "./config/db.config.ts";

import { ProductRouter } from "./routes/products.route.ts";
import { AuthRouter } from "./routes/users.route.ts";
import { CartRouter } from "./routes/carts.route.ts";
import { AddressRouter } from "./routes/address.route.ts";
import { OrderRouter } from "./routes/orders.route.ts";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to Simple Ecommerce!");
  return;
});

app.use("/products", ProductRouter);
app.use("/auth", AuthRouter);
app.use("/cart", CartRouter);
app.use("/address", AddressRouter);
app.use("/orders", OrderRouter);

let server;

async function startServer() {
  try {
    await ConnectDB();
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

if (import.meta.url === new URL(import.meta.url, import.meta.url).href) {
  startServer();
}

export { app, startServer, server };
