import { Router } from "express";
import { createCart, deleteCart, getCart, updateCart } from "../controllers/cart.controller.js";

const router = Router();

router
    .route('/')
    .post(createCart)

router
    .route('/get-cart')
    .post(getCart)

router
    .route('/:id')
    .put(updateCart)
    .delete(deleteCart)

export default router;