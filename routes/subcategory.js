const express = require("express");
const router = express.Router();
const Controller = require("../controller/subcategory");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });
router.post("/", upload.single("image"), Controller.create);
router.get("/", Controller.getAll);
router.get("/:id", Controller.get);
router.put("/:id", upload.single("image"), Controller.update);
router.delete("/:id", Controller.delete);
router.delete("/", Controller.deleteAll);
module.exports = router;