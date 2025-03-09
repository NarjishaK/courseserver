const Wishlist = require("../models/wishlist");


//craete wishlist
exports.create =async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        // Ensure courseId is an array
        if (!Array.isArray(courseId)) {
            return res.status(400).json({ message: "courseId must be an array" });
        }

        // Check if wishlist exists for the user
        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            // Create a new wishlist
            wishlist = new Wishlist({
                userId,
                wishlistItems: courseId.map(id => ({ course: id })) // Convert to correct structure
            });
        } else {
            // Check if any course is already in wishlist
            const existingCourses = wishlist.wishlistItems.map(item => item.course.toString());
            const newCourses = courseId.filter(id => !existingCourses.includes(id));

            if (newCourses.length === 0) {
                return res.status(400).json({ message: "Course(s) already in wishlist" });
            }

            // Add new courses
            newCourses.forEach(id => wishlist.wishlistItems.push({ course: id }));
        }

        // Save to database
        await wishlist.save();
        res.status(201).json(wishlist);
    } catch (error) {
        console.error("Error creating wishlist:", error);
        res.status(500).json({ message: "Error creating wishlist" });
    }
};
//get all wishlists
exports.getAll = async (req, res) => {
    try {
        const wishlists = await Wishlist.find().populate("wishlistItems.course");
        res.status(200).json(wishlists);
    } catch (error) {
        console.error("Error getting wishlists:", error);
        res.status(500).json({ message: "Error getting wishlists" });
    }
};

//get wishlist by id
exports.get = async (req, res) => {
    const { id } = req.params;
    try {
        const wishlist = await Wishlist.findById(id);
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        res.status(200).json(wishlist);
    } catch (error) {
        console.error("Error getting wishlist:", error);
        res.status(500).json({ message: "Error getting wishlist" });
    }
};

//update wishlist by id
exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const wishlist = await Wishlist.findByIdAndUpdate(id, req.body, { new: true });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        res.status(200).json(wishlist);
    } catch (error) {
        console.error("Error updating wishlist:", error);
        res.status(500).json({ message: "Error updating wishlist" });
    }
};

//delete wishlist by id
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const wishlist = await Wishlist.findByIdAndDelete(id);
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        res.status(200).json({ message: "Wishlist deleted successfully" });
    } catch (error) {
        console.error("Error deleting wishlist:", error);
        res.status(500).json({ message: "Error deleting wishlist" });
    }
};

//delete all wishlists
exports.deleteAll = async (req, res) => {
    try {
        await Wishlist.deleteMany({});
        res.status(200).json({ message: "All wishlists deleted successfully" });
    } catch (error) {
        console.error("Error deleting all wishlists:", error);
        res.status(500).json({ message: "Error deleting all wishlists" });
    }
};

//get wishlist by user id
exports.getWishlistByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const wishlist = await Wishlist.findOne({ userId }).populate("wishlistItems.course");
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        res.status(200).json(wishlist);
    } catch (error) {
        console.error("Error getting wishlist by user id:", error);
        res.status(500).json({ message: "Error getting wishlist by user id" });
    }
};