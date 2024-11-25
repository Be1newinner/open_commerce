import { Review } from "../models/review.model.js";

async function addReview(req, res) {
    const { rating, comment, productId } = req.body;

    try {
        const review = await Review.create({ rating, comment, productId, userId: req.user._id });

        if (!review) {
            return res.status(400).json({
                success: false,
                message: "Error Adding Review"
            })
        }

        return res.status(201).json({
            success: true,
            data: review,
            message: "Review Added Successfully"
        })
    } catch (error) {
        console.error("Error Adding Review: ", error);
        return res.status(500).json({
            success: false,
            message: "Error Adding Review"
        })
    }
}

async function updateReview(req, res) {
    const id = req.params.id;
    const { rating, comment } = req.body;

    try {
        const reviewExists = await Review.findById(id);

        if (!reviewExists) {
            return res.status(400).json({
                success: false,
                message: "Review Not Found"
            })
        }

        const updatedReview = await Review.findByIdAndUpdate(id, { rating, comment }, { new: true });

        if (!updatedReview) {
            return res.status(400).json({
                success: false,
                message: "Error Updating Review"
            })
        }

        return res.status(200).json({
            success: true,
            data: updatedReview,
            message: "Review Updated Successfully"
        })
    } catch (error) {
        console.error("Error Updating Review: ", error);
        return res.status(500).json({
            success: false,
            message: "Error Updating Review"
        })
    }
}

async function deleteReview(req, res) {
    const id = req.params.id;

    try {
        const reviewExists = await Review.findById(id);

        if (!reviewExists) {
            return res.status(400).json({
                success: false,
                message: "Review Not Found"
            })
        }

        const deletedReview = await Review.findByIdAndDelete(id);

        if (!deletedReview) {
            return res.status(400).json({
                success: false,
                message: "Error Deleting Review"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Review Deleted Successfully"
        })
    } catch (error) {
        console.error("Error Deleting Review: ", error);
        return res.status(500).json({
            success: false,
            message: "Error Deleting Review"
        })
    }
}

async function getReview(req, res) {
    const id = req.params.id;

    try {
        const reviewExists = await Review.findById(id).populate("userId", "name email");

        if (!reviewExists) {
            return res.status(400).json({
                success: false,
                message: "Review Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            data: reviewExists,
            message: "Review Found Successfully"
        })
    } catch (error) {
        console.error("Error Getting Review: ", error);
        return res.status(500).json({
            success: false,
            message: "Error Getting Review"
        })
    }
}

async function getAllReviews(_, res) {
    try {
        const reviews = await Review.find().populate("userId", "name email");

        if (!reviews) {
            return res.status(400).json({
                success: false,
                message: "Error Getting All Reviews"
            })
        }

        return res.status(200).json({
            success: true,
            data: reviews,
            message: "Reviews Found Successfully"
        })
    } catch (error) {
        console.error("Error Getting All Reviews: ", error);
        return res.status(500).json({
            success: false,
            message: "Error Getting All Reviews"
        })
    }
}

async function getReviewByProductId(req, res) {
    const productId = req.params.productId;

    try {
        const reviews = await Review.find({ productId }).populate("userId", "name email");

        if (!reviews) {
            return res.status(400).json({
                success: false,
                message: "Error Getting Review By Product Id"
            })
        }

        return res.status(200).json({
            success: true,
            data: reviews,
            message: "Reviews Found Successfully"
        })
    } catch (error) {
        console.error("Error Getting Review By Product Id: ", error);
        return res.status(500).json({
            success: false,
            message: "Error Getting Review By Product Id"
        })
    }
}

async function getReviewByUserId(req, res) {
    const userId = req.params.userId;

    try {
        const reviews = await Review.find({ userId }).populate("userId", "name email");

        if (!reviews) {
            return res.status(400).json({
                success: false,
                message: "Error Getting Review By User Id"
            })
        }

        return res.status(200).json({
            success: true,
            data: reviews,
            message: "Reviews Found Successfully"
        })
    } catch (error) {
        console.error("Error Getting Review By User Id: ", error);
        return res.status(500).json({
            success: false,
            message: "Error Getting Review By User Id"
        })
    }
}

export { addReview, updateReview, deleteReview, getReview, getReviewByProductId, getReviewByUserId, getAllReviews };