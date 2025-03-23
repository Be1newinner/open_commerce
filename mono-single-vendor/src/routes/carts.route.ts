import { Router } from "express";
import {
  getCartController,
  modifyCartController,
} from "../controllers/carts.controller.ts";

import { VerifyAccessTokenMiddleWare } from "../middleware/VerifyAccessToken.ts";

const CartRouter = Router();

CartRouter.get("/:uid", VerifyAccessTokenMiddleWare, getCartController);
CartRouter.patch("/", VerifyAccessTokenMiddleWare, modifyCartController);

export { CartRouter };
