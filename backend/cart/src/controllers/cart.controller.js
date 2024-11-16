import { User, Product, Cart } from "../models/index.js";

async function createCart(req, res) {
    const {
        items
    } = req.body

    try {
        const userExists = await User.findById(req.user._id)

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const productExists = items.map(async (item) => {
            const { productId } = item
            const product = await Product.findById(productId)

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found with id ${productId}`
                })
            }
        })

        const cart = await Cart.create({
            userId: req.user._id,
            items
        })

        if (!cart) {
            return res.status(500).json({
                success: false,
                message: 'Error in creating cart'
            })
        }

        res.status(201).json({
            success: true,
            message: 'Cart created successfully',
            data: cart
        })
    } catch (error) {
        console.error("Error in createCart: ", error);
        res.status(500).json({
            success: false,
            message: 'Error in creating cart'
        })
    }
}

async function getCart(req, res) {
    try {
        const cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Cart fetched successfully',
            data: cart
        })
    } catch (error) {
        console.error("Error in getCart: ", error);
        res.status(500).json({
            success: false,
            message: 'Error in getting cart'
        })
    }
}

async function updateCart(req, res) {
    const { id } = req.params;
    const { items } = req.body;

    try {
        const cartExists = await Cart.findById(id)

        if (!cartExists) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }

        const cart = await Cart.findByIdAndUpdate(id, {
            userId: req.user._id,
            items
        }, { new: true })

        if (!cart) {
            return res.status(500).json({
                success: false,
                message: 'Error in updating cart'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Cart updated successfully',
            data: cart
        })
    } catch (error) {
        console.error("Error in updateCart: ", error);
        return res.status(500).json({
            success: false,
            message: 'Error in updating cart'
        })
    }
}

async function deleteCart(req, res) {
    const { id } = req.params;

    try {
        const userExists = await User.findById(req.user._id)

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const cart = await Cart.findByIdAndDelete(id)

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Cart deleted successfully'
        })
    } catch (error) {
        console.error("Error in deleteCart: ", error);
        return res.status(500).json({
            success: false,
            message: 'Error in deleting cart'
        })
    }
}

export { createCart, getCart, updateCart, deleteCart }