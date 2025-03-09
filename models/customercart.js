const mongoose = require("mongoose");

const customerCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cartItems: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("CustomerCart", customerCartSchema);
