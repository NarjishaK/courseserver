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



// Add a new curriculum module to a course
exports.addModules = async (req, res) => {
    try {
        const { id } = req.params; // Course ID
        const { moduleName, moduleTitle, moduleDescription, moduleVideo, moduleVideoTitle, moduleVideoDescription, moduleNotes, moduleNotesTitle, isPaid } = req.body;

        // If an image is uploaded, save its filename; otherwise, set it to null
        const moduleImage = req.file ? req.file.filename : null;

        // Find the course and update with the new module
        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            {
                $push: {
                    curriculamModules: {
                        moduleName,
                        moduleTitle,
                        moduleDescription,
                        moduleVideo,
                        moduleVideoTitle,
                        moduleVideoDescription,
                        moduleNotes,
                        moduleNotesTitle,
                        moduleImage,
                        isPaid: isPaid === "true" // Convert string to boolean if needed
                    }
                }
            },
            { new: true } // Return updated document
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({
            message: "Module added successfully",
            course: updatedCourse
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



//get modules by course id
exports.getModules = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ modules: course.curriculamModules });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


//edit module by id
exports.editModule = async (req, res) => {
    const { id, moduleId } = req.params;
    const { moduleName, moduleTitle, moduleDescription, moduleVideo, moduleVideoTitle, moduleVideoDescription, moduleNotes, moduleNotesTitle, isPaid } = req.body;
    const moduleImage = req.file ? req.file.filename : null;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const module = course.curriculamModules.id(moduleId);
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }
        module.moduleName = moduleName;
        module.moduleTitle = moduleTitle;
        module.moduleDescription = moduleDescription;
        module.moduleVideo = moduleVideo;
        module.moduleVideoTitle = moduleVideoTitle;
        module.moduleVideoDescription = moduleVideoDescription;
        module.moduleNotes = moduleNotes;
        module.moduleNotesTitle = moduleNotesTitle;
        module.moduleImage = moduleImage;
        module.isPaid = isPaid;
        await course.save();
        res.status(200).json({ message: "Module updated successfully", module });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


//delete  modules by Id
exports.deleteModulebyId = async (req, res) => {
    const { id, moduleId } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const module = course.curriculamModules.id(moduleId);
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }
        course.curriculamModules.pull(moduleId);
        await course.save();
        res.status(200).json({ message: "Module deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }   
}

//delete all modules by course id
exports.deleteAllModules = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        course.curriculamModules = [];
        await course.save();
        res.status(200).json({ message: "All modules deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}