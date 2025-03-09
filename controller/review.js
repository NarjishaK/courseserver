const Review = require("../models/review");
const asyncHandler = require("express-async-handler");

//create review
exports.create = asyncHandler(async (req, res) => {
    const { userId, courseId, review, rating } = req.body;
    const reviewData = await Review.create({ userId, courseId, review, rating });
    res.status(200).json(reviewData);
});

//get all reviews
exports.getAll = asyncHandler(async (req, res) => {
    const reviews = await Review.find().populate("userId").populate("courseId");
    res.status(200).json(reviews);
});


//get review by id
exports.get = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id).populate("userId").populate("courseId");
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}); 

//delete review by id
exports.delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//update review by id
exports.update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findByIdAndUpdate(id, req.body, { new: true });
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//delete all reviews
exports.deleteAll = asyncHandler(async (req, res) => {
    try {
        await Review.deleteMany({});
        res.status(200).json({ message: "All reviews deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//get reviews by course id
exports.getReviewsByCourseId = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    try {
        const reviews = await Review.find({ courseId }).populate("userId").populate("courseId");
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});