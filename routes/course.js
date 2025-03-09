
const express = require("express");
const router = express.Router();
const CourseController = require("../controller/course");
const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Route to create a course with image uploads
router.post(
    "/",
    upload.fields([
        { name: "curriculamCoverImage", maxCount: 1 },
        { name: "certificate", maxCount: 1 },
        { name: "moduleImage", maxCount: 1 }, 
    ]),
    CourseController.create
);

//get all course
router.get('/',CourseController.getAll)
//get by Id course
router.get("/:id", CourseController.get);
//update course by id
router.put("/:id", upload.fields([
    { name: "curriculamCoverImage", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
    { name: "moduleImage", maxCount: 1 }, 
]), CourseController.update);
//delete course by id
router.delete("/:id", CourseController.delete);
//delete all course
router.delete("/", CourseController.deleteAll);
//add new modules for course
router.put('/:id/modules',upload.single("moduleImage"),CourseController.addModules)
//get modules by course id
router.get('/:id/modules',CourseController.getModules)
//edit module by id
router.put('/:id/modules/:moduleId',upload.single("moduleImage"),CourseController.editModule)
//delete modules by id
router.delete('/:id/module/:moduleId',CourseController.deleteModulebyId)
//delete all modules by course id
router.delete('/:id/modules',CourseController.deleteAllModules)

module.exports = router;
