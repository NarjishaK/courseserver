const MainCategory = require("../models/maincategory");
const asyncHandler = require("express-async-handler");
const subCategory =require("../models/subcategory")
const Course =require("../models/course")

//create main category
exports.create = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const image = req.file.filename;
    const maincategory = await MainCategory.create({ name, image });
    res.status(200).json(maincategory);
});

//get all main category
exports.getAll = asyncHandler(async (req, res) => {
    const maincategory = await MainCategory.find();
    res.status(200).json(maincategory);
});

//get main category by id
exports.get = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const maincategory = await MainCategory.findById(id);
        if (!maincategory) {
            return res.status(404).json({ message: "Main category not found" });
        }
        res.status(200).json(maincategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//update main category by id
exports.update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const maincategory = await MainCategory.findById(id);
        if (!maincategory) {
            return res.status(404).json({ message: "Main category not found" });
        }
        maincategory.name = name || maincategory.name;
        maincategory.image = image || maincategory.image;
        await maincategory.save();
        res.status(200).json(maincategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//delete main category by id
exports.delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const maincategory = await MainCategory.findByIdAndDelete(id);
        if (!maincategory) {
            return res.status(404).json({ message: "Main category not found" });
        }
        //delete subcategory by maincategory id
        await subCategory.deleteMany({ maincategory: id });
        res.status(200).json({ message: "Main categories and those subcategories deleted successfully" });
        //delete product by maincategory id
        await Course.deleteMany({ maincategory: id });
        res.status(200).json({ message: "product of main category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});



//delete all main category
exports.deleteAll = asyncHandler(async (req, res) => {
    try {
        await MainCategory.deleteMany({});
        await subCategory.deleteMany({});
        res.status(200).json({ message: "All main category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});