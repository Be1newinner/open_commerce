import { Router } from "express";
import { createCart, deleteCart, getCart, updateCart } from "../controllers/cart.controller.js";
import { isLoggedIn } from '../middlewares/auth.middleware.js'

const router = Router();

router
    .route('/')
    .post(isLoggedIn, createCart)
    .get(isLoggedIn,getCart)

router
    .route('/:id')
    .put(isLoggedIn, updateCart)
    .delete(isLoggedIn, deleteCart)

export default router;