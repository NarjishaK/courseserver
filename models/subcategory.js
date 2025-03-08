const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    maincategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MainCategory",
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
});

module.exports = mongoose.model("subCategory", subcategorySchema);