const express = require("express");
const router = express.Router();
const Controller = require("../controller/review");



router.post("/", Controller.create);
router.get("/", Controller.getAll);
router.get("/:id", Controller.get);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);
router.delete("/", Controller.deleteAll);
//reviews by course id
router.get("/course/:courseId", Controller.getReviewsByCourseId);
module.exports = router;