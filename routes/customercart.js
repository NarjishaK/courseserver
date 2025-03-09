const express = require("express");
const router = express.Router();
const Controller = require("../controller/customercart");



router.post("/", Controller.create);
// Remove a course from a cart
router.post("/remove", Controller.removeCourse);
router.get("/", Controller.getAll);
router.get("/:id", Controller.get);
router.delete("/:id", Controller.delete);
router.delete("/", Controller.deleteAll);
//get cart by user id
router.get("/user/:userId", Controller.getCartByUserId);
module.exports = router;