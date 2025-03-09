const Cart = require("../models/customercart");

// Create and update cart
exports.create = async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, cartItems: [{ course: courseId }] });
        } else {
            // Check if course is already in cart
            const courseExists = cart.cartItems.some(item => item.course.toString() === courseId);
            if (!courseExists) {
                cart.cartItems.push({ course: courseId });
            }
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Remove a course from the cart
exports.removeCourse = async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.cartItems = cart.cartItems.filter(item => item.course.toString() !== courseId);
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get all carts
exports.getAll = async (req, res) => {
    try {
        const carts = await Cart.find().populate("cartItems.course");
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a specific cart by ID
exports.get = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findById(id);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a specific cart by ID
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findByIdAndDelete(id);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete all carts
exports.deleteAll = async (req, res) => {
    try {
        await Cart.deleteMany({});
        res.status(200).json({ message: "All carts deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//get cart by user Id
exports.getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate("cartItems.course");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};