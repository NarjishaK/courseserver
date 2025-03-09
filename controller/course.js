const Course = require("../models/course");
const asyncHandler = require("express-async-handler");

//craete course
exports.create = async (req, res) => {
    try {
        const {
            courseId,
            mainCategory,
            subCategory,
            instructor,
            language,
            rating,
            price,
            discount,
            skillLevel,
            Isactive,
            curriculamName,
            curriculamTitle,
            curriculamDescription,
            WhatWillYouLearn,
            Requirements,
            curriculamModules
        } = req.body;

        // Extract uploaded file paths, making them optional
        const curriculamCoverImage = req.files["curriculamCoverImage"] ? req.files["curriculamCoverImage"][0].path : "";
        const certificate = req.files["certificate"] ? req.files["certificate"][0].path : "";
        const moduleImage = req.files["moduleImage"] ? req.files["moduleImage"][0].path : "";

        const course = new Course({
            courseId,
            mainCategory,
            subCategory,
            instructor,
            language,
            rating,
            price,
            discount,
            skillLevel,
            certificate, // Optional image
            Isactive,
            curriculamName,
            curriculamTitle,
            curriculamDescription,
            curriculamCoverImage, // Optional image
            WhatWillYouLearn,
            Requirements,
            curriculamModules: JSON.parse(curriculamModules).map((module) => ({
                ...module,
                moduleImage // Optional image
            }))
        });

        await course.save();
        res.status(201).json({ message: "Course created successfully", course });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



//get All
exports.getAll = asyncHandler(async (req, res) => {
    const course = await Course.find();
    res.status(200).json(course);
})