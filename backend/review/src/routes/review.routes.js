import { Router } from "express";
import { isLoggedIn } from '../middlewares/auth.middleware.js'
import { addReview, deleteReview, getAllReviews, getReview, getReviewByProductId, getReviewByUserId, updateReview } from "../controllers/review.controller.js";

const router = Router();

router
    .route("/")
    .post(isLoggedIn, addReview)
    .get(isLoggedIn, getAllReviews);

router
    .route("/:id")
    .get(isLoggedIn, getReview)
    .put(isLoggedIn, updateReview)
    .delete(isLoggedIn, deleteReview);

router
    .route("/product/:productId")
    .get(isLoggedIn, getReviewByProductId);

router
    .route("/user/:userId")
    .get(isLoggedIn, getReviewByUserId);

export default router;