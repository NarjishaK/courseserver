const mongoose = require("mongoose");
const course = require("./course");

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    courses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Course",
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Coupon", couponSchema);