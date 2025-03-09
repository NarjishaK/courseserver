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
    const course = await Course.find().populate("mainCategory").populate("subCategory");
    res.status(200).json(course);
})


//get by id course
exports.get = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id).populate("mainCategory").populate("subCategory");
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//update course by id
exports.update = asyncHandler(async (req, res) => {
    const { id } = req.params;
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

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        course.courseId = courseId;
        course.mainCategory = mainCategory;
        course.subCategory = subCategory;
        course.instructor = instructor;
        course.language = language;
        course.rating = rating;
        course.price = price;
        course.discount = discount;
        course.skillLevel = skillLevel;
        course.Isactive = Isactive;
        course.curriculamName = curriculamName;
        course.curriculamTitle = curriculamTitle;
        course.curriculamDescription = curriculamDescription;
        course.WhatWillYouLearn = WhatWillYouLearn;
        course.Requirements = Requirements;
        course.curriculamModules = JSON.parse(curriculamModules).map((module) => ({
            ...module,
            moduleImage // Optional image
        }))

        if (curriculamCoverImage) {
            course.curriculamCoverImage = curriculamCoverImage;
        }

        if (certificate) {
            course.certificate = certificate;
        }

        if (moduleImage) {
            course.moduleImage = moduleImage;
        }

        await course.save();
        res.status(200).json({ message: "Course updated successfully", course });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//delete course by id
exports.delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//delete all course
exports.deleteAll = asyncHandler(async (req, res) => {
    try {
        await Course.deleteMany({});
        res.status(200).json({ message: "All course deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

