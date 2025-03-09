const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    wishlistItems: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
                required: true
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Wishlist", wishlistSchema);