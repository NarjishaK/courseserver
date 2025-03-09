const Subcategory = require("../models/subcategory");
const asyncHandler = require("express-async-handler");
const Course =require("../models/course")

//create subcategory
exports.create = asyncHandler(async (req, res) => {
    const { maincategory, title, description, name } = req.body;
    const image = req.file.filename;
    const subcategory = await Subcategory.create({ maincategory, title, description, image, name });
    res.status(200).json(subcategory);
});

//get all subcategory
exports.getAll = asyncHandler(async (req, res) => {
    const subcategory = await Subcategory.find();
    res.status(200).json(subcategory);
});

//get subcategory by id
exports.get = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const subcategory = await Subcategory.findById(id);
        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }
        res.status(200).json(subcategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//update subcategory by id
exports.update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { maincategory, title, description, name } = req.body;    
    const image = req.file ? req.file.filename : null;

    try {
        const subcategory = await Subcategory.findById(id);
        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }
        subcategory.maincategory = maincategory || subcategory.maincategory;
        subcategory.title = title || subcategory.title;
        subcategory.description = description || subcategory.description;
        subcategory.name = name || subcategory.name;
        subcategory.image = image || subcategory.image;
        await subcategory.save();
        res.status(200).json(subcategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//delete subcategory by id
exports.delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        // Find and delete subcategory
        const subcategory = await Subcategory.findByIdAndDelete(id);
        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        // Delete all courses associated with this subcategory
        await Course.deleteMany({ subCategory: id });

        res.status(200).json({ 
            message: "Subcategory and its associated courses deleted successfully" 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//delete all subcategory
exports.deleteAll = asyncHandler(async (req, res) => {
    try {
        await Subcategory.deleteMany({});
        res.status(200).json({ message: "All subcategory deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});